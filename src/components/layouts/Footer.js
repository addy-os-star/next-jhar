import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="relative mt-20 sm:mt-32 lg:mt-56">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image 
                    src={'/bg-morder.jpg'} 
                    alt="Footer background" 
                    fill
                    className="object-cover -z-10" 
                />
            </div>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
            
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="text-white">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center md:text-left">JharYatra</h3>
                            <p className="text-gray-300 text-sm sm:text-base mb-4 text-center md:text-left">
                                Jharkhand, where nature meets adventure.
                            </p>
                            
                            {/* Logos */}
                            <div className="flex justify-center md:justify-start gap-3 mb-4">
                                <Image src={'/1.png'} alt="logo" width={60} height={60} className="rounded-lg" />
                                <Image src={'/jha-logo.png'} alt="Jharkhand logo" width={60} height={60} className="w-16 h-16 rounded-full object-cover" />
                            </div>
                            
                            <p className="text-gray-300 text-sm mb-6 text-center md:text-left">
                                Discover the beauty of Jharkhand through our curated destinations and experiences.
                            </p>

                            {/* Social Links */}
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href="https://www.youtube.com/@newsjharkhandnj" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                    <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                    <IoLogoInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                    <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                    <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Important Links */}
                    <div className="text-white">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-center md:text-left">Important Links</h4>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Discover
                            </Link>
                            <Link href="/about" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Our Story
                            </Link>
                            <Link href="/places" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Places to Visit
                            </Link>
                            <Link href="/contact" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Help Center
                            </Link>
                        </div>
                    </div>
                    
                    {/* Travel Essentials */}
                    <div className="text-white">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-center md:text-left">Travel Essentials</h4>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <Link href="/permits" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Protected Area Permit (PAP)
                            </Link>
                            <Link href="/permits" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Restricted Area Permit (RAP)
                            </Link>
                            <Link href="/agents" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Travel Agents
                            </Link>
                            <Link href="/tics" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                Tourist Information Centers
                            </Link>
                        </div>
                    </div>
                    
                    {/* Contact Us */}
                    <div className="text-white">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-center md:text-left">Contact Us</h4>
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex items-start justify-center md:justify-start gap-2 text-gray-300 text-sm sm:text-base">
                                <FaLocationDot className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                                <span className="text-center md:text-left">
                                    1st Floor, Sector-24,<br/>
                                    Ranchi, Jharkhand
                                </span>
                            </div>
                            <a href="tel:+916409700000" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <IoMdCall className="w-4 h-4 flex-shrink-0" />
                                +91 620-XXXX, 2763-XXXX
                            </a>
                            <a href="mailto:info@jharyatra.com" className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                                <MdEmail className="w-4 h-4 flex-shrink-0" />
                                info@jharyatra.com
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © 2024 JharYatra. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}