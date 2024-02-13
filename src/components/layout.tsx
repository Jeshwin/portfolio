import Drawer from './drawer'
import Navbar from './navbar'
import Footer from './footer'
import Cursor from './cursor'

export default function Layout({ children }) {
    return (
        <>
            <Cursor />
            <Drawer>
                <Navbar />
                <div className="min-h-[63%]">
                    {children}
                </div>
                <Footer />
            </Drawer>
        </>
    )
}
