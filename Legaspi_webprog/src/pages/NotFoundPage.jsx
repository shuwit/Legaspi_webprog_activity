import Button from '../components/Button';

const NotFoundPage = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4">
            
            {/* Ambient Background Orbs */}
            <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-red-100/40 blur-[120px] animate-pulse" />
            <div className="pointer-events-none absolute -right-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-orange-100/30 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Glassy 404 Card */}
            <div className="relative z-10 w-full max-w-md rounded-[3rem] border border-white/60 bg-white/40 p-12 text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
                <div className="mb-6 inline-flex rounded-full bg-red-50 px-4 py-1.5 border border-red-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Error 404</p>
                </div>
                
                <h1 className="text-6xl font-black tracking-tighter text-zinc-900">
                    Lost?
                </h1>
                <p className="mt-4 text-base leading-relaxed text-zinc-500">
                    The page you're looking for has been moved or doesn't exist in our current build.
                </p>

                <div className="mt-10 flex flex-col gap-3">
                    <Button to="/" variant="primary" className="w-full py-4">
                        Return Home
                    </Button>
                    <Button to="/articles" className="w-full py-4 bg-white/50 border-white">
                        Browse Articles
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;