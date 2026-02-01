"use client";

import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };

    return (
        <Button
            size="icon"
            onClick={toggleTheme}
            className="size-9 rounded-full text-swap-foreground bg-swap hover:bg-swap/80"
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
}
