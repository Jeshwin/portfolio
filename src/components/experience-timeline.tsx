import {useRef, useEffect, useState} from "react";
import {Experience} from "src/lib/types";

export default function ExperienceTimeline({
    experiences,
}: {
    experiences: Experience[];
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [dotPositions, setDotPositions] = useState<number[]>([]);
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        const updatePositions = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const positions = entryRefs.current.map((ref) => {
                if (!ref) return 0;
                const rect = ref.getBoundingClientRect();
                // Position at the center of where the dot would be (top of entry + half dot size)
                return rect.top - containerRect.top + 12; // 12 = half of 24px dot
            });

            setDotPositions(positions);
            setContainerHeight(containerRect.height);
        };

        updatePositions();
        window.addEventListener("resize", updatePositions);
        return () => window.removeEventListener("resize", updatePositions);
    }, [experiences]);

    const firstDotY = dotPositions[0] ?? 12;
    const lastDotY =
        dotPositions[dotPositions.length - 1] ?? containerHeight - 12;
    const lineHeight = lastDotY - firstDotY;

    return (
        <div className="relative" ref={containerRef}>
            {/* SVG for gradient line and dots */}
            {dotPositions.length > 0 && lineHeight > 0 && (
                <svg
                    className="absolute left-0 top-0 w-12 h-full overflow-visible"
                    style={{zIndex: 10}}
                >
                    <defs>
                        <linearGradient
                            id="timeline-gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style={{stopColor: "hsl(var(--primary))"}}
                            />
                            <stop
                                offset="100%"
                                style={{stopColor: "hsl(var(--secondary))"}}
                            />
                        </linearGradient>
                    </defs>

                    {/* Vertical gradient line (using rect for Firefox compatibility) */}
                    <rect
                        x="10"
                        y={firstDotY}
                        width="4"
                        height={lineHeight}
                        rx="2"
                        fill="url(#timeline-gradient)"
                    />

                    {/* Dots at each position */}
                    {dotPositions.map((y, index) => {
                        // Calculate the gradient percentage for this dot
                        const percentage =
                            lineHeight > 0
                                ? ((y - firstDotY) / lineHeight) * 100
                                : 0;

                        return (
                            <circle
                                key={index}
                                cx="12"
                                cy={y}
                                r="12"
                                fill={`hsl(var(--primary))`}
                                style={{
                                    fill: `color-mix(in oklch, hsl(var(--primary)) ${100 - percentage}%, hsl(var(--secondary)) ${percentage}%)`,
                                }}
                            />
                        );
                    })}
                </svg>
            )}

            {/* Timeline entries */}
            <div className="space-y-4">
                {experiences.map((entry, index) => {
                    const y = dotPositions[index] ?? 0;
                    const percentage =
                        lineHeight > 0
                            ? ((y - firstDotY) / lineHeight) * 100
                            : 0;
                    const roleColor = `color-mix(in oklch, hsl(var(--primary-foreground)) ${100 - percentage}%, hsl(var(--secondary-foreground)) ${percentage}%)`;

                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                entryRefs.current[index] = el;
                            }}
                            className="relative flex items-start"
                        >
                            {/* Content */}
                            <div className="ml-12 w-full">
                                <div className="text-sm">{entry.period}</div>

                                <div className="text-xl font-semibold">
                                    {entry.company}
                                </div>

                                <div
                                    className="font-semibold"
                                    style={{color: roleColor}}
                                >
                                    {entry.role}
                                </div>

                            <ul>
                                {entry.description.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex items-start"
                                    >
                                        <span className="mr-3 mt-1.5 text-sm">
                                            •
                                        </span>
                                        <span className="leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
