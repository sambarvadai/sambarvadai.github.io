import React, { useState, useEffect, useRef } from "react";

const sentences = [
    "ship it, fix it later, apologize in the standup",
    "the best code is the code you never had to write",
    "coffee goes in and code comes out, nobody knows how",
    "every great engineer googles the same things as you do",
    "debugging is being the detective in a crime you committed",
];

const verdict = (wpm: number) => {
    if (wpm < 30) return "are you... ok?";
    if (wpm < 50) return "getting there, champ";
    if (wpm < 70) return "decent. for a human.";
    if (wpm < 90) return "now we're talking";
    if (wpm < 110) return "okay you're actually good";
    return "are you even human";
};

const TypingChallenge = ({ onClose }: { onClose: () => void }) => {
    const [sentence] = useState(() => sentences[Math.floor(Math.random() * sentences.length)]);
    const [typed, setTyped] = useState("");
    const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null);
    const typedRef = useRef("");
    const startTimeRef = useRef<number | null>(null);
    const totalKeysRef = useRef(0);
    const correctKeysRef = useRef(0);

    useEffect(() => {
        typedRef.current = "";
        startTimeRef.current = null;
        totalKeysRef.current = 0;
        correctKeysRef.current = 0;
    }, [sentence]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (result) return;
            if (e.key === "Escape") { onClose(); return; }

            if (e.key === "Backspace") {
                typedRef.current = typedRef.current.slice(0, -1);
                setTyped(typedRef.current);
                return;
            }

            if (e.key.length !== 1) return;

            const pos = typedRef.current.length;
            if (pos >= sentence.length) return;

            if (!startTimeRef.current) startTimeRef.current = Date.now();

            totalKeysRef.current += 1;
            if (e.key === sentence[pos]) correctKeysRef.current += 1;

            typedRef.current = typedRef.current + e.key;
            setTyped(typedRef.current);

            if (typedRef.current.length === sentence.length) {
                const elapsed = Math.max((Date.now() - startTimeRef.current!) / 1000 / 60, 0.001);
                const words = sentence.trim().split(/\s+/).length;
                const wpm = Math.round(words / elapsed);
                const accuracy = Math.round((correctKeysRef.current / totalKeysRef.current) * 100);
                setResult({ wpm, accuracy });
            }
        };

        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [result, onClose, sentence]);

    const reset = () => {
        typedRef.current = "";
        startTimeRef.current = null;
        totalKeysRef.current = 0;
        correctKeysRef.current = 0;
        setTyped("");
        setResult(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#FFF1E9" }}>
            <div className="max-w-2xl w-full px-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <p className="font-is text-3xl">typing test</p>
                    <span className="font-inter text-xs text-neutral-400">esc to exit</span>
                </div>

                {!result ? (
                    <>
                        <div className="font-mono text-base leading-relaxed tracking-wide select-none p-5 rounded-2xl bg-white/60 border border-neutral-200/70">
                            {sentence.split("").map((char, i) => {
                                let color = "text-neutral-300";
                                if (i < typed.length) {
                                    color = typed[i] === char ? "text-neutral-900" : "text-red-400";
                                }
                                return (
                                    <span
                                        key={i}
                                        className={color}
                                        style={i === typed.length ? { borderLeft: "2px solid #1a1a1a" } : {}}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                        <p className="font-inter text-xs text-neutral-400">
                            {typed.length === 0 ? "start typing to begin..." : `${typed.length} / ${sentence.length}`}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/60 border border-neutral-200/70">
                        <p className="font-is" style={{ fontSize: "4rem", lineHeight: 1, color: "#d94e0f" }}>
                            {result.wpm}
                            <span className="text-2xl text-neutral-400 font-inter font-light ml-2">wpm</span>
                        </p>
                        <p className="font-inter text-sm text-neutral-500">
                            {result.accuracy}% accuracy · {verdict(result.wpm)}
                        </p>
                        <div className="flex gap-3 mt-2">
                            <button
                                className="font-inter text-sm px-4 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ background: "#d94e0f", color: "white" }}
                                onClick={reset}
                            >
                                try again
                            </button>
                            <button
                                className="font-inter text-sm px-4 py-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity border border-neutral-200"
                                onClick={onClose}
                            >
                                close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypingChallenge;
