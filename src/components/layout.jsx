import Drawer from './drawer'
import Navbar from './navbar'
import Footer from './footer'
import CustomCursor from './customcursor'

export default function Layout({ children }) {
    return (
        <>
            <CustomCursor />
            <Drawer>
                <Navbar />
                {children}
                <Footer />
            </Drawer>
        </>
    )
}
