import React from "react";

const items = [
    { name: "JavaScript", quip: "the beautiful mess" },
    { name: "React", quip: "my love language" },
    { name: "TypeScript", quip: "disciplined chaos" },
    { name: "Node.js", quip: "JS went backend and never came back" },
    { name: "C++", quip: "respect the classics" },
    { name: "Python", quip: "for civilised moments" },
    { name: "React Native", quip: "one codebase, infinite prayers" },
];

const MarqueeItem = ({ name, quip }: { name: string; quip: string }) => (
    <span className="inline-flex items-center gap-4 mx-10 shrink-0">
        <span className="font-is text-2xl italic text-white/90">{name}</span>
        <span className="font-inter text-sm text-white/35 font-light">— {quip}</span>
        <span className="text-white/20 ml-4">◆</span>
    </span>
);

const Marquee: React.FC = () => {
    const doubled = [...items, ...items];

    return (
        <div className="w-full overflow-hidden py-6" style={{ background: "#0a0a0a" }}>
            <div
                className="flex whitespace-nowrap"
                style={{ animation: "marquee 40s linear infinite" }}
            >
                {doubled.map((item, i) => (
                    <MarqueeItem key={i} name={item.name} quip={item.quip} />
                ))}
            </div>
        </div>
    );
};

export default Marquee;
