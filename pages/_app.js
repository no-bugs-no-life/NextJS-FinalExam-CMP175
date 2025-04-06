import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';

const publicRoutes = ['/dang-nhap', '/dang-ky'];

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        const validateAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
                router.push('/dang-nhap');
            }
        };

        validateAuth();
    }, [router.pathname, checkAuth]);

    return <Component {...pageProps} />;
}
