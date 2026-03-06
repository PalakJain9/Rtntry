"use client";
import Navbar from "./navbar"
import '../app/globals.css'; 

const Hero = () => {
    return (
        <section
            id='hero'
            className="mesh flex grow flex-col justify-center items-start w-[100vw] min-h-screen overflow-x-hidden relative"
        >
            {/* Premium animated blobs background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Premium coral blob with sparkle */}
                <div className="absolute w-96 h-96 rounded-full opacity-50" 
                     style={{
                         background: 'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.8) 0%, rgba(255,198,149,0.6) 30%, rgba(255,182,193,0.4) 60%, transparent 100%)',
                         boxShadow: '0 0 80px rgba(255,215,0,0.4), inset 0 0 40px rgba(255,255,255,0.3)',
                         top: '10%',
                         left: '5%',
                         animation: 'blobFloat1 20s ease-in-out infinite'
                     }} />
                
                {/* Premium blue blob with sparkle */}
                <div className="absolute w-80 h-80 rounded-full opacity-50" 
                     style={{
                         background: 'radial-gradient(circle at 70% 70%, rgba(173,216,230,0.8) 0%, rgba(133,235,253,0.6) 30%, rgba(135,206,250,0.4) 60%, transparent 100%)',
                         boxShadow: '0 0 60px rgba(133,235,253,0.4), inset 0 0 30px rgba(255,255,255,0.3)',
                         top: '60%',
                         right: '10%',
                         animation: 'blobFloat2 25s ease-in-out infinite'
                     }} />
                
                {/* Premium rose gold blob with sparkle */}
                <div className="absolute w-72 h-72 rounded-full opacity-50" 
                     style={{
                         background: 'radial-gradient(circle at 50% 50%, rgba(255,223,186,0.8) 0%, rgba(252,167,195,0.6) 30%, rgba(255,192,203,0.4) 60%, transparent 100%)',
                         boxShadow: '0 0 70px rgba(252,167,195,0.4), inset 0 0 35px rgba(255,255,255,0.3)',
                         bottom: '20%',
                         left: '20%',
                         animation: 'blobFloat3 22s ease-in-out infinite'
                     }} />
                
                {/* Premium lavender blob with sparkle */}
                <div className="absolute w-64 h-64 rounded-full opacity-50" 
                     style={{
                         background: 'radial-gradient(circle at 40% 60%, rgba(230,230,250,0.8) 0%, rgba(156,152,252,0.6) 30%, rgba(218,112,214,0.4) 60%, transparent 100%)',
                         boxShadow: '0 0 50px rgba(156,152,252,0.4), inset 0 0 25px rgba(255,255,255,0.3)',
                         top: '30%',
                         right: '30%',
                         animation: 'blobFloat4 18s ease-in-out infinite'
                     }} />

                {/* Sparkle particles */}
                <div className="absolute bg-white rounded-full opacity-80" 
                     style={{
                         width: '4px',
                         height: '4px',
                         top: '15%',
                         left: '10%',
                         boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                         animation: 'sparkle1 3s ease-in-out infinite'
                     }} />
                <div className="absolute bg-white rounded-full opacity-90" 
                     style={{
                         width: '3px',
                         height: '3px',
                         top: '65%',
                         right: '15%',
                         boxShadow: '0 0 8px rgba(255,255,255,0.9)',
                         animation: 'sparkle2 2.5s ease-in-out infinite'
                     }} />
                <div className="absolute bg-white rounded-full opacity-70" 
                     style={{
                         width: '6px',
                         height: '6px',
                         bottom: '25%',
                         left: '25%',
                         boxShadow: '0 0 12px rgba(255,255,255,0.7)',
                         animation: 'sparkle3 4s ease-in-out infinite'
                     }} />
                <div className="absolute bg-white rounded-full opacity-85" 
                     style={{
                         width: '3.5px',
                         height: '3.5px',
                         top: '35%',
                         right: '35%',
                         boxShadow: '0 0 9px rgba(255,255,255,0.85)',
                         animation: 'sparkle4 3.5s ease-in-out infinite'
                     }} />
            </div>

            {/* Blob animation styles */}
            <style jsx>{`
                @keyframes blobFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    25% { transform: translate(100px, -50px) scale(1.1) rotate(90deg); }
                    50% { transform: translate(-50px, 100px) scale(0.9) rotate(180deg); }
                    75% { transform: translate(50px, 50px) scale(1.05) rotate(270deg); }
                }
                @keyframes blobFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    25% { transform: translate(-80px, 60px) scale(1.2) rotate(120deg); }
                    50% { transform: translate(60px, -80px) scale(0.8) rotate(240deg); }
                    75% { transform: translate(-60px, -60px) scale(1.1) rotate(360deg); }
                }
                @keyframes blobFloat3 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(70px, -70px) scale(1.15) rotate(135deg); }
                    66% { transform: translate(-70px, 70px) scale(0.85) rotate(270deg); }
                }
                @keyframes blobFloat4 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    25% { transform: translate(-90px, -90px) scale(1.25) rotate(180deg); }
                    50% { transform: translate(90px, -45px) scale(0.75) rotate(360deg); }
                    75% { transform: translate(-45px, 90px) scale(1.1) rotate(540deg); }
                }
                @keyframes sparkle1 {
                    0%, 100% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                @keyframes sparkle2 {
                    0%, 100% { opacity: 0.9; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes sparkle3 {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.4); }
                }
                @keyframes sparkle4 {
                    0%, 100% { opacity: 0.85; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.25); }
                }
            `}</style>
            <Navbar />
            <div
                className="universalPadding w-full flex justify-start items-center"
            >
                <h1
                    className="text-6xl md:text-7xl lg:text-9xl/28 w-3/4 text-black"
                >
                    Attune body, mind and soul to live a life you deserve.
                </h1>
            </div>
        </section>
    )
}
export default Hero