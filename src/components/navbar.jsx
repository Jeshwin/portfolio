import Link from "next/link"
import ThemeToggle from "./themetoggle"

export default function Navbar() {
    return (
        <div className="navbar xl:px-48 bg-base-200 sticky z-50 top-0">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Jeshwin Prince</Link>
          </div>
          <div className="flex-none mr-2">
            <ThemeToggle />
          </div>
        </div>
    )
}
