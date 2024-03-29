import Link from "next/link";

export default function Drawer({children}) {
    return (
        <>
            <div className="drawer h-full">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">{children}</div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay p-auto"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <div className="btn btn-ghost btn-circle">
                            <label htmlFor="my-drawer">
                                <svg
                                    className="fill-base-content w-8 h-8"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/posts/16">Resume</Link>
                        </li>
                        <li>
                            <Link href="/projects">Portfolio</Link>
                        </li>
                        <li>
                            <Link href="/posts">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
