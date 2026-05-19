import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-sm text-zinc-900 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white/80 focus:ring-4 focus:ring-zinc-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:bg-white/60';

const primaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 bg-zinc-900 text-white';

const secondaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold border border-white/80 bg-white/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] active:scale-95 text-zinc-900';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call the login API
            const { data } = await loginUser({ email, password });
            console.log('Login successful:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('type', data.type); // user this for dynamic rendering

            // Navigate to the dashboard with the user's email and type
            navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
        } catch (err) {
            console.error('Login failed:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="animate-fade-in-up relative rounded-[2rem] border border-white/60 bg-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-12">
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Log In</h1>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Welcome back. Access your account to manage your portfolio and resume settings.
                </p>
                {successMessage && <p className="mt-3 text-sm font-semibold text-green-600">{successMessage}</p>}
                {error && <p className="mt-3 text-sm font-semibold text-red-500">{error}</p>}
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <label htmlFor="signin-email" className="text-sm font-semibold text-zinc-700 ml-1">
                        Email Address
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={inputClasses}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <label htmlFor="signin-password" className="text-sm font-semibold text-zinc-700 ml-1">
                        Password
                    </label>
                    <input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="mt-2 ml-1 text-xs leading-5 text-zinc-500">
                        Must be at least 8 characters.
                    </p>
                </div>

                <div className="animate-fade-in-up flex items-center justify-between gap-4 text-sm" style={{ animationDelay: '0.4s' }}>
                    <label className="flex items-center gap-2 text-zinc-600 cursor-pointer group">
                        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 transition-transform group-hover:scale-110" />
                        <span className="group-hover:text-zinc-900 transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="font-semibold text-zinc-700 transition hover:text-zinc-900 hover:underline">
                        Forgot Password?
                    </button>
                </div>

                <div className="animate-fade-in-up pt-2" style={{ animationDelay: '0.5s' }}>
                    <Button type="submit" variant="primary" className={primaryButtonClassName}>
                        Log In
                    </Button>
                </div>

                <div className="animate-fade-in-up grid gap-3 pt-2 sm:grid-cols-2" style={{ animationDelay: '0.6s' }}>
                    <Button type="button" variant="secondary" className={secondaryButtonClassName}>
                        Log In with Google
                    </Button>
                    <Button type="button" variant="secondary" className={secondaryButtonClassName}>
                        Log In with Apple
                    </Button>
                </div>
            </form>

            <div className="animate-fade-in-up mt-8 border-t border-zinc-200/50 pt-6 text-sm text-zinc-600 text-center" style={{ animationDelay: '0.7s' }}>
                No account yet?{' '}
                <Link to="/auth/signup" className="font-bold text-zinc-900 transition-all hover:text-zinc-700 hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;
