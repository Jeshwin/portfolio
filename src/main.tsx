import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {ThemeProvider} from "next-themes";
import {router} from "./router";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <RouterProvider router={router} />
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
