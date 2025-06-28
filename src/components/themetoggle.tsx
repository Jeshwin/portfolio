"use client";

import {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document
                .querySelector("html")
                ?.setAttribute("data-theme", storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };

    return (
        <Button
            size="icon"
            onClick={toggleTheme}
            className="size-10 rounded-full"
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
}
