import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import CardStack from "./components/CardStack";
import MenuButton from "./components/MenuButton";
import Canvas from "./components/Canvas";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import WorkProjects from "./components/WorkProjects";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Footer from "./components/Footer";
import LofiPlayer from "./components/LofiPlayer";
import TypingChallenge from "./components/TypingChallenge";

const img1 = new URL("./assets/img1.png", import.meta.url).href;
const img2 = new URL("./assets/img2.png", import.meta.url).href;
const img3 = new URL("./assets/img3.png", import.meta.url).href;
const img4 = new URL("./assets/img4.png", import.meta.url).href;
const img5 = new URL("./assets/img5.png", import.meta.url).href;
const audioSrc = new URL("./audio/anirudh-name.mp3", import.meta.url).href;

const App = () => {
    const trackRef = useRef<HTMLAudioElement | null>(null);
    const leftRef = useRef<HTMLDivElement | null>(null);
    const rightRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const [canvasMode, setCanvasMode] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [showTyping, setShowTyping] = useState(false);
    const [eggHint, setEggHint] = useState<"hidden" | "visible" | "gone">("hidden");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [footerVisible, setFooterVisible] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    const playTrack = () => {
        if (trackRef.current) {
            trackRef.current.play().catch((err) => {
                console.error("Audio playback failed:", err);
            });
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && canvasMode) {
                setCanvasMode(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canvasMode]);

    useEffect(() => {
        if (showTyping) return;
        const show = setTimeout(() => {
            setEggHint("visible");
            setTimeout(() => setEggHint("gone"), 4000);
        }, 8000);
        return () => clearTimeout(show);
    }, [showTyping]);

    useEffect(() => {
        let buffer = "";
        const handle = (e: KeyboardEvent) => {
            if (showTyping || canvasMode) return;
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            buffer += e.key.toLowerCase();
            buffer = buffer.slice(-4);
            if (buffer === "type") setShowTyping(true);
        };
        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [showTyping, canvasMode]);

    useEffect(() => {
        if (!footerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleBgDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 768) return;
        const target = e.target as Node;
        if (leftRef.current?.contains(target)) return;
        if (rightRef.current?.contains(target)) return;
        if (menuRef.current?.contains(target)) return;
        setCanvasMode(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (canvasMode) return;
        setMousePos({ x: e.clientX, y: e.clientY });
        const target = e.target as Node;
        const overContent =
            leftRef.current?.contains(target) ||
            rightRef.current?.contains(target) ||
            menuRef.current?.contains(target) ||
            headerRef.current?.contains(target);
        setHovering(!overContent);
    };

    return (
        <div className="main-div bg-(--bg-main) min-h-screen">
            <div
                onDoubleClick={handleBgDoubleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHovering(false)}
            >
            <div ref={headerRef} className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 py-4 gap-1 sm:gap-0 font-is animate-fade-in">
                <p className="loc text-sm sm:text-base">New York City, USA</p>
                <p className="loc text-center text-sm sm:text-base">
                    <span className="group relative inline-flex items-center gap-1.5 cursor-pointer" onClick={playTrack}>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                        </span>
                        <span className="underline-slide">Anirudh Chandrasekaran</span>
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-inter text-xs px-2 py-1 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ background: "#d94e0f" }}>
                            click to hear pronunciation
                        </span>
                    </span>
                    {" | Product Engineer"}
                </p>
                <p className="flex items-center justify-end gap-2 text-sm sm:text-base">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-500 opacity-60"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    </span>
                    Open to Work
                </p>
            </div>

            <div className="flex flex-col md:flex-row my-10 md:my-25 gap-6 md:gap-0">
                <div
                    ref={leftRef}
                    className={`w-full md:w-[50%] h-full px-8 md:px-20 flex justify-center md:justify-end transition-transform duration-700 ease-in-out animate-fade-up ${canvasMode ? "md:-translate-x-[110%]" : "translate-x-0"}`}
                    style={{ animationDelay: "100ms" }}
                >
                    <CardStack images={[img1, img2, img3, img4, img5]}/>
                </div>
                <div
                    className={`w-full md:w-[50%] md:h-100 flex justify-center md:justify-start py-4 md:py-10 px-4 md:px-0 transition-transform duration-700 ease-in-out animate-fade-up ${canvasMode ? "md:translate-x-[110%]" : "translate-x-0"}`}
                    style={{ animationDelay: "250ms" }}
                >
                    <div ref={rightRef} className="inline-flex flex-col">
                        <p className="w-full md:w-85 font-is text-3xl md:text-4xl font-boldtext-left">Product Engineer.</p>
                        <p className="w-full md:w-85 font-inter text-md text-left font-light">I build scalable applications and the systems that keep them running.</p>
                        <p className="w-full md:w-85 font-inter text-md text-left mt-5 font-light">I also pay attention to the small details that make software feel good to use.</p>
                    </div>
                </div>
            </div>

            <div
                ref={menuRef}
                className={`fixed bottom-6 right-4 md:bottom-14 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 transition-opacity duration-500 ${canvasMode || footerVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                <MenuButton />
            </div>

            <p className={`w-full text-center font-inter text-xs animate-slide mt-6 transition-opacity duration-500 ${canvasMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                scroll down to continue
            </p>
            </div>

            {/* Lofi player — fixed bottom-left */}
            <div className={`fixed bottom-6 left-4 md:bottom-14 md:left-8 z-50 transition-opacity duration-500 ${canvasMode || footerVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <LofiPlayer />
            </div>

            {/* Easter egg hint — fades in once after 8s idle, gone after 4s */}
            <span
                className="fixed bottom-16 left-4 md:bottom-24 md:left-8 z-50 font-inter text-xs px-3 py-1.5 rounded-full pointer-events-none transition-opacity duration-700"
                style={{
                    background: "rgba(0,0,0,0.06)",
                    color: "#999",
                    opacity: eggHint === "visible" ? 1 : 0,
                }}
            >
                psst... try typing <span style={{ color: "#d94e0f" }}>type</span>
            </span>

            {/* Canvas overlay */}
            <div className={`fixed inset-0 z-40 transition-opacity duration-700 ${canvasMode ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <Canvas />
            </div>

            {/* Background hover tooltip — desktop only */}
            <span
                className={`fixed hidden md:inline whitespace-nowrap font-inter text-xs px-2 py-1 rounded-md text-white pointer-events-none transition-opacity duration-200 z-60 ${hovering && !canvasMode ? "opacity-100" : "opacity-0"}`}
                style={{ background: "#d94e0f", left: mousePos.x, top: mousePos.y + 16 }}
            >
                Double click to activate canvas
            </span>

            <audio ref={trackRef} src={audioSrc} preload="auto"/>

            {/* Typing challenge easter egg — trigger by typing "type" anywhere */}
            {showTyping && <TypingChallenge onClose={() => setShowTyping(false)} />}

            <About />
            <WorkExperience />
            <WorkProjects />
            <Services />
            <Contact />
            <Footer ref={footerRef} />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
