import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const businessName = formData.get("businessName") as string | null;
        const paymentMethod = formData.get("paymentMethod") as string;
        const screenshot = formData.get("screenshot") as File;

        // Validate required fields
        if (!name || !email || !phone || !paymentMethod || !screenshot) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Upload screenshot to Vercel Blob
        const screenshotBuffer = Buffer.from(await screenshot.arrayBuffer());
        const screenshotFilename = `screenshots/${uuidv4()}-${screenshot.name}`;

        const { url: screenshotUrl } = await put(screenshotFilename, screenshotBuffer, {
            access: "public",
            contentType: screenshot.type,
        });

        // Create order in Supabase
        const supabase = getServiceSupabase();
        const orderId = uuidv4();

        const { data, error } = await supabase.from("orders").insert({
            id: orderId,
            email: email.toLowerCase().trim(),
            name: name.trim(),
            phone: phone.trim(),
            business_name: businessName?.trim() || null,
            payment_method: paymentMethod,
            screenshot_url: screenshotUrl,
            status: "pending",
            download_count: 0,
            max_downloads: 3,
        }).select().single();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to create order" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            orderId: data.id,
        });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // Check admin auth
        const authHeader = request.headers.get("authorization");
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = getServiceSupabase();

        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to fetch orders" },
                { status: 500 }
            );
        }

        return NextResponse.json({ orders: data });
    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
