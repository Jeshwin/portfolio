import {Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {ThemeProvider} from "next-themes";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata = {
    title: "Jeshwin's Portfolio",
    description: "Jeshwin Prince's portfolio website",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html
            suppressHydrationWarning
            lang="en"
            className={`${inter.variable} ${jetbrains_mono.variable}`}
        >
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
