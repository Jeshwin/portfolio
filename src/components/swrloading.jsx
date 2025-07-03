import Spinner from "@/components/spinner";

export default function SWRLoading({size, fillColor}) {
    return (
        <div className="h-screen grid justify-center place-content-center">
            <Spinner size={size} fillColor={fillColor} />
        </div>
    );
}
