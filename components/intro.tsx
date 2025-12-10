import React, {useRef} from "react";
import Tooltip from "./Tooltip";
const IntroComponent = () => {
    const emailRef = useRef<HTMLAnchorElement>(null);
    const gitRef = React.useRef<HTMLAnchorElement>(null);
    const linkedinRef = React.useRef<HTMLAnchorElement>(null);
    const dribbbleRef = React.useRef<HTMLAnchorElement>(null);
    return (
        <section className="flex items-center justify-center">
            <Tooltip elementRef={emailRef} >
                <span className="hidden">Say Hi!</span>
            </Tooltip>
            <Tooltip elementRef={gitRef}>
                <span className="hidden">View my Projects!</span>
            </Tooltip>
             <Tooltip elementRef={linkedinRef}>
                <span className="hidden">Connect with me!</span>
            </Tooltip>
            <Tooltip elementRef={dribbbleRef}>
                <span className="hidden">Check my designs!</span>
            </Tooltip>
            <div>
                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-100">Hello!! My name is <span>Anirudh!</span></h2>
                <h3 className="text-gray-500 dark:text-gray-200">I build web and mobile applications and sometimes try to design stuff.</h3>
                <h3 className="text-gray-500 dark:text-gray-200">I also spend a lot of time breaking and fixing the stuff that I make.</h3>
                <div className="flex flex-row gap-5 mt-5 text-gray-600 dark:text-gray-300">
                    <a className="underline hover:font-semibold">Email Me!</a>
                    <a className="underline hover:font-semibold">Github</a>
                    <a className="underline hover:font-semibold">Linkedin</a>
                    <a className="underline hover:font-semibold">Dribbble</a>
                </div>
            </div>
        </section>
    );
}
export default IntroComponent