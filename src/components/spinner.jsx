export default function Spinner({size, fillColor}) {
    return (
        <svg
            width={`${size}`}
            height={`${size}`}
            className={fillColor}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                className="loading-block block-offset-0"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
            <rect
                className="loading-block block-offset-1"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
            <rect
                className="loading-block block-offset-2"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
        </svg>
    );
}
