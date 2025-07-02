"use client";

import Link from "next/link";
import {useState, useRef, useEffect} from "react";
import ThemeToggle from "./theme-toggle";
import {usePathname} from "next/navigation";

interface NavItem {
    id: string;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    {id: "home", label: "Home", href: "/"},
    {id: "blog", label: "Blog", href: "/blog"},
    {id: "projects", label: "Projects", href: "/projects"},
    {id: "about", label: "About", href: "/about"},
    {id: "contact", label: "Contact", href: "/contact"},
];

interface HighlightProps {
    left: number;
    width: number;
}

export default function Navbar() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<string>(
        navItems.find((item) => item.href === pathname)?.id || "home"
    );
    const [highlight, setHighlight] = useState<HighlightProps>({
        left: 0,
        width: 0,
    });
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

    const updateHighlight = (tabId: string) => {
        const element = itemRefs.current[tabId];
        if (element && navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            setHighlight({
                left: elementRect.left - navRect.left,
                width: elementRect.width,
            });
        }
    };

    useEffect(() => {
        updateHighlight(activeTab);
    }, [activeTab]);

    useEffect(() => {
        const parentPath = `/${pathname.split("/")[1]}`;
        updateHighlight(
            navItems.find((item) => item.href === parentPath)?.id || "home"
        );
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => updateHighlight(activeTab);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeTab]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        updateHighlight(tabId);
    };

    return (
        <div className="fixed top-0 w-screen h-16 px-6 z-10 flex justify-center items-center">
            <nav
                ref={navRef}
                className="h-9 relative flex items-center bg-muted rounded-full p-0.5 shadow-sm"
            >
                <div
                    className="absolute top-0.5 bottom-0.5 bg-popover rounded-full shadow-sm transition-all duration-300 ease-out"
                    style={{
                        left: `${highlight.left}px`,
                        width: `${highlight.width}px`,
                        transform: activeTab ? "scaleX(1)" : "scaleX(0.8)",
                    }}
                />

                {navItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                        <button
                            ref={(el) => (itemRefs.current[item.id] = el)}
                            onClick={() => handleTabClick(item.id)}
                            className={`
              relative z-10 px-3 py-0.5 font-medium rounded-full transition-colors duration-200
              ${
                  activeTab === item.id
                      ? "text-popover-foreground"
                      : "text-muted-foreground hover:text-popover-foreground"
              }
            `}
                        >
                            {item.label}
                        </button>
                    </Link>
                ))}
            </nav>
            <div className="flex items-center absolute right-6 top-0 bottom-0">
                <ThemeToggle />
            </div>
        </div>
    );
}
