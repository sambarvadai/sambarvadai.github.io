import React from "react";
import ReactDOM from "react-dom/client";
type CardStackProps = {
    images: string[];
}
const CardStack = ({ images }: { images: string[] }) => {
  return (
    <div className="relative w-[210px] h-[300px] flex items-center justify-center group transition-transform duration-300">

      {images.map((src, index) => {
   const transforms = [
  "rotate(-20deg) translateX(-24px) translateY(16px)",
  "rotate(-15deg) translateX(-18px) translateY(12px)",
  "rotate(-10deg) translateX(-12px) translateY(8px)",
  "rotate(-5deg) translateX(-6px) translateY(4px)",
  "rotate(0deg) translateX(0px) translateY(0px)" // front card
];

          {console.log(src)}
        const isFront = index === images.length - 1;
        return (
          <div key={index} className="absolute hover:-translate-y-2 hover:shadow-xl" style={{
              transform: transforms[index],
              zIndex: index
            }}>
            <img src={src} className="w-[210px] h-[300px] object-cover rounded-md shadow-lg" alt="Card image"/>
          </div>
        );
      })}

    </div>
  );
};
export default CardStack;