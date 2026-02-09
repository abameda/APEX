import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return new NextResponse("Missing download token", { status: 400 });
        }

        const supabase = getServiceSupabase();

        // Find order by download token
        const { data: order, error: fetchError } = await supabase
            .from("orders")
            .select("*")
            .eq("download_token", token)
            .single();

        if (fetchError || !order) {
            return new NextResponse(
                `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Link - APEX Theme</title>
          <style>
            body { font-family: system-ui; background: #0A0A0B; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { text-align: center; padding: 40px; background: rgba(255,255,255,0.05); border-radius: 16px; max-width: 400px; }
            h1 { color: #ef4444; }
            a { color: #D4AF37; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>❌ Invalid Download Link</h1>
            <p>This download link is invalid or has expired.</p>
            <p><a href="/">Return to homepage</a></p>
          </div>
        </body>
        </html>
        `,
                {
                    status: 404,
                    headers: { "Content-Type": "text/html" },
                }
            );
        }

        // Check if expired
        if (order.download_expires_at && new Date(order.download_expires_at) < new Date()) {
            return new NextResponse(
                `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Link Expired - APEX Theme</title>
          <style>
            body { font-family: system-ui; background: #0A0A0B; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { text-align: center; padding: 40px; background: rgba(255,255,255,0.05); border-radius: 16px; max-width: 400px; }
            h1 { color: #f59e0b; }
            a { color: #D4AF37; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>⏰ Link Expired</h1>
            <p>This download link has expired. Please contact support for assistance.</p>
            <p><a href="/">Return to homepage</a></p>
          </div>
        </body>
        </html>
        `,
                {
                    status: 410,
                    headers: { "Content-Type": "text/html" },
                }
            );
        }

        // Check download limit
        if (order.download_count >= order.max_downloads) {
            return new NextResponse(
                `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Download Limit Reached - APEX Theme</title>
          <style>
            body { font-family: system-ui; background: #0A0A0B; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { text-align: center; padding: 40px; background: rgba(255,255,255,0.05); border-radius: 16px; max-width: 400px; }
            h1 { color: #f59e0b; }
            a { color: #D4AF37; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>📊 Download Limit Reached</h1>
            <p>You've reached the maximum number of downloads (${order.max_downloads}). Please contact support if you need another download.</p>
            <p><a href="/">Return to homepage</a></p>
          </div>
        </body>
        </html>
        `,
                {
                    status: 403,
                    headers: { "Content-Type": "text/html" },
                }
            );
        }

        // Increment download count
        await supabase
            .from("orders")
            .update({
                download_count: order.download_count + 1,
                updated_at: new Date().toISOString(),
            })
            .eq("id", order.id);

        // Redirect to the actual file
        if (order.watermarked_file_url) {
            return NextResponse.redirect(order.watermarked_file_url);
        } else {
            // Fallback to original theme URL if no watermarked version
            const originalUrl = process.env.ORIGINAL_THEME_URL;
            if (originalUrl) {
                return NextResponse.redirect(originalUrl);
            }

            return new NextResponse("Theme file not found", { status: 404 });
        }
    } catch (error) {
        console.error("Download error:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
