"use client";

import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import LiquidGlass from "./liquid-glass";

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };

    return (
        <LiquidGlass color="var(--swap)">
            <Button
                size="icon"
                onClick={toggleTheme}
                className="size-10 rounded-full text-swap-foreground bg-transparent shadow-none hover:bg-swap/80"
            >
                {theme === "light" ? <Sun /> : <Moon />}
            </Button>
        </LiquidGlass>
    );
}
