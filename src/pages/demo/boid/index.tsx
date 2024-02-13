import MyHead from "@/components/head";

export default function Boid() {
    return (
        <>
            <MyHead title="Boid Demo" />
            <div id="top" />
            <div className="flex flex-col items-center gap-6 p-auto my-10 h-screen w-2/3 mx-auto">
                <span className="text-5xl font-bold">Boid Simulation</span>
                <iframe
                    className="w-full aspect-video mx-auto"
                    title="Untitled"
                    src="https://codepen.io/jeshwin-the-bold/embed/preview/GRewMjv?default-tab=result"
                    loading="lazy"
                    allowTransparency={true}
                    allowFullScreen={true}
                >
                    See the Pen{" "}
                    <a href="https://codepen.io/jeshwin-the-bold/pen/GRewMjv">
                        Untitled
                    </a>{" "}
                    by Jeshwin Prince (
                    <a href="https://codepen.io/jeshwin-the-bold">
                        @jeshwin-the-bold
                    </a>
                    ) on <a href="https://codepen.io">CodePen</a>.
                </iframe>
            </div>
        </>
    );
}
