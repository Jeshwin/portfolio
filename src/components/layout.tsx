import {Outlet, useLocation} from "react-router-dom";
import Navbar from "./navbar";
// import Footer from "./footer";

export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Navbar />
            {isHomePage ? (
                <Outlet />
            ) : (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                    <Outlet />
                </div>
            )}
            {/* <Footer /> */}
        </>
    );
}
