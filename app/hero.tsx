import Navbar from "./navbar" 
import '../app/globals.css'; 

const Hero = () => {
    return (
        <div
            className="mesh flex grow flex-col justify-center items-start w-[100vw] overflow-x-hidden"
        >
            <Navbar />
            <div
                className="universalPadding"
            >
                <h1
                    className="text-9xl/28 w-3/4 text-black"
                >
                    Attuning body, mind and soul to live a life you deserve.
                </h1>
            </div>
        </div>
    )
}
export default Hero