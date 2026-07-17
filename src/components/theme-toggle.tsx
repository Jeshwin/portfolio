import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

/**
 * Theme toggle that safely handles SSG hydration.
 * next-themes returns undefined for `theme` until it mounts, so we track
 * mount state to avoid hydration mismatches on the sun/moon icon.
 */
export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            size="icon"
            onClick={toggleTheme}
            className="size-10 rounded-full text-swap-foreground bg-swap hover:bg-swap/80"
            aria-label="Toggle theme"
        >
            {mounted ? theme === "light" ? <Sun /> : <Moon /> : null}
        </Button>
    );
}
