import {Experience} from "src/lib/types";

export default function ExperienceTimeline({
    experiences,
}: {
    experiences: Experience[];
}) {
    return (
        <div className="relative">
            {/* Timeline entries */}
            <div className="space-y-4">
                {experiences.map((entry, index) => (
                    <div key={index} className="relative flex items-start">
                        {/* Blue dot */}
                        <div className="absolute left-0 w-6 h-6 bg-sky-500 rounded-full z-10"></div>

                        {/* Vertical line segment (only if not the last item) */}
                        {index < experiences.length - 1 && (
                            <div className="absolute left-2.5 top-0 -bottom-4 w-1 bg-sky-500"></div>
                        )}

                        {/* Content */}
                        <div className="ml-12 w-full">
                            <div className="text-sm">{entry.period}</div>

                            <div className="text-xl font-semibold">
                                {entry.company}
                            </div>

                            <div className="text-sky-600 font-semibold">
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
                ))}
            </div>
        </div>
    );
}
