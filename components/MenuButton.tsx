import React, { useState, useRef } from "react";

const menuItems = [
    { label: "About",   href: "#about",                    external: false },
    { label: "Work",    href: "#work",                     external: false },
    { label: "Contact", href: "#contact",                  external: false },
    { label: "Blog",    href: "https://blog.sambarvadai.dev", external: true },
];

const MenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pressing, setPressing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startPress = () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }
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

    return (
        <div className="flex items-center justify-center">
            <button
                className={`relative overflow-hidden rounded-full px-5 py-2 select-none cursor-pointer group transition-transform duration-500 ease-in-out ${isOpen ? "-translate-x-0" : "translate-x-0"}`}
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)",
                    backdropFilter: "blur(16px) saturate(160%)",
                    WebkitBackdropFilter: "blur(16px) saturate(160%)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 20px rgba(0,0,0,0.08)",
                }}
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={startPress}
                onTouchEnd={cancelPress}
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

                {/* Label */}
                <span className={`relative z-10 font-inter text-sm transition-colors duration-300 whitespace-nowrap ${isOpen ? "text-white" : "text-neutral-700 group-hover:text-white"}`}>
                    Menu
                </span>
            </button>

            {/* Menu items */}
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
                        style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            transitionDelay: isOpen ? `${i * 70}ms` : "0ms",
                        }}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MenuButton;
