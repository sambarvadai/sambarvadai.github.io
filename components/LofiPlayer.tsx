import React, { useState, useRef, useEffect } from "react";

const STREAM_URL = "https://radio.plaza.one/mp3";

const LofiPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const audio = new Audio(STREAM_URL);
        audio.volume = 0.25;
        audioRef.current = audio;

        audio.addEventListener("waiting", () => setLoading(true));
        audio.addEventListener("playing", () => { setLoading(false); setPlaying(true); });
        audio.addEventListener("pause",   () => setPlaying(false));

        const tryPlay = () => {
            setLoading(true);
            audio.play().catch(() => setLoading(false));
        };

        window.addEventListener("scroll", tryPlay, { once: true });

        return () => {
            audio.pause();
            audio.src = "";
            window.removeEventListener("scroll", tryPlay);
        };
    }, []);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
        } else {
            setLoading(true);
            audio.play().catch(() => setLoading(false));
        }
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full px-3 py-2 font-inter text-xs text-neutral-700 transition-transform duration-200 hover:scale-105 select-none cursor-pointer"
            style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)",
                backdropFilter: "blur(16px) saturate(160%)",
                WebkitBackdropFilter: "blur(16px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 20px rgba(0,0,0,0.08)",
            }}
            title={playing ? "Pause lofi" : "Play lofi"}
        >
            {loading ? (
                <span
                    className="w-3 h-3 rounded-full border-2 border-transparent flex-shrink-0"
                    style={{
                        borderTopColor: "#d94e0f",
                        animation: "spin 0.7s linear infinite",
                    }}
                />
            ) : playing ? (
                <span className="flex items-end gap-[2px] w-4 h-3">
                    {[0, 1, 2].map(i => (
                        <span
                            key={i}
                            className="w-[3px] rounded-full"
                            style={{
                                background: "#d94e0f",
                                animation: `eq 0.8s ease-in-out infinite`,
                                animationDelay: `${i * 0.18}s`,
                            }}
                        />
                    ))}
                </span>
            ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#d94e0f">
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            )}
            <span>lofi</span>
        </button>
    );
};

export default LofiPlayer;
