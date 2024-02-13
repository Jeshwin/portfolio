import Link from "next/link";
import {
    AcademicCapIcon,
    BriefcaseIcon,
    AdjustmentsHorizontalIcon,
    PencilSquareIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {motion} from "framer-motion";

export default function IntroHero({reverse, title, description, href}) {
    const reverseClass = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

    let textColorClass;
    let gradientButtonClass;
    let sideHeroIcon;

    const sideHeroIconClass = `aspect-square lg:mx-10 w-40 lg:w-80`;
    if (title === "Resume") {
        textColorClass =
            "mb-5 bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary text-xl md:text-3xl lg:text-5xl font-bold";
        gradientButtonClass =
            "btn btn-primary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus";
        sideHeroIcon = (
            <AcademicCapIcon className={`${sideHeroIconClass} fill-primary`} />
        );
    } else if (title === "Portfolio") {
        textColorClass =
            "mb-5 bg-clip-text text-transparent bg-gradient-to-br from-secondary to-accent text-xl md:text-3xl lg:text-5xl font-bold";
        gradientButtonClass =
            "btn btn-secondary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-secondary to-accent hover:from-secondary-focus hover:to-accent-focus";
        sideHeroIcon = (
            <BriefcaseIcon className={`${sideHeroIconClass} fill-secondary`} />
        );
    } else if (title === "Demos") {
        textColorClass =
            "mb-5 bg-clip-text text-transparent bg-gradient-to-br from-accent to-primary text-xl md:text-3xl lg:text-5xl font-bold";
        gradientButtonClass =
            "btn btn-accent lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-accent to-primary hover:from-accent-focus hover:to-primary-focus";
        sideHeroIcon = (
            <AdjustmentsHorizontalIcon
                className={`${sideHeroIconClass} fill-accent`}
            />
        );
    } else if (title === "Blog") {
        textColorClass =
            "mb-5 bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary text-xl md:text-3xl lg:text-5xl font-bold";
        gradientButtonClass =
            "btn btn-primary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus";
        sideHeroIcon = (
            <PencilSquareIcon className={`${sideHeroIconClass} fill-primary`} />
        );
    } else {
        textColorClass =
            "mb-5 text-base-content text-xl md:text-3xl lg:text-5xl font-bold";
        gradientButtonClass = "btn btn-primary lg:btn-lg lg:text-xl";
        sideHeroIcon = (
            <ExclamationCircleIcon
                className={`${sideHeroIconClass} fill-neutral`}
            />
        );
    }
    return (
        <>
            <div className="flex my-20 lg:my-32 flex-col lg:flex-row justify-items-center">
                <div className="hero bg-base-100">
                    <div
                        className={`hero-content gap-6 max-x-5xl w-auto mx-10 p-0 lg:p-1 px-auto flex-col-reverse ${reverseClass}`}
                    >
                        <div className="mx-auto max-w-xs md:max-w-xl lg:max-w-2xl text-center text-base-content">
                            <h1 className={textColorClass}>{title}</h1>
                            <p className="mb-5 md:lext-lg lg:text-2xl">
                                {description}
                            </p>
                            <Link href={href} className={gradientButtonClass}>
                                {title}
                            </Link>
                        </div>
                        <motion.div
                            initial={{opacity: 0, scale: 0.25}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{type: "spring"}}
                            drag
                            dragConstraints={{
                                top: -100,
                                left: -100,
                                right: 100,
                                bottom: 100,
                            }}
                        >
                            {sideHeroIcon}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
