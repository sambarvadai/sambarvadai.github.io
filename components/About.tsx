import React, { useState, useEffect } from "react";

const CELL = "rounded-2xl p-4 flex flex-col gap-2";
const DARK = { background: "#d94e0f", border: "1px solid rgba(255,255,255,0.1)" };
const LIGHT = { background: "#FFF8F2", border: "1px solid rgba(0,0,0,0.06)" };

// --- NYC Clock ---
const ClockCell = () => {
    const [time, setTime] = useState("");
    const [label, setLabel] = useState("");

    const getLabel = (h: number) => {
        if (h < 6) return "probably asleep";
        if (h < 9) return "just waking up";
        if (h < 12) return "probably coding";
        if (h < 14) return "grabbing lunch";
        if (h < 18) return "deep in work";
        if (h < 21) return "winding down";
        return "late night session";
    };

    useEffect(() => {
        const tick = () => {
            const ny = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
            setTime(ny.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
            setLabel(getLabel(ny.getHours()));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={`${CELL} justify-between min-h-36`} style={DARK}>
            <span className="text-xs font-inter text-white/60 uppercase tracking-wide">NYC Time</span>
            <div>
                <p className="font-is text-3xl tabular-nums text-white">{time}</p>
                <p className="font-inter text-xs text-white/60 mt-1">{label}</p>
            </div>
        </div>
    );
};

// --- GitHub Activity ---
type GHEvent = {
    type: string;
    repo: { name: string };
    payload: Record<string, any>;
    created_at: string;
};

type ParsedEvent = { label: string; sub: string; repo: string };

const GitHubCell = () => {
    const [events, setEvents] = useState<ParsedEvent[]>([]);
    const [idx, setIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.github.com/users/sambarvadai/events?per_page=20")
            .then(r => r.json())
            .then((data: GHEvent[]) => {
                const parsed = data
                    .filter(e => ["PushEvent", "CreateEvent", "PullRequestEvent"].includes(e.type))
                    .slice(0, 5)
                    .map(e => {
                        const repo = e.repo.name.replace("sambarvadai/", "");
                        if (e.type === "PushEvent") {
                            return { label: e.payload?.commits?.[0]?.message || "pushed code", sub: "pushed to", repo };
                        }
                        if (e.type === "CreateEvent") {
                            return { label: e.payload.ref || repo, sub: `created ${e.payload.ref_type}`, repo };
                        }
                        if (e.type === "PullRequestEvent") {
                            return { label: e.payload.pull_request?.title || "PR", sub: `${e.payload.action} PR`, repo };
                        }
                        return { label: "activity", sub: e.type, repo };
                    });
                setEvents(parsed);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const e = events[idx];

    return (
        <div className={`${CELL} justify-between min-h-36`} style={LIGHT}>
            <div className="flex justify-between items-start">
                <span className="text-xs font-inter text-neutral-400 uppercase tracking-wide">GitHub Activity</span>
                {!loading && e && (
                    <span className="text-xs font-inter text-neutral-400 bg-neutral-200 px-2 py-0.5 rounded-full">{e.repo}</span>
                )}
            </div>
            {loading ? (
                <p className="font-inter text-xs text-neutral-400">Loading...</p>
            ) : !e ? (
                <p className="font-inter text-xs text-neutral-400">No recent activity</p>
            ) : (
                <div className="flex flex-col gap-0.5">
                    <p className="font-inter text-sm leading-snug line-clamp-2 text-neutral-800">{e.label}</p>
                    <p className="font-inter text-xs text-neutral-400">{e.sub}</p>
                </div>
            )}
            {events.length > 1 && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIdx(i => Math.max(0, i - 1))}
                        disabled={idx === 0}
                        className="text-neutral-400 hover:text-neutral-700 disabled:opacity-30 text-sm cursor-pointer"
                    >←</button>
                    <span className="font-inter text-xs text-neutral-400">{idx + 1}/{events.length}</span>
                    <button
                        onClick={() => setIdx(i => Math.min(events.length - 1, i + 1))}
                        disabled={idx === events.length - 1}
                        className="text-neutral-400 hover:text-neutral-700 disabled:opacity-30 text-sm cursor-pointer"
                    >→</button>
                </div>
            )}
        </div>
    );
};

// --- Sports / Upcoming ---
type BarcaMatch = { opponent: string; date: string; competition: string; venue: string } | null;

const SportsCell = () => {
    const [tab, setTab] = useState<"f1" | "barca">("f1");
    const [f1, setF1] = useState<{ raceName: string; date: string; Circuit: { Location: { country: string } } } | null>(null);
    const [loadingF1, setLoadingF1] = useState(true);
    const [barca, setBarca] = useState<BarcaMatch>(null);
    const [loadingBarca, setLoadingBarca] = useState(true);

    useEffect(() => {
        fetch("https://api.jolpi.ca/ergast/f1/current/next.json")
            .then(r => r.json())
            .then(d => {
                setF1(d?.MRData?.RaceTable?.Races?.[0] ?? null);
                setLoadingF1(false);
            })
            .catch(() => setLoadingF1(false));

        fetch("/api/barca")
            .then(r => r.json())
            .then(d => { setBarca(d); setLoadingBarca(false); })
            .catch(() => setLoadingBarca(false));
    }, []);

    return (
        <div className={`${CELL} col-span-2`} style={DARK}>
            <div className="flex justify-between items-center">
                <span className="text-xs font-inter text-white/60 uppercase tracking-wide">things I'm waiting for</span>
                <div className="flex gap-1.5">
                    {(["f1", "barca"] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="text-xs font-inter px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                            style={tab === t ? { background: "rgba(0,0,0,0.25)", color: "white" } : { color: "rgba(255,255,255,0.5)" }}
                        >
                            {t === "f1" ? "F1" : "Barça"}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-1">
                {tab === "f1" ? (
                    loadingF1 ? (
                        <p className="font-inter text-xs text-white/60">Loading...</p>
                    ) : f1 ? (
                        <div>
                            <p className="font-inter text-sm font-medium text-white">{f1.raceName}</p>
                            <p className="font-inter text-xs text-white/60 mt-0.5">
                                {f1.Circuit.Location.country} · {new Date(f1.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                        </div>
                    ) : (
                        <p className="font-inter text-xs text-white/60">No upcoming race found</p>
                    )
                ) : loadingBarca ? (
                    <p className="font-inter text-xs text-white/60">Loading...</p>
                ) : barca ? (
                    <div>
                        <p className="font-inter text-sm font-medium text-white">vs {barca.opponent}</p>
                        <p className="font-inter text-xs text-white/60 mt-0.5">
                            {barca.venue} · {barca.competition} · {new Date(barca.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                    </div>
                ) : (
                    <p className="font-inter text-xs text-white/60">No upcoming fixture found</p>
                )}
            </div>
        </div>
    );
};

// --- Currently Learning ---
const LearningCell = () => (
    <div className={`${CELL} justify-between`} style={LIGHT}>
        <span className="text-xs font-inter text-neutral-400 uppercase tracking-wide">Currently Learning</span>
        <div className="flex flex-col gap-2 mt-1">
            {["React Native", "Swift"].map(item => (
                <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#d94e0f" }} />
                    <span className="font-inter text-sm text-neutral-800">{item}</span>
                </div>
            ))}
        </div>
    </div>
);

// --- Spotify ---
type SpotifyData = { title: string; artist: string; coverUrl: string } | null;

const SpotifyCell = () => {
    const [data, setData] = useState<SpotifyData>(null);

    useEffect(() => {
        fetch("/api/spotify")
            .then(r => r.json())
            .then(setData)
            .catch(() => {});
    }, []);

    return (
    <div
        className={`${CELL} justify-between relative overflow-hidden`}
        style={data?.coverUrl ? {} : DARK}
    >
        {/* Blurred cover art background */}
        {data?.coverUrl && (
            <>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${data.coverUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(18px) brightness(0.45)",
                        transform: "scale(1.15)",
                    }}
                />
                <div className="absolute inset-0 z-0" style={{ background: "rgba(0,0,0,0.35)" }} />
            </>
        )}
        <span className="relative z-10 text-xs font-inter text-white/60 uppercase tracking-wide">Last Played</span>
        {data ? (
            <div className="relative z-10 flex items-center gap-3 mt-1">
                <img src={data.coverUrl} className="w-10 h-10 rounded-md flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                    <p className="font-inter text-sm text-white font-medium truncate">{data.title}</p>
                    <p className="font-inter text-xs text-white/60 truncate">{data.artist}</p>
                </div>
            </div>
        ) : (
            <p className="relative z-10 font-inter text-xs text-white/60">Spotify coming soon</p>
        )}
    </div>
    );
};

// --- About Section ---
const About = () => (
    <section id="about" className="px-20 py-24 flex flex-row gap-16 items-start">
        {/* Left: Prose */}
        <div className="w-[45%] flex flex-col gap-5">
            <h2 className="font-is text-5xl">About me.</h2>
            <p className="font-inter text-base font-light leading-relaxed text-neutral-700">
                I'm a product engineer based in New York City. I care about building things that work well and feel good to use — from the architecture underneath to the interactions on the surface.
            </p>
            <p className="font-inter text-base font-light leading-relaxed text-neutral-700">
                I've worked across the stack — shipping features, designing systems, and debugging the things nobody else wanted to touch. I'm drawn to the intersection of engineering and product thinking.
            </p>
            <p className="font-inter text-base font-light leading-relaxed text-neutral-700">
                I can build scalable backends, craft clean UIs, and navigate everything in between. Currently expanding into mobile with React Native and Swift.
            </p>
        </div>

        {/* Right: Bento */}
        <div className="w-[55%] grid grid-cols-2 gap-3">
            <ClockCell />
            <GitHubCell />
            <SportsCell />
            <LearningCell />
            <SpotifyCell />
        </div>
    </section>
);

export default About;
