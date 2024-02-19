import Drawer from "./drawer";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({children}) {
    return (
        <>
            <Drawer>
                <Navbar />
                <div className="min-h-[63%]">{children}</div>
                <Footer />
            </Drawer>
        </>
    );
}
