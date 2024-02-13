import MyHead from "@/components/head"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../../public/demo/sudoku.png"

export default function AllDemos() {
    return (
        <>
            <MyHead title="Blog" />
            <div id="top" />
            <div className="p-5 mx-auto lg:w-3/4">
                <div className="font-bold text-5xl mb-12">Blog</div>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
                    <li className="card bg-base-200 shadow-xl hover:opacity-70 active:scale-90 duration-75">
                        <Link href="/demo/sudoku#top">
                            <figure>
                                <Image
                                    src={Logo}
                                    width={1024}
                                    height={1024}
                                    alt="Sudoku"
                                    className="w-full aspect-auto rounded-t-2xl"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="card-title truncate text-3xl mb-3">
                                    Sudoku
                                </div>
                                <div>Created: August 21, 2023</div>
                                <div>Last Updated: August 21, 2023</div>
                                <div className="text-lg mb-3">
                                    A simple Sudoku game made in Rust, compiled
                                    to WebAssembly to run on the browser
                                </div>
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-primary p-4">
                                        game
                                    </li>
                                    <li className="badge badge-lg badge-primary p-4">
                                        rust
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
