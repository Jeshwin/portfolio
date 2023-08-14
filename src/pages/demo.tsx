import MyHead from "@/components/head"
import init from "bevy_wasm_pack"
// import * as wasm from "bevy_wasm_pack"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        async function createDemo() {
            const wasm = await init()
            wasm.start()
        }
        createDemo()
        // wasm.start()
    }, [])

    return (
        <>
            <MyHead title="Demo" />
            <div id="top" />
            <div className="flex flex-col items-center gap-6 p-auto">
                <div className="flex flex-col items-center gap-6 my-10">
                    <span className="text-5xl font-bold">Bevy on the Web!</span>
                    <canvas
                        id="bevy"
                        className="rounded-xl"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </div>
        </>
    )
}
