import {Outlet} from "react-router-dom";
import {ThemeProvider} from "next-themes";
import {Head} from "vite-react-ssg";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

/**
 * Root layout for every route. Provides theming (next-themes) and the
 * persistent nav/footer chrome.
 *
 * Head management (title / meta) is handled per-page with vite-react-ssg's
 * built-in <Head> component - no provider needed at the root.
 *
 * next-themes is framework-agnostic; we keep `attribute="class"`,
 * `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange`
 * to match the previous behavior exactly.
 */
export default function App() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* Site-wide defaults - per-page <Head> in each route overrides
             * these when duplicate keys are present (title, description, etc.) */}
            <Head>
                <title>Jeshwin&apos;s Portfolio</title>
                <meta
                    name="description"
                    content="Jeshwin Prince's portfolio website"
                />
            </Head>
            <Navbar />
            <Outlet />
            <Footer />
        </ThemeProvider>
    );
}
