import Hero from "./hero";
import '../app/globals.css'; 
import BlogPallet from "./blogPallet";
import Footer from "./footer";

export default function Home() {
  return (
    <div
      className="flex flex-col gap-[3rem] lg:gap-[5rem] w-full h-full overflow-x-hidden"
    >
      <Hero />
      <BlogPallet />
      <Footer />
    </div>
  );
}