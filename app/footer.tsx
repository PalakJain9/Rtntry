import Link from "next/link";

export default function Footer () {
  return (
    <div
      className={`flex flex-col lg:flex-row justify-between items-center gap-[1rem] w-full footerYPadding universalPadding text-black overflow-x-hidden roseGoldBg`
    }
    >
        <div
          className="flex flex-col justify-start items-start gap-[0.5rem] text-lg lg:text-xl w-full lg:w-3/5"
        >
          <h1
            className="text-4xl md:text-[6xl] lg:text-8xl"
          >
            ratnatray.
          </h1>
          <p>Your one-stop for curated blogs and tips that aim to nourish your three ratan(s) - mind, body and soul to unlock your true potential and live your dream life.</p>
          <p className="text-sm">© 2025</p>
        </div>
        

        <div
          className="w-full lg:w-2/5 flex flex-col justify-start items-start lg:items-end gap-[1rem]"
        >
          <Link
            href="https://pinterest.com/theratnatraystore/"
            className="linkHoverUnderline"
          > 
            <p>PINTEREST</p>
          </Link>

          <Link
            href="/#blog"
            className="linkHoverUnderline"
          > 
            <p>BLOGS</p>
          </Link>

          <Link
            href="/about"
            className="linkHoverUnderline"
          > 
            <p>ABOUT US</p>
          </Link>
        </div>
    </div>
  )
}