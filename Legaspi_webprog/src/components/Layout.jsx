import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer"; // Import the Footer component you just created

const Layout = () => {
    return (
        /* We use 'flex-col' and 'min-h-screen' to make sure that 
           if a page is short, the footer still stays at the bottom.
        */
        <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
            <Navbar />
            
            {/* The 'flex-grow' ensures the main content takes up all available space */}
            <main className="flex-grow pb-16 pt-20">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;