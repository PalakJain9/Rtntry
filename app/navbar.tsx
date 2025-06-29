import Link from "next/link";
import Dropdown from '../components/Dropdown'

export default function Navbar () {
  return (
    <div
      className={`absolute top-0 flex flex-row justify-between items-center w-full navbarYPadding universalPadding text-black overflow-hidden`
    }
    >
        <Link 
          href="/"
          className="linkHoverUnderline"
        > 
          <p>RATNATRAY</p>
        </Link>

        <div
          className="hidden lg:flex lg:flex-row justify-start items-center gap-[1rem] md:gap-[1.5rem]"
        >
           <Link
              href="/#blog"
              className="linkHoverUnderline"
              > 
              <p>BLOGS</p>
          </Link>

           <Link
              href="#pinterest"
              className="linkHoverUnderline"
              > 
              <p>PINTEREST</p>
          </Link>

          <Link
              href="/about"
              className="linkHoverUnderline"
              > 
              <p>ABOUT US</p>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <Dropdown />
        </div>
    </div>
  )
}