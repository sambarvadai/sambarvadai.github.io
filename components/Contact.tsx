import React, { useState, useRef, useEffect } from "react";

const GLOSS = (
    <div
        className="absolute inset-0 pointer-events-none z-0 rounded-3xl"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)" }}
    />
);

const CARD_STYLE: React.CSSProperties = {
    background: "#1C1C1E",
    border: "1px solid rgba(255,255,255,0.07)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    position: "absolute",
    inset: 0,
    borderRadius: "1.5rem",
    overflow: "hidden",
    padding: "3rem",
};

const Contact = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [light, setLight] = useState({ x: 50, y: 50 });
    const [active, setActive] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ email: "", subject: "", message: "" });
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flipped) {
            const t = setTimeout(() => emailInputRef.current?.focus(), 680);
            return () => clearTimeout(t);
        }
    }, [flipped]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (flipped) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normalX = (x / rect.width - 0.5) * 2;
        const normalY = (y / rect.height - 0.5) * 2;
        setTilt({ x: -normalY * 3, y: normalX * 3 });
        setLight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setActive(false);
    };

    const handleFlip = () => {
        setFlipped(f => !f);
        setTilt({ x: 0, y: 0 });
        setActive(false);
    };

    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send");
            setSent(true);
        } catch {
            setError("Something went wrong. Try emailing directly.");
        } finally {
            setSending(false);
        }
    };

    const INPUT_STYLE: React.CSSProperties = {
        border: "1px solid rgba(255,255,255,0.1)",
    };

    return (
        <section id="contact" className="px-20 py-24 flex flex-col items-center">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: "600px",
                    height: "300px",
                    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: active && !flipped ? "transform 0.08s ease-out" : "transform 0.6s ease-out",
                    willChange: "transform",
                }}
            >
                {/* Flip container */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${flipped ? 180 : 0}deg)`,
                        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {/* Front */}
                    <div style={{ ...CARD_STYLE, pointerEvents: flipped ? "none" : "auto" }}>
                        {/* Specular light */}
                        <div
                            className="absolute inset-0 pointer-events-none z-0"
                            style={{
                                background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)`,
                                opacity: active && !flipped ? 1 : 0,
                                transition: active ? "opacity 0.15s" : "opacity 0.5s",
                            }}
                        />
                        {GLOSS}
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-3">
                                <p className="font-is text-3xl text-white">Let's build something</p>
                                <p className="font-inter text-sm text-white/50 font-light leading-relaxed">
                                    Open to collaborations, full-time roles, and interesting conversations.
                                </p>
                            </div>
                            <div className="flex flex-row justify-between items-end">
                                <div className="flex flex-col gap-1.5">
                                    <a
                                        href="mailto:your@email.com"
                                        className="font-inter text-sm text-white/80 hover:text-white transition-colors"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        anirudh@sambarvadai.dev
                                    </a>
                                    <div className="flex gap-4">
                                        {[
                                            { label: "GitHub",   href: "https://github.com/sambarvadai" },
                                            { label: "LinkedIn", href: "https://linkedin.com/in/anicsekaran" },
                                            { label: "Dribbble", href: "https://dribbble.com/sambarvadai" },
                                            { label: "Leetcode", href: "https://leetcode.com/sambarvadai" },
                                        ].map(link => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-inter text-xs text-white/40 hover:text-white/80 transition-colors"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {link.label} ↗
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={handleFlip}
                                    className="font-inter text-sm px-4 py-2 rounded-full cursor-pointer transition-opacity hover:opacity-80 text-white"
                                    style={{ background: "#d94e0f" }}
                                >
                                    Write to me →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div style={{ ...CARD_STYLE, transform: "rotateY(180deg)", padding: "2rem", pointerEvents: flipped ? "auto" : "none" }}>
                        {GLOSS}
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            {sent ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-is text-3xl text-white">Sent.</p>
                                        <p className="font-inter text-sm text-white/50">I'll get back to you soon.</p>
                                    </div>
                                    <button
                                        onClick={() => { setFlipped(false); setSent(false); setForm({ email: "", subject: "", message: "" }); }}
                                        className="font-inter text-xs text-white/40 hover:text-white/60 transition-colors text-left w-fit cursor-pointer"
                                    >
                                        ← back
                                    </button>
                                </>
                            ) : (
                                <form onSubmit={handleSend} className="flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-center">
                                        <p className="font-is text-2xl text-white">Drop a line.</p>
                                        <button
                                            type="button"
                                            onClick={handleFlip}
                                            className="font-inter text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
                                        >
                                            ← back
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            required
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            className="w-full font-inter text-sm text-white bg-transparent rounded-xl px-3 py-2 outline-none placeholder-white/20"
                                            style={INPUT_STYLE}
                                        />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Subject"
                                            value={form.subject}
                                            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                            className="w-full font-inter text-sm text-white bg-transparent rounded-xl px-3 py-2 outline-none placeholder-white/20"
                                            style={INPUT_STYLE}
                                        />
                                        <textarea
                                            required
                                            placeholder="What's on your mind?"
                                            rows={2}
                                            value={form.message}
                                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                            className="w-full font-inter text-sm text-white bg-transparent rounded-xl px-3 py-2 outline-none resize-none placeholder-white/20"
                                            style={INPUT_STYLE}
                                        />
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5">
                                        {error && <p className="font-inter text-xs text-red-400">{error}</p>}
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="font-inter text-sm px-5 py-2 rounded-full cursor-pointer text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                                            style={{ background: "#d94e0f" }}
                                        >
                                            {sending ? "Sending..." : "Send"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
