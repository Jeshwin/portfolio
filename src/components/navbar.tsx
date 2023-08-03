import Link from "next/link"
import Image from 'next/image'
import ThemeToggle from "./themetoggle"
import Logo from '../../public/logo.png'

export default function Navbar() {
    return (
        <nav className="navbar lg:px-2 bg-base-200 sticky z-50 top-0">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="inline-block stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/#top" className="btn btn-ghost normal-case text-xl">
              <div className="relative w-10 aspect-square">
                <Image fill src={Logo} alt="Astronaut Logo" />
              </div>
              <span className="ml-3 h-6 hidden md:inline-block md:text-base-content">Jeshwin Prince</span>
            </Link>
          </div>
          <div className='flex-2'>
            <a href="https://www.youtube.com/@math-a-magic9820" className="btn btn-ghost btn-circle fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
            </a>
          </div>
          <div className='flex-2'>
            <a href="https://github.com/Jeshwin/portfolio" className="btn btn-ghost btn-circle fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
            </a>
          </div>
          <div className="flex-2 mr-2 lg:mr-0">
            <ThemeToggle />
          </div>
        </nav>
    )
}
