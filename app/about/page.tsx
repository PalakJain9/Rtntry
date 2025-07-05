import Navbar from "../navbar" 

const About = () => {
    return (
        <div
            className="greyMesh flex flex-col justify-center items-start w-[100vw] min-h-screen overflow-x-hidden lg:overflow-y-hidden gap-[3rem]"
        >
            <Navbar />
            <div
                className="positionFromtopAbout w-full h-full universalPadding flex flex-col justify-center items-start gap-[2rem]"
            >
                <h1
                    className="text-4xl md:text-6xl lg:text-9xl w-full lg:w-1/2 text-black"
                >
                    About us
                </h1>
                <div className="text-md md:text-lg lg:text-xl w-full lg:w-3/4">
                    Derived from Sanskrit, &quot;Ratna&quot; means jewel, and &quot;Traya&quot; means three — together forming Ratnatray, the Three Jewels.<br /><br />
                    
                    In its ancient origin, Ratnatray reflects the spiritual triad of:
                    Right Vision, Right Knowledge, and Right Conduct<br /><br />

                    But beyond the scriptures, each of us carries a Ratnatray within:
                    our mind, our body, and our soul —
                    three living jewels that shape the rhythm of our days and the direction of our destiny.<br />

                    When we fuel them,
                    we begin to unlock something beautiful — a life that feels true, light, and uniquely ours.
                    It is in these simple moments of care and connection that we move closer to the life we dream of — one rooted in purpose, peace, and genuine joy. <br />And that&apos;s excatly our aim; to bring to you highly curated blogs and tips to help you achieve the same.
                </div>
            </div>
        </div>
    )
}
export default About