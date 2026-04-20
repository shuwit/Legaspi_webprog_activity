import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo.png'; // <-- Wires up your specific logo file

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/article' },
];

// Modern iOS-style active link states
const navLinkClassName = ({ isActive }) => [
    'rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out',
    isActive 
    ? 'bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-zinc-900 border border-white' 
    : 'border border-transparent text-zinc-500 hover:bg-white/40 hover:text-zinc-900',
].join(' ');

const Navbar = () => {
    return (
        // The Apple-style frosted glass wrapper
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/50 backdrop-blur-xl saturate-150 max-w-[1440px] mx-auto shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                
                {/* Logo Section */}
                <NavLink to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    
                    {/* Your dynamically imported Logo */}
                    <img src={Logo} alt="Logo" className="h-10 w-10 object-contain drop-shadow-sm" />
                </NavLink>

                {/* Navigation Links */}
                <nav className="hidden items-center gap-1 sm:flex rounded-full border border-white/40 bg-white/30 p-1 shadow-inner">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={navLinkClassName}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;