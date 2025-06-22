import Link from "next/link";

export default function Navbar () {
  return (
    <div
      className={`fixed top-0 flex flex-row justify-between items-center w-full h-[5rem] md:h-[6rem] lg:h-[8rem] universalPadding text-black overflow-hidden`
    }
    >
        <Link href="/"> 
          <p>RATNATRAY</p>
        </Link>

        <div
          className="flex flex-row justify-start items-center gap-[1rem] md:gap-[1.5rem]"
        >
           <Link
              href="#pinterest"
              className="hover:underline underline-offset-4"
              > 
              <p>PINTEREST</p>
          </Link>

          <Link
              href="#about"
              className="hover:underline underline-offset-4"
              > 
              <p>ABOUT US</p>
          </Link>
        </div>
    </div>
  )
}