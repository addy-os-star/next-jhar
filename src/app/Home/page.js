'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Merriweather } from "next/font/google";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { MapPinIcon, CalendarIcon, StarIcon, ArrowRightIcon, ChevronDownIcon, CloudSunIcon, SunIcon } from '@heroicons/react/24/outline';

import SwipeCard from "@/components/layouts/SwipeCard";
import AutoPlayCard from "@/components/layouts/AutoPlayCard";
import TestimonialCarousel from "@/components/layouts/TestimonialCarousel";
import { CardSkeleton } from "@/components/ui/skeleton";
import WeatherWidget from "@/components/layouts/WeatherWidget";

const Rob_con = Merriweather({ subsets: ["latin"], weight: "400" });

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(false);

    // Simulate initial page loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Simulate news section loading
    useEffect(() => {
        if (!isLoading) {
            setNewsLoading(true);
            const timer = setTimeout(() => {
                setNewsLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const handleScrollToComments = () => {
        const el = document.getElementById('comments');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <section className="min-h-screen bg-gray-900">
                {/* Hero skeleton */}
                <div className="relative -mx-2 sm:-mx-0">
                    <div className="h-[50vh] sm:h-[60vh] w-full rounded-b-[30px] sm:rounded-b-[50px] bg-gray-800 animate-pulse"></div>
                </div>
                
                {/* Title skeleton */}
                <div className="-mt-60 sm:-mt-80 text-white text-center px-4">
                    <div className="h-12 sm:h-16 w-64 sm:w-96 bg-gray-800 rounded animate-pulse mx-auto mb-4"></div>
                    <div className="h-6 sm:h-8 w-48 sm:w-80 bg-gray-800 rounded animate-pulse mx-auto mb-8"></div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 mt-8 sm:mt-16 justify-center px-4">
                    <div className="h-12 sm:h-14 w-full sm:w-52 bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="h-12 sm:h-14 w-full sm:w-52 bg-gray-800 rounded-full animate-pulse"></div>
                </div>

                {/* Search skeleton */}
                <div className="mt-16 sm:mt-28 max-w-7xl w-full mx-auto text-white px-4">
                    <div className="flex justify-center">
                        <div className="h-12 sm:h-14 w-full max-w-md sm:max-w-2xl bg-gray-800 rounded-full animate-pulse"></div>
                    </div>

                    {/* Section title skeleton */}
                    <div className="flex flex-col mt-12 sm:mt-16 text-center">
                        <div className="h-6 sm:h-8 w-48 sm:w-64 bg-gray-800 rounded mb-3 animate-pulse mx-auto"></div>
                        <div className="h-16 sm:h-20 w-64 sm:w-96 bg-gray-800 rounded mb-3 animate-pulse mx-auto"></div>
                        <div className="h-6 sm:h-8 w-56 sm:w-80 bg-gray-800 rounded animate-pulse mx-auto"></div>
                    </div>

                    {/* Cards skeleton */}
                    <div className="mt-12 sm:mt-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <CardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        );
    }

    return (
        <section className="relative -mt-24 bg-gray-900 min-h-screen scroll-smooth">
            {/* Hero Section with Dark Design */}
            <div className="relative -mx-2 sm:-mx-0 overflow-hidden">
                <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full rounded-b-[30px] sm:rounded-b-[50px] overflow-hidden">
                    <Image 
                        src={'/img-jh.jpg'} 
                        alt="Jharkhand Landscape" 
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-b-[30px] sm:rounded-b-[50px]"></div>
                </div>
            </div>

            {/* Clean Title Section */}
            <div className="relative sm:-mt-80 lg:-mt-109 text-white text-center z-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className={`${Rob_con.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white animate-fade-in-up`}>
                        Digital Archives: Preserving Centuries of Wisdom
                    </h1>
                    <p className={`${Rob_con.className} text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-200`}>
                        A Digital Repository of Sacred Artifacts and Manuscripts
                    </p>
                    
                    {/* Simple CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
                        <Link 
                            href={'/aboutjharkhand'} 
                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 text-center"
                        >
                            Know More About Jharkhand
                        </Link>
                        <Link 
                            href={'/places'} 
                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105 text-center"
                        >
                            Want To Visit Jharkhand
                        </Link>
                    </div>
                </div>
            </div>

            {/* Clean Search Section */}
            <div className="mt-12 sm:mt-16 lg:mt-20 max-w-7xl w-full mx-auto text-white px-4">
                <div className="relative max-w-2xl mx-auto">
                    <form className="flex items-center bg-gray-800 rounded-full p-2 border border-gray-700 shadow-lg">
                        <input 
                            type="text" 
                            placeholder="What do you want to know about Jharkhand?" 
                            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 sm:px-6 py-3 sm:py-4 outline-none text-base sm:text-lg"
                        />
                        <button 
                            type="submit" 
                            className="bg-gray-700 p-3 sm:p-4 rounded-full hover:bg-gray-600 transition-colors duration-200"
                        >
                            <CiSearch className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                    </form>
                </div>

                {/* Clean Places Section */}
                <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-gray-400 text-lg sm:text-xl mb-2 sm:mb-3 font-medium animate-fade-in-up">Beyond the cities. Into Jharkhand&apos;s</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 text-white animate-fade-in-up animation-delay-200">
                            Most Visited Places
                        </h2>
                        <p className="text-gray-400 text-lg sm:text-xl animate-fade-in-up animation-delay-400">Where nature meets the soul.</p>
                    </div>
                    
                    <div className="flex justify-center mb-8 sm:mb-12 animate-fade-in-up animation-delay-600">
                        <button
                            onClick={handleScrollToComments}
                            className="flex items-center gap-2 bg-gray-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                        >
                            <span>People&apos;s Reaction on Jharkhand</span>
                            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>

                    <div className="mt-12 sm:mt-16 animate-fade-in-up animation-delay-800">
                        <SwipeCard />
                    </div>
                </div>

                {/* Clean Digital Archives Section */}
                <div className="mt-32">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 text-xl mb-3 font-medium animate-fade-in-up">Beyond the cities. Into Jharkhand&apos;s</p>
                        <h2 className="text-5xl md:text-6xl font-bold mb-3 text-white animate-fade-in-up animation-delay-200">
                            Digital Archives Manastorts
                        </h2>
                        <p className="text-gray-400 text-xl animate-fade-in-up animation-delay-400">Handcrafts.</p>
                    </div>

                    <div className="mt-12 animate-fade-in-up animation-delay-600">
                        <AutoPlayCard />
                    </div>
                </div>

                {/* Clean News and Events Section */}
                <div className="mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in-up">
                            <StarIcon className="h-4 w-4" />
                            Johar Jharkhand
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white animate-fade-in-up animation-delay-200">
                            News and Events
                        </h2>
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
                            Stay updated on the latest happenings and vibrant festivals across Jharkhand
                        </p>
                    </div>

                    {/* Latest News Section */}
                    <section className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold text-white border-b-2 border-gray-600 pb-2">
                                Latest News
                            </h3>
                            <Link href={"/Jha-vibes"} className="text-gray-400 hover:text-white font-medium flex items-center gap-2 group">
                                View All News
                                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                        
                        {newsLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                    <div className="relative overflow-hidden">
                                        <Image 
                                            src={"/Jharkhand_Launches.webp"} 
                                            width={0} 
                                            height={0} 
                                            sizes="100vh" 
                                            layout="cover" 
                                            alt="Tourism development in Jharkhand" 
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            New
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                                            Jharkhand Launches India&apos;s First Mining Tourism
                                        </h3>
                                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>July 22, 2025</span>
                                        </div>
                                        <p className="text-gray-300 mb-4 leading-relaxed">
                                            Jharkhand launches a pioneering mining tourism project, allowing visitors to experience the state&apos;s industrial heritage firsthand.
                                        </p>
                                        <Link href={'https://timesofindia.indiatimes.com/life-style/travel/news/jharkhand-launches-indias-first-ever-mining-tourism-to-offer-guided-mine-tours/articleshow/122826796.cms'} className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-200 group">
                                            Read More
                                            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                    <div className="relative overflow-hidden">
                                        <Image 
                                            src={"/Government_Recognised.jpg"} 
                                            width={0} 
                                            height={0} 
                                            sizes="100vh" 
                                            layout="cover" 
                                            alt="Tourism development in Jharkhand" 
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Award
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                                            Government Recognised for Development in Tourism
                                        </h3>
                                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>September 1, 2025</span>
                                        </div>
                                        <p className="text-gray-300 mb-4 leading-relaxed">
                                            At the Rajasthan Business Summit, the Jharkhand government was recognized for its progress in infrastructure and development.
                                        </p>
                                        <Link href={'https://timesofindia.indiatimes.com/life-style/travel/news/jharkhand-launches-indias-first-ever-mining-tourism-to-offer-guided-mine-tours/articleshow/122826796.cms'} className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-200 group">
                                            Read More
                                            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                    <div className="relative overflow-hidden">
                                        <Image 
                                            src={"/Taj_Hotel.jpeg"} 
                                            width={0} 
                                            height={0} 
                                            sizes="100vh" 
                                            layout="cover" 
                                            alt="Taj Hotel in Ranchi" 
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Project
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                                            Taj Hotel Project Announced in Ranchi
                                        </h3>
                                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>July 10, 2025</span>
                                        </div>
                                        <p className="text-gray-300 mb-4 leading-relaxed">
                                            The state government has announced a new project for a luxurious Taj Hotel in Ranchi&apos;s Smart City complex.
                                        </p>
                                        <Link href={'https://timesofindia.indiatimes.com/city/ranchi/taj-hotel-deal-signed-in-ranchi/articleshow/111999466.cms'} className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-200 group">
                                            Read More
                                            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Upcoming Events Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold text-white border-b-2 border-gray-600 pb-2">
                                Upcoming Events
                            </h3>
                            <Link href={"/Jha-vibes"} className="text-gray-400 hover:text-white font-medium flex items-center gap-2 group">
                                View All Events
                                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <Image 
                                        src={"/karam.jpg"} 
                                        width={0} 
                                        height={0} 
                                        sizes="100vh" 
                                        layout="cover" 
                                        alt="Karam Festival celebration" 
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Festival
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        Karam Festival
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>September 3, 2025</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">All over Jharkhand</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        A vibrant festival celebrating the Karam tree, a symbol of fertility and prosperity.
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <Image 
                                        src={"/JHAR.png"} 
                                        width={0} 
                                        height={0} 
                                        sizes="100vh" 
                                        layout="cover" 
                                        alt="Tribal festival dancers" 
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Cultural
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        Jharkhand Tribal Festival
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>August 9-11, 2025</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">Ranchi</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        An annual festival celebrating the rich culture and heritage of tribal communities.
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <Image 
                                        src={"/CSR.jpeg"} 
                                        width={0} 
                                        height={0} 
                                        sizes="100vh" 
                                        layout="cover" 
                                        alt="Business conference" 
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Business
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        Jharkhand CSR Conclave 2025
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>August 22-23, 2025</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">Ranchi</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Two-day event bringing together government officials, corporates, and NGOs.
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <Image 
                                        src={"/Skiing.jpg"} 
                                        width={0} 
                                        height={0} 
                                        sizes="100vh" 
                                        layout="cover" 
                                        alt="Skiing festival" 
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Adventure
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        Jharkhand Skiing Festival
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>February 16-23, 2025</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">Jamshedpur</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        The first-ever Jharkhand Skiing Festival offers tandem jumps and aerial shows.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Testimonials Section */}
                <div className="mt-32 " id='comments'>
                    <TestimonialCarousel />
                </div>
            </div>

            <WeatherWidget />
        </section>
    );
}