import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["var(--font-inter)", "Helvetica", "Open Sans", "sans-serif"],
            mono: ["var(--font-jetbrains-mono)"],
        },
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "rgb(var(--background))",
                foreground: "rgb(var(--foreground))",
                card: {
                    DEFAULT: "rgb(var(--card))",
                    foreground: "rgb(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "rgb(var(--popover))",
                    foreground: "rgb(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "rgb(var(--primary))",
                    foreground: "rgb(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "rgb(var(--secondary))",
                    foreground: "rgb(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "rgb(var(--muted))",
                    foreground: "rgb(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "rgb(var(--accent))",
                    foreground: "rgb(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "rgb(var(--destructive))",
                    foreground: "rgb(var(--destructive-foreground))",
                },
                mantle: {
                    DEFAULT: "var(--mantle)",
                    foreground: "var(--mantle-foreground)",
                },
                swap: {
                    DEFAULT: "var(--swap)",
                    foreground: "var(--swap-foreground)",
                },
                border: "rgb(var(--border))",
                input: "rgb(var(--input))",
                ring: "rgb(var(--ring))",
            },
            typography: () => ({
                primary: {
                    css: {
                        "--tw-prose-links": "rgb(var(--primary-foreground))",
                        "--tw-prose-invert-links":
                            "rgb(var(--primary-foreground))",
                    },
                },
            }),
        },
    },
    plugins: [typography, tailwindcssAnimate],
};
