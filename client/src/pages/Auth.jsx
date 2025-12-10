import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../services/api';
import { setCredentials } from '../store/authSlice';
import { z } from 'zod'; // We installed zod in client
import { Film, Loader } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Schemas (Validation)
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 chars").max(20),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 chars"),
});

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

    const isLoading = isLoginLoading || isRegisterLoading;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // 1. Validate
        const schema = isLogin ? loginSchema : registerSchema;
        const result = schema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach(err => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        // 2. Submit
        try {
            console.log("Submitting Auth Form..", isLogin ? "Login" : "Register");
            let userData;
            if (isLogin) {
                userData = await login({ email: formData.email, password: formData.password }).unwrap();
            } else {
                userData = await register(formData).unwrap();
            }
            console.log("Auth Success");

            dispatch(setCredentials({ user: userData, token: userData.token }));
            toast.success(isLogin ? `Welcome back, ${userData.username || 'User'}!` : 'Account created successfully!');
            navigate('/');
        } catch (err) {
            console.error('Auth Failed:', err);
            if (err.data?.message) {
                setErrors({ root: err.data.message });
            } else {
                setErrors({ root: 'Something went wrong. Please try again.' });
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900/50 border border-cinematic-border p-8 rounded-2xl backdrop-blur-md shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-white text-black p-3 rounded-lg shadow-lg shadow-white/10">
                        <Film size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">
                    {isLogin ? 'Welcome Back' : 'Join the Club'}
                </h2>
                <p className="text-center text-gray-500 mb-8 text-sm">
                    {isLogin ? 'Enter your credentials to access your library.' : 'Create an account to start tracking movies.'}
                </p>

                {errors.root && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-like-red text-sm text-center">
                        {errors.root}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full bg-black/50 border ${errors.username ? 'border-like-red' : 'border-cinematic-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors`}
                            />
                            {errors.username && <p className="text-like-red text-xs mt-1 ml-1">{errors.username}</p>}
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-black/50 border ${errors.email ? 'border-like-red' : 'border-cinematic-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors`}
                        />
                        {errors.email && <p className="text-like-red text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-black/50 border ${errors.password ? 'border-like-red' : 'border-cinematic-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors`}
                        />
                        {errors.password && <p className="text-like-red text-xs mt-1 ml-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                    >
                        {isLoading && <Loader size={16} className="animate-spin" />}
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={toggleMode}
                            className="text-white font-medium hover:underline underline-offset-4 decoration-cinematic-border hover:decoration-white transition-all"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
