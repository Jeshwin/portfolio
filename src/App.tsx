import {ThemeProvider} from "next-themes";
import {ClientOnly, Head} from "vite-react-ssg";
import Workspace from "@/components/workspace";

/**
 * The whole site is a single page: a react-layman workspace (see
 * <Workspace/>). There is no router - navigation happens by opening pages as
 * tabs. `ThemeProvider` (next-themes) supplies light/dark theming and the
 * workspace is client-only because react-layman needs browser APIs.
 */
export default function App() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Head>
                <title>Jeshwin&apos;s Portfolio</title>
                <meta
                    name="description"
                    content="Jeshwin Prince's portfolio website"
                />
            </Head>
            <ClientOnly fallback={<div className="h-screen w-screen bg-background" />}>
                {() => <Workspace />}
            </ClientOnly>
        </ThemeProvider>
    );
}
