import React from "react";

const Footer = React.forwardRef<HTMLElement>((_, ref) => (
    <footer ref={ref} className="w-full px-4 md:px-20 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 relative" style={{ background: "#0a0a0a" }}>
        <p className="font-is text-white/80 text-lg">Anirudh Chandrasekaran</p>
        <div className="flex gap-6 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            {[
                { label: "About",    href: "#about" },
                { label: "Work",     href: "#work" },
                { label: "Services", href: "#services" },
                { label: "Blog",     href: "https://blog.sambarvadai.dev", external: true },
                { label: "Contact",  href: "#contact" },
            ].map(link => (
                <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-inter text-xs text-white/40 hover:text-white/80 transition-colors"
                >
                    {link.label}
                </a>
            ))}
        </div>
        <p className="font-inter text-xs text-white/30 text-right">
            Fueled by filter coffee, claude code and prayers. © 2026
        </p>
    </footer>
));

export default Footer;
