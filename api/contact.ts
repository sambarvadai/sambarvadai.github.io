import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "contact@sambarvadai.dev",
            to: "anirudh@sambarvadai.dev",
            reply_to: email,
            subject: `[sambarvadai.dev] ${subject}`,
            text: `From: ${email}\n\n${message}`,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        return res.status(500).json({ error: error.message ?? "Failed to send" });
    }

    return res.status(200).json({ success: true });
}
