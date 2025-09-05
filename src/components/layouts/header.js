"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa";
import { IoMdHelpBuoy } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { IoMap } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function Header() {
    // Add useEffect for client-side initialization
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Add this useEffect
    useEffect(() => {
        setMounted(true);
    }, []);

    // If not mounted, render a simple placeholder to avoid hydration mismatch
    if (!mounted) {
        return <header className="glass-cont rounded-2xl sm:rounded-3xl lg:rounded-3xl sticky top-0 sm:top-4 lg:top-6 sm:p-3 lg:p-1 z-50 text-white mx-2 sm:mx-4 lg:mx-0">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl p-2 sm:p-3 bg-gradient-to-r from-emerald-300 to-blue-500 bg-clip-text text-transparent font-extrabold">
                        JharYatra
                    </span>
                </div>
            </div>
        </header>;
    }

    const isActive = (path) => {
        // Base path check
        if (pathname === path) return true;

        // Check for child routes
        if (path === '/places') {
            return pathname.startsWith('/places') ||
                pathname.startsWith('/Jha-vibes') ||
                pathname.startsWith('/packages');
        }

        // Check for other nested routes
        return pathname.startsWith(path + '/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="max-w-7xl mx-auto w-full sticky top-4 z-50">
            <header className="glass-cont rounded-2xl sm:rounded-3xl lg:rounded-3xl sticky top-0  sm:top-4 lg:top-6 sm:p-3 lg:p-1 z-50 text-white mx-2 sm:mx-4 lg:mx-0">
                <div className="flex justify-between items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link
                            href={'/'}
                            className="text-2xl sm:text-3xl lg:text-4xl p-2 sm:p-3 bg-gradient-to-r from-emerald-300 to-blue-500 bg-clip-text text-transparent font-extrabold"
                        >
                            JharYatra
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white hover:text-emerald-300 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                            <HiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex flex-1 justify-center items-center">
                        <div className="flex gap-8 xl:gap-12 text-white font-semibold items-center">
                            <Link
                                className={`zoomOut items-center flex flex-col transition-all duration-300 ${isActive('/Home') ? 'text-tomato scale-110' : 'hover:text-primary'}`}
                                href={'/Home'}
                            >
                                <FaHome className={`w-5 h-5 xl:w-6 xl:h-6 ${isActive('/Home') ? 'text-tomato' : ''}`} />
                                <span className="text-sm xl:text-base">Home</span>
                            </Link>
                            <Link
                                className={`zoomOut items-center flex flex-col transition-all duration-300 ${isActive('/places') ? 'text-tomato scale-110' : 'hover:text-primary'}`}
                                href={'/places'}
                            >
                                <IoMap className={`w-5 h-5 xl:w-6 xl:h-6 ${isActive('/places') ? 'text-tomato' : ''}`} />
                                <span className="text-sm xl:text-base">Destination</span>
                            </Link>
                            <Link
                                className={`zoomOut items-center flex flex-col transition-all duration-300 ${isActive('/aboutjharkhand') ? 'text-tomato scale-110' : 'hover:text-primary'}`}
                                href={'/aboutjharkhand'}
                            >
                                <FaPlaceOfWorship className={`w-5 h-5 xl:w-6 xl:h-6 ${isActive('/aboutjharkhand') ? 'text-tomato' : ''}`} />
                                <span className="text-sm xl:text-base">About</span>
                            </Link>
                            <Link
                                className={`zoomOut items-center flex flex-col transition-all duration-300 ${isActive('/Help') ? 'text-tomato scale-110' : 'hover:text-primary'}`}
                                href={'/Help'}
                            >
                                <IoMdHelpBuoy className={`w-5 h-5 xl:w-6 xl:h-6 ${isActive('/Help') ? 'text-tomato' : ''}`} />
                                <span className="text-sm xl:text-base">Help</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Desktop Right: Emergency/Language */}
                    <nav className="hidden md:flex text-white font-semibold lg:mr-6 items-center gap-2 lg:gap-3 xl:gap-4">
                        <Link className="btn border border-white p-2 rounded-lg hover:bg-red-500 transition-colors duration-300" href={'/emergency'}>
                            <FaPhoneAlt className="w-5 h-5 xl:w-6 xl:h-6" />
                        </Link>
                        <Link href={'/help'} className="btn border border-white p-2 rounded-lg hover:bg-blue-500 transition-colors duration-300">
                            <IoLanguage className="w-5 h-5 xl:w-6 xl:h-6" />
                        </Link>
                    </nav>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-600/50">
                        <div className="flex flex-col space-y-2 sm:space-y-3">
                            <Link
                                className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${isActive('/Home') ? 'bg-tomato/20 text-tomato' : 'hover:bg-white/10'}`}
                                href={'/Home'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaHome className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive('/Home') ? 'text-tomato' : ''}`} />
                                <span className="font-semibold">Home</span>
                            </Link>
                            <Link
                                className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${isActive('/places') ? 'bg-tomato/20 text-tomato' : 'hover:bg-white/10'}`}
                                href={'/places'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <IoMap className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive('/places') ? 'text-tomato' : ''}`} />
                                <span className="font-semibold">Destination</span>
                            </Link>
                            <Link
                                className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${isActive('/aboutjharkhand') ? 'bg-tomato/20 text-tomato' : 'hover:bg-white/10'}`}
                                href={'/aboutjharkhand'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaPlaceOfWorship className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive('/aboutjharkhand') ? 'text-tomato' : ''}`} />
                                <span className="font-semibold">About</span>
                            </Link>
                            <Link
                                className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${isActive('/Help') ? 'bg-tomato/20 text-tomato' : 'hover:bg-white/10'}`}
                                href={'/Help'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <IoMdHelpBuoy className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive('/Help') ? 'text-tomato' : ''}`} />
                                <span className="font-semibold">Help</span>
                            </Link>

                            {/* Mobile Emergency/Language */}
                            <div className="flex justify-center space-x-3 sm:space-x-4 pt-3 sm:pt-4 border-t border-gray-600/50">
                                <Link
                                    className="flex items-center space-x-2 border border-white p-2 sm:p-3 rounded-lg hover:bg-red-500 transition-colors duration-300 text-sm sm:text-base"
                                    href={'/emergency'}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaPhoneAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-semibold">Emergency</span>
                                </Link>
                                <Link
                                    href={'/help'}
                                    className="flex items-center space-x-2 border border-white p-2 sm:p-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 text-sm sm:text-base"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <IoLanguage className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-semibold">Language</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}