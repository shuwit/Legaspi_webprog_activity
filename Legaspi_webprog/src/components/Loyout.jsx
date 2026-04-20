import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer"; // 1. Import the new Footer

const Layout = () => {
    return (
        // Added flex-col and min-h-screen to push footer to bottom
        <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
            <Navbar />
            
            {/* main grows to fill space, pushing footer down */}
            <main className="flex-grow pb-16 pt-20">
                <Outlet />
            </main>

            <Footer /> {/* 2. Place it at the bottom */}
        </div>
    );
}

export default Layout;