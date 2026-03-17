import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGIN = "https://sambarvadai.dev";

async function getAccessToken(): Promise<string> {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
        },
        body: `grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}`,
    });

    const data = await res.json();
    return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const origin = req.headers.origin;
    if (origin === ALLOWED_ORIGIN) {
        res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

    if (req.method === "OPTIONS") return res.status(204).end();

    try {
        const token = await getAccessToken();

        const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        const track = data.items?.[0]?.track;

        if (!track) return res.status(200).json(null);

        return res.status(200).json({
            title: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(", "),
            coverUrl: track.album.images[0]?.url ?? null,
        });
    } catch {
        return res.status(500).json({ error: "Failed to fetch Spotify data" });
    }
}
