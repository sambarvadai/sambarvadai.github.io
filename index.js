import React from "react";
import "@lottiefiles/lottie-player";
import ReactDOM from "react-dom/client";
import IntroComponent from "./components/intro";
import Navbar from "./components/navbar";
import AboutComponent from "./components/About";
import FourOhFourError from "./components/custom-component/404_error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
const App = () => {
    
    return (
        <div className="font-gsf bg-[#FFFFFF] dark:bg-[#1F1F1F]">
            <Navbar />
            <Outlet />
        </div>
    );
}
let router = createBrowserRouter([
        {
            path: "/",
        Component: App,
        errorElement: <FourOhFourError />,
        children: [
            {
                path: "/",
                Component: IntroComponent,
            },
            {
                path: "about",
                Component: AboutComponent,
            }
            ]
        }
])
    {/*TODO: Set up errorboundary for router config */}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);