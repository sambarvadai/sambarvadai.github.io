import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGIN = "https://sambarvadai.dev";

// In-memory rate limit: 1 submission per IP per minute
// Entries older than RATE_WINDOW_MS are swept on each request to prevent unbounded growth
const rateMap = new Map<string, number>();
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();

    // Sweep stale entries
    for (const [key, ts] of rateMap) {
        if (now - ts >= RATE_WINDOW_MS) rateMap.delete(key);
    }

    const last = rateMap.get(ip);
    if (last && now - last < RATE_WINDOW_MS) return true;
    rateMap.set(ip, now);
    return false;
}

function setCORSHeaders(req: VercelRequest, res: VercelResponse): boolean {
    const origin = req.headers.origin;
    if (origin === ALLOWED_ORIGIN) {
        res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return req.method === "OPTIONS";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (setCORSHeaders(req, res)) return res.status(204).end();

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const ip = (req.headers["x-real-ip"] as string)
        ?? (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
        ?? "unknown";

    if (isRateLimited(ip)) {
        return res.status(429).json({ error: "Too many requests. Please wait a minute." });
    }

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (!EMAIL_RE.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    if (email.length > 254 || subject.length > 200 || message.length > 5000) {
        return res.status(400).json({ error: "Input exceeds maximum length" });
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
        return res.status(500).json({ error: "Failed to send" });
    }

    return res.status(200).json({ success: true });
}
