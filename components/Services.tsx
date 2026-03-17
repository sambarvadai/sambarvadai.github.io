import React from "react";

const services = [
    {
        number: "01",
        title: "Development",
        subtitle: "Mobile & Web",
        description: "Full-stack applications built to scale. React, Node, TypeScript on the web, React Native and Swift on mobile. From greenfield to production.",
        cta: "Let's build →",
        href: "#contact",
        dashed: false,
    },
    {
        number: "02",
        title: "Cloud",
        subtitle: "Deployments & Infrastructure",
        description: "CI/CD pipelines, containerised services, serverless functions, and the bits in between that keep things running at 3am so you don't have to.",
        cta: "Let's deploy →",
        href: "#contact",
        dashed: false,
    },
    {
        number: "03",
        title: "Design",
        subtitle: "UI & Product",
        description: "I care deeply about how things look and feel. I'm still learning the craft properly, so if you're a designer willing to collaborate and teach, I'm very much here for it.",
        cta: "Teach me something →",
        href: "#contact",
        dashed: true,
    },
];

const Services = () => (
    <section id="services" className="px-4 md:px-20 py-12 md:py-24">
        <h2 className="font-is text-4xl md:text-5xl mb-10">Services.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
                <div
                    key={s.number}
                    className="flex flex-col justify-between rounded-2xl p-6 gap-8 transition-transform duration-200 hover:-translate-y-1"
                    style={{
                        background: s.dashed ? "transparent" : "#FFF8F2",
                        border: s.dashed
                            ? "1.5px dashed rgba(0,0,0,0.15)"
                            : "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                            <span className="font-inter text-xs text-neutral-300 tabular-nums">{s.number}</span>
                            {s.dashed && (
                                <span
                                    className="font-inter text-xs px-2 py-0.5 rounded-full"
                                    style={{ background: "#FFF1E9", color: "#d94e0f", border: "1px solid rgba(217,78,15,0.2)" }}
                                >
                                    still learning
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="font-is text-2xl">{s.title}</p>
                            <p className="font-inter text-xs text-neutral-400 mt-0.5">{s.subtitle}</p>
                        </div>
                        <p className="font-inter text-sm text-neutral-600 font-light leading-relaxed">
                            {s.description}
                        </p>
                    </div>
                    <a
                        href={s.href}
                        className="font-inter text-sm w-fit transition-opacity duration-150 hover:opacity-60"
                        style={{ color: "#d94e0f" }}
                    >
                        {s.cta}
                    </a>
                </div>
            ))}
        </div>
    </section>
);

export default Services;
