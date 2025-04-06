import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/configs/api';

export default function GoogleLoginHandler() {
    const router = useRouter();
    const [error, setError] = useState('');
    const { credential } = router.query;

    useEffect(() => {
        const handleGoogleLogin = async () => {
            if (!credential) return;
            
            try {
                const response = await axiosInstance.post('/v1/auth/gg-login', {
                    credential
                });
                
                if (response.accessToken) {
                    localStorage.setItem('accessToken', response.accessToken);
                    router.push('/');
                }
            } catch (err) {
                setError(err.message);
                setTimeout(() => {
                    router.push('/dang-nhap');
                }, 3000);
            }
        };

        handleGoogleLogin();
    }, [credential, router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p>{error}</p>
                    <p className="mt-2">Redirecting to login page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Processing your Google login...</p>
            </div>
        </div>
    );
}