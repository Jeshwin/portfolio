import MyHead from "@/components/head";
import init from "my_sudoku";
import {useEffect} from "react";

export default function SudokuDemo() {
    useEffect(() => {
        async function createDemo() {
            const wasm = await init();
            wasm.start();
        }
        createDemo();
    }, []);

    return (
        <>
            <MyHead title="Sudoku Demo" />
            <div className="flex flex-col items-center gap-6 p-auto">
                <div className="flex flex-col items-center gap-6 my-10">
                    <span className="text-5xl font-bold">Sudoku</span>
                    <canvas
                        id="bevy"
                        className="rounded-xl"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </div>
        </>
    );
}
