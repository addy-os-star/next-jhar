"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Noto_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const noto = Noto_Sans({ 
    subsets: ["latin"], 
    weight: ["400", "600", "700"],
    variable: "--font-noto"
});

const playfair = Playfair_Display({ 
    subsets: ["latin"], 
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair"
});

const images = [
    {
        src: '/hero-1.jpg',
        alt: 'Jharkhand Landscape'
    },
    {
        src: '/hero-2.jpg',
        alt: 'Cultural Heritage'
    },
    {
        src: '/hero-3.jpg',
        alt: 'Wildlife Sanctuary'
    },
    {
        src: '/hero-4.jpg',
        alt: 'Waterfalls'
    },
    {
        src: '/hero-5.jpg',
        alt: 'Temples'
    }
];

const TRANSITION_DURATION = 500; // Duration in milliseconds
const SLIDE_DURATION = 10000; // 10 seconds between slides

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            
            // Start transition with blur
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                
                // Reset blur after new image is shown
                setTimeout(() => {
                    setIsTransitioning(false);
                }, TRANSITION_DURATION);
            }, TRANSITION_DURATION);
            
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
                <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                    style={{
                        width: '100%',
                        animation: `progress ${SLIDE_DURATION}ms linear infinite`
                    }}
                />
            </div>

            {/* Background blur layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    fill
                    className={`object-cover transform transition-all duration-[${TRANSITION_DURATION}ms] ${
                        isTransitioning 
                            ? 'blur-2xl scale-125 brightness-75' 
                            : 'blur-md scale-110 brightness-90'
                    }`}
                />
            </div>

            {/* Main image layer */}
            <div className="absolute inset-0 z-10">
                <div className="relative w-full h-full">
                    <Image
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        fill
                        priority
                        className={`object-cover transition-all duration-[${TRANSITION_DURATION}ms] ${
                            isTransitioning 
                                ? 'blur-lg scale-105 brightness-90' 
                                : 'blur-0 scale-100 brightness-100'
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                </div>
            </div>

            {/* Content overlay */}
            <div className="relative z-20 h-full flex items-center justify-center text-white">
                <div className="text-center space-y-4 px-4">
                    {/* Main Title */}
                    <div className="space-y-4">
                        <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase text-white font-bold leading-tight tracking-wide`}>
                            <span className="block bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                                Unveil An
                            </span>
                            <span className="block bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">
                                Ancient Legacy
                            </span>
                        </h1>
                    </div>
                    
                    {/* Subtitle */}
                    <div className="max-w-3xl mx-auto">
                        <p className={`${noto.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white/95 font-light leading-relaxed tracking-wide`}>
                            Explore the
                            <span className="font-semibold text-emerald-300 mx-2">Sacred Monasteries</span>
                            of Jharkhand
                        </p>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="pt-4 sm:pt-6 lg:pt-8">
                        <Link 
                            href={'/Home'} 
                            className="group inline-flex items-center justify-center px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-emerald-600/80 to-blue-600/80 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-lg sm:text-xl lg:text-2xl uppercase tracking-wider transition-all duration-500 hover:scale-105 hover:from-emerald-500/90 hover:to-blue-500/90 hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-95"
                        >
                            <span className="mr-3">Begin Your Journey</span>
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Current Image Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index 
                                ? 'bg-white w-6' 
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-8 w-1 h-32 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent hidden xl:block"></div>
            <div className="absolute top-1/3 right-8 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent hidden xl:block"></div>
            <div className="absolute bottom-1/4 left-12 w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent hidden xl:block"></div>

            <style jsx>{`
                @keyframes progress {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
}