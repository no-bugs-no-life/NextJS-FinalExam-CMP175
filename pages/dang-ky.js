import { useState } from 'react';
import MasterLayout from '@/components/layouts/MasterLayout';
import axiosInstance from '@/configs/api';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuthStore from '@/store/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const router = useRouter();
    const checkAuth = useAuthStore(state => state.checkAuth);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Register the user
            const registerResponse = await axiosInstance.post('/users/register', {
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                password: formData.password
            });

            if (registerResponse.data.success) {
                // Show success toast
                toast.success(registerResponse.data.message || 'Registration successful! Please login to continue.');
                
                // Wait for 1.5 seconds before redirecting to login
                setTimeout(() => {
                    router.push('/dang-nhap');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/users/google-login', {
                idToken: credentialResponse.credential
            });
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.token);
                await checkAuth();
                router.push('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Google sign in failed');
            toast.error(err.response?.data?.message || 'Google sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google sign in failed. Please try again.');
        toast.error('Google sign in failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="1091605536315-p98r11f7lq027dstd08meb3qmq8k9sh2.apps.googleusercontent.com">
            <MasterLayout>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        success: {
                            duration: 3000,
                            style: {
                                background: '#10B981',
                                color: 'white',
                            },
                        },
                        error: {
                            duration: 3000,
                            style: {
                                background: '#EF4444',
                                color: 'white',
                            },
                        },
                    }}
                />
                
                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-bold mb-8 text-center">Create Account</h1>
                        
                        {error && (
                            <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="First name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="Last name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="Enter your email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="Create a password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    theme="outline"
                                    size="large"
                                    text="signup_with"
                                    shape="rectangular"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/dang-nhap" className="text-gray-900 font-medium hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </MasterLayout>
        </GoogleOAuthProvider>
    );
}