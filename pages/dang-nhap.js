import { useState } from 'react';
import MasterLayout from '@/components/layouts/MasterLayout';
import axiosInstance from '@/configs/api';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuthStore from '@/store/useAuthStore';

export default function Login() {
    const router = useRouter();
    const checkAuth = useAuthStore(state => state.checkAuth);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/users/login', formData);
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.token);
                await checkAuth();
                router.push('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
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
        }
    };

    const handleGoogleError = () => {
        setError('Google sign in failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="1091605536315-p98r11f7lq027dstd08meb3qmq8k9sh2.apps.googleusercontent.com">
            <MasterLayout>
                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-bold mb-8 text-center">Sign In</h1>
                        
                        {error && (
                            <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                            >
                                Sign In
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
                                    text="signin_with"
                                    shape="rectangular"
                                />
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="/dang-ky" className="text-gray-900 font-medium hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </MasterLayout>
        </GoogleOAuthProvider>
    );
}