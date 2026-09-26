import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, botcheck } = body;

    // Honeypot spam protection
    if (botcheck) {
      return NextResponse.json(
        { error: "Spam detected." },
        { status: 400 }
      );
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Valid name is required (min 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // If Web3Forms access key is configured in env, forward to Web3Forms
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Portfolio Message from ${name.trim()}`,
          from_name: "Ayush Portfolio",
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to deliver email through provider.");
      }
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: "Message processed successfully. Ayush will get back to you shortly.",
      recipient: "ayushkumaar41@gmail.com",
    });
  } catch (error: unknown) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { error: "Internal server error while sending message." },
      { status: 500 }
    );
  }
}
