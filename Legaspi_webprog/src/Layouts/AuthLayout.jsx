import { Outlet, Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const AuthLayout = () => {
    return (
        <section className="relative min-h-screen bg-zinc-100 text-zinc-900">
            {/* Back to Home Button - Placed at the top level so it's always visible in top-left */}
            <div className="absolute top-6 left-6 z-50 sm:top-8 sm:left-8">
                <Link
                    to="/"
                    className="group flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-2xl"
                >
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                    Back to Home
                </Link>
            </div>

            <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
                {/* Left Side Visual (Kept the wireframe, but added an ambient glow) */}
                <div className="relative flex items-center justify-center border-b-2 border-zinc-300 bg-zinc-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16 overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-50">
                        <div className="h-[40rem] w-[40rem] rounded-full bg-zinc-300 blur-[120px]" />
                    </div>

                    <div className="relative z-10 flex w-full max-w-md items-center justify-center rounded-[2rem] border-2 border-zinc-300 bg-white/60 backdrop-blur-md p-8 sm:p-10 transition-transform duration-700 hover:scale-105 shadow-2xl">
                        <img 
                            src={Logo} 
                            alt="Logo" 
                            className="w-full max-w-[16rem] object-contain drop-shadow-xl transition-transform duration-700 hover:scale-110" 
                        />
                    </div>
                </div>

                {/* Right Side Form Container (Added iOS Aurora background) */}
                <main className="relative flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16 overflow-hidden">
                    {/* Ambient Background Waves */}
                    <div className="pointer-events-none absolute -top-[10%] left-[10%] h-[600px] w-[600px] rounded-full bg-blue-300/30 blur-[120px] animate-pulse" />
                    <div className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-300/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

                    <div className="relative z-10 mx-auto w-full max-w-md">
                        <Outlet />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;
