import React, { useState } from "react";

const transforms = [
  "rotate(-20deg) translateX(-24px) translateY(16px)",
  "rotate(-15deg) translateX(-18px) translateY(12px)",
  "rotate(-10deg) translateX(-12px) translateY(8px)",
  "rotate(-5deg) translateX(-6px) translateY(4px)",
  "rotate(0deg) translateX(0px) translateY(0px)",
];

const CardStack = ({ images }: { images: string[] }) => {
  const [order, setOrder] = useState(images.map((_, i) => i));

  const handleClick = (clickedPos: number) => {
    if (clickedPos === order.length - 1) return; // already front
    setOrder((prev) => {
      const next = [...prev];
      const [picked] = next.splice(clickedPos, 1);
      next.push(picked);
      return next;
    });
  };

  return (
    <div className="relative w-[210px] h-[300px] flex items-center justify-center group transition-transform duration-300">
      {order.map((imgIndex, stackPos) => (
        <div
          key={imgIndex}
          className="card-stack-item absolute transition-transform duration-[750ms] ease-in-out hover:-translate-y-2 hover:shadow-xl"
          style={{ transform: transforms[stackPos], zIndex: stackPos, cursor: stackPos < order.length - 1 ? "pointer" : "default" }}
          onClick={() => handleClick(stackPos)}
        >
          <img
            src={images[imgIndex]}
            className="w-[210px] h-[300px] object-cover rounded-md shadow-lg"
            alt="Card image"
          />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
