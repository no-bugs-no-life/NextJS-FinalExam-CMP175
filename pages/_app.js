import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';

const publicRoutes = ['/dang-nhap', '/dang-ky'];

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return <Component {...pageProps} />;
}
