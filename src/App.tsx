import {ThemeProvider} from "next-themes";
import {Outlet} from "react-router-dom";

/**
 * Root layout for every route. Each child route renders a <RouteShell/>, which
 * decides between the pre-rendered static document and the interactive
 * react-layman workspace - see src/components/route-shell.tsx.
 *
 * `ThemeProvider` (next-themes) supplies light/dark theming and must wrap both
 * presentations so the static document paints in the right theme.
 */
export default function App() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Outlet />
        </ThemeProvider>
    );
}
