import React from "react";
import ReactDOM from "react-dom/client";
import IntroComponent from "./components/intro";
import Navbar from "./components/navbar";
const App = () => {
    return (
        <div className="font-Roboto bg-[#E7E7E7] ">
            {/* <!--dark:bg-[#1F1F1F] */}
            <Navbar />
            <IntroComponent />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);