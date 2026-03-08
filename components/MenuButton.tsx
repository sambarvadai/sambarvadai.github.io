import React, { useState, useRef, useEffect } from "react";

const menuItems = [
    { label: "About",   href: "#about",                    external: false },
    { label: "Work",    href: "#work",                     external: false },
    { label: "Contact", href: "#contact",                  external: false },
    { label: "Blog",    href: "https://blog.sambarvadai.dev", external: true },
];

const pillStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 20px rgba(0,0,0,0.08)",
};

const itemStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
};

const MenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pressing, setPressing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const startPress = () => {
        if (isOpen) { setIsOpen(false); return; }
        if (isMobile) { setIsOpen(true); return; }
        setPressing(true);
        timerRef.current = setTimeout(() => {
            setIsOpen(true);
            setPressing(false);
        }, 1500);
    };

    const cancelPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (!isOpen) setPressing(false);
    };

    // Mobile: hamburger pill — parent (home.tsx) handles fixed bottom-right positioning
    if (isMobile) {
        return (
            <div className="relative flex flex-col items-end">
                {/* Backdrop to close on outside tap */}
                {isOpen && (
                    <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />
                )}

                {/* Dropdown items stacked above the button */}
                <div
                    className={`absolute bottom-full right-0 mb-2 flex flex-col gap-2 items-end transition-all duration-200 ${isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-1"}`}
                >
                    {menuItems.map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="font-inter text-sm rounded-full px-5 py-2 cursor-pointer text-neutral-700 no-underline whitespace-nowrap"
                            style={itemStyle}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Hamburger / close button */}
                <button
                    className="rounded-full p-2.5 cursor-pointer"
                    style={{ background: "#F4611D", boxShadow: "0 4px 20px rgba(244,97,29,0.35)" }}
                    onClick={startPress}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <line x1="3" y1="12" x2="21" y2="12"/>
                            <line x1="3" y1="18" x2="21" y2="18"/>
                        </svg>
                    )}
                </button>
            </div>
        );
    }

    // Desktop: long-press pill at bottom-center (parent handles fixed positioning)
    return (
        <div className="relative flex items-center justify-center">
            <button
                className="relative overflow-hidden rounded-full px-5 py-2 select-none cursor-pointer group transition-transform duration-500 ease-in-out"
                style={pillStyle}
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
            >
                {/* Orange hover background */}
                <span
                    className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{ background: "#F4611D" }}
                />

                {/* Shine sweep during long press */}
                {pressing && (
                    <span
                        className="absolute inset-y-0 left-0"
                        style={{
                            background: "rgba(255, 255, 255, 0.3)",
                            animation: "shineFill 1.5s linear forwards",
                        }}
                    />
                )}

                <span className={`relative z-10 font-inter text-sm transition-colors duration-300 whitespace-nowrap ${isOpen ? "text-white" : "text-neutral-700 group-hover:text-white"}`}>
                    Menu
                </span>
            </button>

            {/* Items expand horizontally */}
            <div
                className="flex items-center gap-3 overflow-hidden"
                style={{
                    maxWidth: isOpen ? "400px" : "0",
                    marginLeft: isOpen ? "12px" : "0",
                    transition: "max-width 0.5s ease, margin-left 0.5s ease",
                }}
            >
                {menuItems.map((item, i) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className={`font-inter text-sm rounded-full px-4 py-2 cursor-pointer transition-all duration-300 text-neutral-700 hover:text-neutral-900 no-underline ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}
                        style={{ ...itemStyle, transitionDelay: isOpen ? `${i * 70}ms` : "0ms" }}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MenuButton;
