import Spinner from "@/components/spinner";
import MyHead from "@/components/head";

export default function SWRLoading({head, size, fillColor}) {
    return (
        <>
            <MyHead title={head} />
            <div className="h-screen grid justify-center place-content-center">
                <Spinner size={size} fillColor={fillColor} />
            </div>
        </>
    );
}
