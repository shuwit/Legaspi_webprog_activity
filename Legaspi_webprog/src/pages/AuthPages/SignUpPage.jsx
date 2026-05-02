import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-sm text-zinc-900 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white/80 focus:ring-4 focus:ring-zinc-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:bg-white/60';

const primaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 bg-zinc-900 text-white';

const secondaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold border border-white/80 bg-white/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] active:scale-95 text-zinc-900';

const SignUpPage = () => {
    return (
        <div className="animate-fade-in-up relative rounded-[2rem] border border-white/60 bg-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-12">
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Join us today to discover a beautiful modern interface. Let's get your account set up.
                </p>
            </div>

            <form className="mt-8 space-y-6">
                <div className="animate-fade-in-up grid gap-5 sm:grid-cols-2" style={{ animationDelay: '0.2s' }}>
                    <div>
                        <label htmlFor="first-name" className="text-sm font-semibold text-zinc-700 ml-1">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            placeholder="John"
                            autoComplete="given-name"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-sm font-semibold text-zinc-700 ml-1">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Doe"
                            autoComplete="family-name"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-700 ml-1">
                        Email Address
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={inputClasses}
                    />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-700 ml-1">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputClasses}
                    />
                    <p className="mt-2 ml-1 text-xs leading-5 text-zinc-500">
                        Use a secure password with letters, numbers, and symbols.
                    </p>
                </div>

                <div className="animate-fade-in-up pt-2" style={{ animationDelay: '0.5s' }}>
                    <Button type="submit" variant="primary" className={primaryButtonClassName}>
                        Create Account
                    </Button>
                </div>

                <div className="animate-fade-in-up grid gap-3 pt-2 sm:grid-cols-2" style={{ animationDelay: '0.6s' }}>
                    <Button type="button" variant="secondary" className={secondaryButtonClassName}>
                        Sign Up with Google
                    </Button>
                    <Button type="button" variant="secondary" className={secondaryButtonClassName}>
                        Sign Up with Apple
                    </Button>
                </div>
            </form>

            <div className="animate-fade-in-up mt-8 border-t border-zinc-200/50 pt-6 text-sm text-zinc-600 text-center" style={{ animationDelay: '0.7s' }}>
                Already have an account?{' '}
                <Link to="/auth/signin" className="font-bold text-zinc-900 transition-all hover:text-zinc-700 hover:underline">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
