import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="py-4 border-b border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">DevNews</div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
                            <Link href="/projects" className="hover:text-gray-600">Projects</Link>
                            <Link href="/about" className="hover:text-gray-600">About</Link>
                            <Link href="/newsletter" className="hover:text-gray-600">Newsletter</Link>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className="w-12 h-6 rounded-full bg-gray-200 flex items-center transition duration-300 focus:outline-none shadow"
                        >
                            <div className={`w-6 h-6 rounded-full transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-6 bg-white' : 'bg-white'}`}>
                                {darkMode ? '🌙' : '☀️'}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile navigation - Light theme */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-6 bg-white fixed inset-0 z-50 flex flex-col items-center justify-center">
                        <div className="flex flex-col space-y-6 text-center">
                            <Link href="/blog" className="text-lg hover:text-gray-600">Blog</Link>
                            <Link href="/projects" className="text-lg hover:text-gray-600">Projects</Link>
                            <Link href="/about" className="text-lg hover:text-gray-600">About</Link>
                            <Link href="/newsletter" className="text-lg hover:text-gray-600">Newsletter</Link>
                        </div>
                        <div className="mt-8 flex items-center">
                            <button 
                                onClick={toggleDarkMode}
                                className="w-16 h-8 rounded-full bg-gray-200 flex items-center transition duration-300 focus:outline-none shadow"
                            >
                                <div className={`w-8 h-8 rounded-full transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-8 bg-white' : 'bg-white'}`}>
                                    {darkMode ? '🌙' : '☀️'}
                                </div>
                            </button>
                        </div>
                        
                        {/* Close button at the bottom */}
                        <button 
                            onClick={toggleMenu} 
                            className="absolute bottom-10 text-gray-800 focus:outline-none"
                            aria-label="Close menu"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
