import Navbar from "./navbar" 
import '../app/globals.css'; 

const Hero = () => {
    return (
        <section
            id='hero'
            className="mesh flex grow flex-col justify-center items-start w-[100vw] min-h-screen overflow-x-hidden"
        >
            <Navbar />
            <div
                className="universalPadding w-full flex justify-start items-center"
            >
                <h1
                    className="text-5xl md:text-7xl lg:text-9xl/28 w-3/4 text-black"
                >
                    Attuning body, mind and soul to live a life you deserve.
                </h1>
            </div>
        </section>
    )
}
export default Hero