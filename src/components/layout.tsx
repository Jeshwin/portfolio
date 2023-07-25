import Drawer from './drawer'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
    return (
        <>
            <Drawer>
                <Navbar />
                {children}
                <Footer />
            </Drawer>
        </>
    )
}
