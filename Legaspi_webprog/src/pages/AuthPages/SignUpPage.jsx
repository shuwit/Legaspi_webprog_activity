import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
    'mt-2 w-full rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-sm text-zinc-900 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white/80 focus:ring-4 focus:ring-zinc-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:bg-white/60';

const primaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 bg-zinc-900 text-white';

const secondaryButtonClassName = 'w-full rounded-2xl py-4 text-[11px] tracking-[0.2em] font-bold border border-white/80 bg-white/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] active:scale-95 text-zinc-900';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        age: '',
        gender: 'male',
        contactNumber: '',
        address: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Include default type and isActive since it's a new signup
            // Default to 'editor' based on the User.js model schema default, but you can change to viewer if preferred
            await createUser({ ...form, type: 'editor', isActive: true });
            
            // Redirect to login page on success
            navigate('/auth/signin', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up relative rounded-[2rem] border border-white/60 bg-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-12">
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Join us today to discover a beautiful modern interface. Let's get your account set up.
                </p>
            </div>

            {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="animate-fade-in-up grid gap-5 sm:grid-cols-2" style={{ animationDelay: '0.2s' }}>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">First Name</label>
                        <input
                            required
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            type="text"
                            placeholder="John"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Last Name</label>
                        <input
                            required
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Doe"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="animate-fade-in-up grid gap-5 sm:grid-cols-2" style={{ animationDelay: '0.3s' }}>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Username</label>
                        <input
                            required
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="johndoe123"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Email Address</label>
                        <input
                            required
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@example.com"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="animate-fade-in-up grid gap-5 sm:grid-cols-2" style={{ animationDelay: '0.4s' }}>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Age</label>
                        <input
                            required
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            type="number"
                            placeholder="25"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-zinc-700 ml-1">Gender</label>
                        <select
                            required
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className={inputClasses}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Contact Number</label>
                    <input
                        required
                        name="contactNumber"
                        value={form.contactNumber}
                        onChange={handleChange}
                        type="tel"
                        placeholder="+63 912 345 6789"
                        className={inputClasses}
                    />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Address</label>
                    <input
                        required
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="123 Street Name, City, Country"
                        className={inputClasses}
                    />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <label className="text-sm font-semibold text-zinc-700 ml-1">Password</label>
                    <input
                        required
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="••••••••"
                        className={inputClasses}
                    />
                </div>

                <div className="animate-fade-in-up pt-4" style={{ animationDelay: '0.7s' }}>
                    <Button type="submit" variant="primary" className={primaryButtonClassName} disabled={loading}>
                        {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </Button>
                </div>
            </form>

            <div className="animate-fade-in-up mt-8 border-t border-zinc-200/50 pt-6 text-sm text-zinc-600 text-center" style={{ animationDelay: '0.8s' }}>
                Already have an account?{' '}
                <Link to="/auth/signin" className="font-bold text-zinc-900 transition-all hover:text-zinc-700 hover:underline">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
