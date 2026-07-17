import "@fontsource/inter/latin.css";
import "@fontsource/jetbrains-mono/latin.css";
import "@/styles/globals.css";
import {ViteReactSSG} from "vite-react-ssg";
import {routes} from "@/routes";

export const createRoot = ViteReactSSG({
    routes,
    basename: "/",
});
