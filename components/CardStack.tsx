import React, { useState, useRef } from "react";

const transforms = [
    "rotate(-20deg) translateX(-24px) translateY(16px)",
    "rotate(-15deg) translateX(-18px) translateY(12px)",
    "rotate(-10deg) translateX(-12px) translateY(8px)",
    "rotate(-5deg) translateX(-6px) translateY(4px)",
    "rotate(0deg) translateX(0px) translateY(0px)",
];

type DragState = { active: boolean; x: number; y: number; startX: number; startY: number };

const CardStack = ({ images }: { images: string[] }) => {
    const [order, setOrder] = useState(images.map((_, i) => i));
    const [drag, setDrag] = useState<DragState>({ active: false, x: 0, y: 0, startX: 0, startY: 0 });
    const didDragRef = useRef(false);

    const cycleToBack = () => {
        setOrder(prev => {
            const next = [...prev];
            const top = next.pop()!;
            next.unshift(top);
            return next;
        });
    };

    const handleClick = (clickedPos: number) => {
        if (didDragRef.current) return;
        if (clickedPos === order.length - 1) return;
        setOrder(prev => {
            const next = [...prev];
            const [picked] = next.splice(clickedPos, 1);
            next.push(picked);
            return next;
        });
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, stackPos: number) => {
        if (stackPos !== order.length - 1) return;
        if (e.pointerType === "touch") return;
        e.currentTarget.setPointerCapture(e.pointerId);
        didDragRef.current = false;
        setDrag({ active: true, x: 0, y: 0, startX: e.clientX, startY: e.clientY });
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, stackPos: number) => {
        if (!drag.active || stackPos !== order.length - 1) return;
        const x = e.clientX - drag.startX;
        const y = e.clientY - drag.startY;
        if (Math.sqrt(x * x + y * y) > 5) didDragRef.current = true;
        setDrag(d => ({ ...d, x, y }));
    };

    const handlePointerUp = (_e: React.PointerEvent<HTMLDivElement>, stackPos: number) => {
        if (!drag.active || stackPos !== order.length - 1) return;
        const { x, y } = drag;
        setDrag({ active: false, x: 0, y: 0, startX: 0, startY: 0 });
        if (Math.sqrt(x * x + y * y) > 80) {
            cycleToBack();
            didDragRef.current = true;
        }
        setTimeout(() => { didDragRef.current = false; }, 50);
    };

    return (
        <div className="relative w-[210px] h-[300px] flex items-center justify-center">
            {order.map((imgIndex, stackPos) => {
                const isTop = stackPos === order.length - 1;
                const isDragging = isTop && drag.active;

                let transform = transforms[stackPos];
                let transition = "transform 750ms ease-in-out";
                let cursor = stackPos < order.length - 1 ? "pointer" : "grab";

                if (isDragging) {
                    const rot = drag.x * 0.07;
                    transform = `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)`;
                    transition = "none";
                    cursor = "grabbing";
                }

                return (
                    <div
                        key={imgIndex}
                        className="card-stack-item absolute"
                        style={{ transform, transition, zIndex: stackPos, cursor }}
                        onClick={() => handleClick(stackPos)}
                        onPointerDown={e => handlePointerDown(e, stackPos)}
                        onPointerMove={e => handlePointerMove(e, stackPos)}
                        onPointerUp={e => handlePointerUp(e, stackPos)}
                    >
                        <img
                            src={images[imgIndex]}
                            className="w-[210px] h-[300px] object-cover rounded-md shadow-lg"
                            alt="Card image"
                            draggable={false}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default CardStack;
