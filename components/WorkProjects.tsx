import React from "react";

const projects = [
    {
        name: "Bug Bash",
        description: "A Leetcode style platform for practicing code debugging skills.",
        links: { github: "https://github.com/sambarvadai/bug-bash", demo: "https://bug-bash-red.vercel.app/" },
    },
    {
        name: "Atlantis",
        description: "An MCP based Agentic AI tool for system troubleshooting",
        links: { github: "https://github.com/sambarvadai/atlantis", demo: "" },
    },
    {
        name: "Uptime Check",
        description: "A simple utility to check the uptime of websites and API endpoints.",
        links: { github: "https://github.com/sambarvadai/uptime-check", demo: "" },
    },
];

const GitHubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const ExternalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
);

const WorkProjects = () => (
    <section className="px-20 py-8 pb-24">
        <div className="flex flex-row gap-12 items-start">
            {/* Left: Design */}
            <div
                className="w-[40%] rounded-2xl p-8 flex flex-col gap-4 min-h-80 items-start justify-between"
                style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.06)" }}
            >
                <span className="font-inter text-xs text-white/40 uppercase tracking-wide">Design Work</span>
                <div className="flex flex-col gap-2">
                    <p className="font-is text-3xl text-white">Coming soon.</p>
                    <p className="font-inter text-sm text-white/50 font-light leading-relaxed">
                        Recalibrating the color palettes and sharpening my pen tool.
                    </p>
                </div>
                <span className="font-inter text-xs text-white/30"></span>
            </div>

            {/* Right: Technical Projects */}
            <div className="w-[60%] flex flex-col gap-4">
                <span className="font-inter text-xs text-neutral-400 uppercase tracking-wide mb-1">Technical Projects</span>
                {projects.map((p, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-5 flex flex-col gap-3"
                        style={{ background: "#FFF8F2", border: "1px solid rgba(0,0,0,0.06)" }}
                    >
                        <div className="flex justify-between items-start">
                            <p className="font-is text-xl">{p.name}</p>
                            <div className="flex gap-3 items-center">
                                {p.links.github && (
                                    <a
                                        href={p.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-400 hover:text-neutral-800 transition-colors"
                                        title="GitHub"
                                    >
                                        <GitHubIcon />
                                    </a>
                                )}
                                {p.links.demo && (
                                    <a
                                        href={p.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-400 hover:text-neutral-800 transition-colors"
                                        title="Live Demo"
                                    >
                                        <ExternalIcon />
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="font-inter text-sm text-neutral-500 font-light leading-relaxed">{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WorkProjects;
