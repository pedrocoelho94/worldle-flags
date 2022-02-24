import Link from 'next/link'
import { IoIosStats } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'

const Header = () => {
  return (
    <>
      <header className="mx-auto flex h-12 max-w-5xl items-center justify-between px-2 text-white sm:px-10">
        <Link href="/">
          <a
            title="Home"
            className="cursor-pointer rounded-sm border-2 text-center text-[1.5rem] opacity-70
             transition-all hover:opacity-100"
          >
            <AiFillHome className="h-4 w-4 2xs:h-5 2xs:w-5" />
          </a>
        </Link>

        <Link href="/">
          <a>
            <h1 className="text-[1rem] font-bold 2xs:text-[1.25rem] sm:text-[1.725rem] sm:tracking-wider text-center">
              WORLDLE <span className="text-cyan-500">FLAGS</span>
            </h1>
          </a>
        </Link>

        <Link href="/stats">
          <a
            title="Stats"
            className="cursor-pointer rounded-sm border-2 text-center text-[1.5rem] opacity-70
             transition-all hover:opacity-100"
          >
            <IoIosStats className="h-4 w-4 2xs:h-5 2xs:w-5" />
          </a>
        </Link>
      </header>

      <hr />
    </>
  )
}

export default Header
