import React from "react";
import "@lottiefiles/lottie-player";
import ReactDOM from "react-dom/client";

import IntroComponent from "./components/intro";
import Navbar from "./components/navbar";
import AboutComponent from "./components/About";
import Projects from "./components/projects";
import FourOhFourError from "./components/custom-component/404_error";

import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router";

const App = () => {
  return (
    <div className="min-h-screen font-gsf bg-[#FFFFFF] dark:bg-[#1F1F1F]">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    Component: App,
    errorElement: <FourOhFourError />,
    children: [
      { index: true, Component: IntroComponent },
      { path: "about", Component: AboutComponent },
      { path: "projects", Component: Projects },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<RouterProvider router={router} />);
