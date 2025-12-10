import AcordionComponent from "./acordion";
import { aboutSections } from "../data/acordionData";
const AboutComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen w-[60%] m-auto">
            <div className="dark:text-gray-300 animate-fadeIn">
            <h2 className="text-2xl font-semibold dark:text-gray-100">About Me</h2>
                <p className="mt-5 text-lg leading-relaxed">So..you're wondering how I ended up here? Let me explain!</p>
                <p className="mt-5">I studied a thing..then I worked at a large FMCG company, you can call it a <span className="italic">SaaS: Soap as a Service</span>. After building applications and dashboard, someone decided that I should manage projects instead of just developing them.</p>
                <p className="mt-5">After mananging projects and delivering quality work, I decided to get back into tech and face the technical challenges head on. What's the fun in staying behind the scenes when you can get your hands dirty?</p>
                <p className="mt-5">So, I packed my bags and moved to another country...and studied another thing.</p>
                <p className="mt-5 text-lg">Oh, and one more thing: I'm looking for Full time opportunities 😁</p>
                <AcordionComponent props={aboutSections} />
            </div>
        </div>
    )
}
export default AboutComponent;