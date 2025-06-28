import {Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import Drawer from "@/components/drawer";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata = {
    title: "CodeNest",
    description: "A fully-featured, web-based coding environment",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${jetbrains_mono.variable}`}
        >
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <Drawer>
                <Navbar />
                <body className="min-h-[63%]">{children}</body>
                <Footer />
            </Drawer>
        </html>
    );
}
