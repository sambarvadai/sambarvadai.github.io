const IntroComponent = () => {
    return (
        <section className="flex items-center justify-center h-screen">
            <div>
                <h2 className="font-roboto text-2xl font-semibold">Hello!! My name is <span>Anirudh!</span></h2>
                <h3>I build web and mobile applications and sometimes try to design stuff.</h3>
                <h3>I also spend a lot of time breaking and fixing the stuff that I make.</h3>
                <div className="flex flex-row gap-5 mt-5">
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