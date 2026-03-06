import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const response = await fetch(
            "https://api.football-data.org/v4/teams/81/matches?status=SCHEDULED&limit=1",
            { headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! } }
        );

        const data = await response.json();
        const match = data.matches?.[0];

        if (!match) return res.status(200).json(null);

        const isHome = match.homeTeam.id === 81;
        const opponent = isHome ? match.awayTeam.name : match.homeTeam.name;

        return res.status(200).json({
            opponent,
            date: match.utcDate,
            competition: match.competition.name,
            venue: isHome ? "Home" : "Away",
        });
    } catch {
        return res.status(500).json({ error: "Failed to fetch fixture data" });
    }
}
