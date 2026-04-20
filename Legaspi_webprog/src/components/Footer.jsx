import Logo from '../assets/Logo.png';

const socials = [
  { name: 'GitHub', url: 'https://www.instagram.com/shuw1tzz/' }, // Update to your actual GitHub later!
  { name: 'Instagram', url: 'https://www.instagram.com/shuw1tzz/' },
  { name: 'Facebook', url: 'https://www.facebook.com/seanmartin.gallamos/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@shuwits' },
];

const Footer = () => {
    return (
        <footer className="w-full border-t border-white/40 bg-white/30 backdrop-blur-xl saturate-150">
            <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    
                    {/* Branding */}
                    <div className="flex items-center gap-4">
                        <img src={Logo} alt="Logo" className="h-7 w-auto grayscale opacity-60" />
                        <div className="h-4 w-px bg-zinc-300"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            Sean Martin Legaspi
                        </p>
                    </div>

                    {/* Social Links as a Dock */}
                    <nav className="flex gap-1 rounded-2xl border border-white/40 bg-white/20 p-1 shadow-inner backdrop-blur-md">
                        {socials.map((social) => (
                            <a 
                                key={social.name} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="rounded-xl px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 transition-all hover:bg-white/90 hover:text-zinc-900 hover:shadow-sm"
                            >
                                {social.name}
                            </a>
                        ))}
                    </nav>

                    {/* Footer Info */}
                    <div className="text-center md:text-right">
                        <p className="text-[9px] font-medium text-zinc-400">
                            Built with React & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;