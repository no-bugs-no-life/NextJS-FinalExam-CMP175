import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/dang-nhap');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const renderNavLinks = () => (
        <>
            <Link href="/" className="hover:text-gray-600">Trang chủ</Link>
            <Link href="/bai-viet" className="hover:text-gray-600">Bài viết</Link>
            {isAuthenticated ? (
                <>
                    <Link href="/trang-ca-nhan" className="hover:text-gray-600">
                        {user?.firstName || 'Trang cá nhân'}
                    </Link>
                    <button onClick={handleLogout} className="hover:text-red-600">
                        Đăng xuất
                    </button>
                </>
            ) : (
                <>
                    <Link href="/dang-nhap" className="hover:text-gray-600">Đăng nhập</Link>
                    <Link href="/dang-ky" className="hover:text-gray-600">Đăng ký</Link>
                </>
            )}
        </>
    );

    return (
        <nav className="py-4 border-b border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">DevNews</Link>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-8">
                            {renderNavLinks()}
                        </div>
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-6 bg-white fixed inset-0 z-50 flex flex-col items-center justify-center">
                        <div className="flex flex-col space-y-6 text-center">
                            {renderNavLinks()}
                        </div>
                        
                        <button 
                            onClick={toggleMenu} 
                            className="absolute bottom-10 text-gray-800 focus:outline-none"
                            aria-label="Close menu"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
