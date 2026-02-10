import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { sendDownloadEmail } from "@/lib/email";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import JSZip from "jszip";

export async function POST(request: NextRequest) {
    try {
        // Check admin auth
        const authHeader = request.headers.get("authorization");
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { orderId, action } = body;

        if (!orderId || !action) {
            return NextResponse.json(
                { error: "Missing orderId or action" },
                { status: 400 }
            );
        }

        const supabase = getServiceSupabase();

        // Get the order
        const { data: order, error: fetchError } = await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .single();

        if (fetchError || !order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (action === "reject") {
            // Reject the order
            const { error: updateError } = await supabase
                .from("orders")
                .update({ status: "rejected", updated_at: new Date().toISOString() })
                .eq("id", orderId);

            if (updateError) {
                return NextResponse.json(
                    { error: "Failed to reject order" },
                    { status: 500 }
                );
            }

            return NextResponse.json({ success: true, message: "Order rejected" });
        }

        if (action === "approve") {
            // Generate download token and expiry
            const downloadToken = uuidv4();
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 48); // 48 hours expiry

            // Get the original theme file from Vercel Blob
            // You should upload your theme zip to Vercel Blob first
            // For now, we'll create a placeholder - you'll need to upload the actual theme
            const originalThemeUrl = process.env.ORIGINAL_THEME_URL;

            let watermarkedFileUrl = "";

            if (originalThemeUrl) {
                try {
                    // Fetch the original theme
                    const themeResponse = await fetch(originalThemeUrl);
                    const themeBuffer = await themeResponse.arrayBuffer();

                    // Read the ZIP and add watermark
                    const zip = new JSZip();
                    await zip.loadAsync(themeBuffer);

                    // Add watermark file
                    const watermark = `
/*
 * ═══════════════════════════════════════════════════════════════
 * APEX THEME - LICENSED COPY
 * ═══════════════════════════════════════════════════════════════
 * 
 * This theme is licensed to:
 * Name: ${order.name}
 * Email: ${order.email}
 * Phone: ${order.phone}
 * ${order.business_name ? `Business: ${order.business_name}` : ''}
 * 
 * Purchase ID: ${order.id}
 * Purchase Date: ${new Date().toISOString()}
 * 
 * This is a single-use license. Redistribution is prohibited.
 * Any unauthorized sharing will result in license revocation.
 * 
 * ═══════════════════════════════════════════════════════════════
 */
`;

                    // Add watermark to multiple locations
                    zip.file("LICENSE.txt", watermark);
                    zip.file("assets/LICENSE.txt", watermark);

                    // Also inject into any main JS/CSS files with a comment
                    const filesToWatermark = ["assets/theme.js", "assets/theme.css", "layout/theme.liquid"];

                    for (const filePath of filesToWatermark) {
                        const file = zip.file(filePath);
                        if (file) {
                            const content = await file.async("string");
                            const watermarkedContent = watermark + "\n" + content;
                            zip.file(filePath, watermarkedContent);
                        }
                    }

                    // Generate watermarked ZIP
                    const watermarkedZip = await zip.generateAsync({ type: "arraybuffer" });

                    // Upload watermarked file
                    const watermarkedFilename = `downloads/${order.id}-apex-theme.zip`;
                    const { url } = await put(watermarkedFilename, Buffer.from(watermarkedZip), {
                        access: "public",
                        contentType: "application/zip",
                    });

                    watermarkedFileUrl = url;
                } catch (zipError) {
                    console.error("Error processing theme:", zipError);
                    // Fall back to original if watermarking fails
                    watermarkedFileUrl = originalThemeUrl;
                }
            }

            // Update order with approval info
            const { error: updateError } = await supabase
                .from("orders")
                .update({
                    status: "approved",
                    download_token: downloadToken,
                    download_expires_at: expiresAt.toISOString(),
                    watermarked_file_url: watermarkedFileUrl,
                    approved_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq("id", orderId);

            if (updateError) {
                return NextResponse.json(
                    { error: "Failed to approve order" },
                    { status: 500 }
                );
            }

            // Generate download URL
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
            const downloadUrl = `${appUrl}/api/download?token=${downloadToken}`;

            // Send email with download link
            try {
                await sendDownloadEmail({
                    to: order.email,
                    customerName: order.name,
                    downloadUrl,
                    expiresAt,
                });
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
                // Don't fail the whole operation if email fails
            }

            return NextResponse.json({
                success: true,
                message: "Order approved and email sent",
                downloadUrl,
            });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Approval error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
