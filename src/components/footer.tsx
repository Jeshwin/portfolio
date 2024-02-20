import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import {LockClosedIcon, LockOpenIcon, RssIcon} from "@heroicons/react/24/solid";
import {useState, useEffect} from "react";
import axios from "axios";

export default function Footer() {
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        async function validateToken(token) {
            try {
                const response = await axios.post("/api/validateJWT", {token});
                setValidToken(response.data.isValid);
            } catch (error) {
                // console.error('JWT validation failed: ', error)
                setValidToken(false);
            }
        }
        validateToken(token);
    });

    const d = new Date();
    const currentYear = d.getFullYear();

    return (
        <footer className="footer footer-center p-10 pb-24 bg-base-200 text-base-content">
            <div>
                <div className="relative w-36 aspect-square">
                    <Image fill src={Logo} alt="Astronaut Logo" />
                </div>
                <p className="font-bold">Jeshwin Prince</p>
                <p>Copyright © {currentYear} - All right reserved</p>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a
                        href="https://github.com/Jeshwin"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className="fill-current w-6"
                        >
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://www.youtube.com/@math-a-magic9820"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="fill-current w-6"
                        >
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jeshwinprince/"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="fill-current w-6"
                        >
                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                        </svg>
                    </a>
                    <Link
                        href="/rss"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <RssIcon className="aspect-square w-6" />
                    </Link>
                    {!validToken ? (
                        <Link
                            href="/login"
                            className="btn btn-square btn-ghost rounded-full shadow"
                        >
                            <LockClosedIcon className="aspect-square w-6" />
                        </Link>
                    ) : (
                        <Link
                            href="/logout"
                            className="btn btn-square btn-ghost rounded-full shadow"
                        >
                            <LockOpenIcon className="aspect-square w-6" />
                        </Link>
                    )}
                </div>
            </div>
        </footer>
    );
}
