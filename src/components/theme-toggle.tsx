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
            className="size-10 rounded-full bg-swap text-swap-foreground hover:bg-swap/80"
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
}
