import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Files, Moon, Sun} from "lucide-react";
import {cn} from "@/lib/utils";

interface ActivityBarButtonProps {
    label: string;
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

function ActivityBarButton({
    label,
    active,
    onClick,
    children,
}: ActivityBarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={cn(
                "relative flex size-12 items-center justify-center transition-colors",
                active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            {/* VS Code-style active accent on the left edge */}
            <span
                className={cn(
                    "absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-primary transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                )}
            />
            {children}
        </button>
    );
}

interface ActivityBarProps {
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
}

/**
 * Minimal, VS Code-inspired activity bar pinned to the far left. Holds the
 * controls that used to be floating buttons: toggling the sidebar (top) and
 * the theme (bottom).
 */
export default function ActivityBar({
    sidebarOpen,
    onToggleSidebar,
}: ActivityBarProps) {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="z-50 flex h-full w-12 shrink-0 flex-col items-center justify-between border-r border-border bg-mantle">
            <div className="flex flex-col">
                <ActivityBarButton
                    label="Toggle sidebar"
                    active={sidebarOpen}
                    onClick={onToggleSidebar}
                >
                    <Files className="size-6" />
                </ActivityBarButton>
            </div>

            <div className="flex flex-col">
                <ActivityBarButton
                    label="Toggle theme"
                    onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                >
                    {mounted ? (
                        theme === "light" ? (
                            <Sun className="size-6" />
                        ) : (
                            <Moon className="size-6" />
                        )
                    ) : (
                        <span className="size-6" />
                    )}
                </ActivityBarButton>
            </div>
        </nav>
    );
}
