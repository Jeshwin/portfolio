import MyHead from "@/components/head";

export default function Bokeh() {
    return (
        <>
            <MyHead title="Bokeh Demo" />
            <div className="flex flex-col items-center gap-6 p-auto my-10 h-screen w-2/3 mx-auto">
                <span className="text-5xl font-bold">Bokeh Effect</span>
                <iframe
                    className="w-full aspect-video mx-auto"
                    title="CodeNest Style Animation"
                    src="https://codepen.io/jeshwin-the-bold/embed/preview/ExMOvZd?default-tab=result"
                    loading="lazy"
                    allowTransparency={true}
                    allowFullScreen={true}
                >
                    See the Pen{" "}
                    <a href="https://codepen.io/jeshwin-the-bold/pen/ExMOvZd">
                        CodeNest Style Animation
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
