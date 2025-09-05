"use client";

import Image from "next/image";
import { Nunito, Noto_Sans, Libertinus_Serif } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/header";
import { useState, useEffect } from "react";
import { Skeleton, CardSkeleton, TextSkeleton } from "@/components/ui/skeleton";

const nunito = Nunito({ subsets: ["latin"], weight: ['400', '500', '700'] })
const noto = Noto_Sans({ subsets: ["latin"], weight: ['400', '600', '700'] })
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: ['400', '600'] })

// Governors data
const governors = [
    {
        id: 1,
        name: "Santosh Kumar Gangwar",
        tenure: "2024 - Present",
        image: "/santos.jpeg",
        description: "Current Governor focusing on industrial development and tribal welfare programs."
    },
    {
        id: 2,
        name: "Ramesh Bais",
        tenure: "2019 - 2024",
        image: "/ramesh.jpeg", // Using placeholder
        description: "Former Governor who emphasized education reforms and rural development initiatives."
    },
    {
        id: 3,
        name: "Droupadi Murmu",
        tenure: "2015 - 2021",
        image: "/murmu.jpeg", // Using placeholder
        description: "First tribal woman Governor of Jharkhand, later became President of India."
    },
    {
        id: 4,
        name: "Syed Ahmed",
        tenure: "2013 - 2015",
        image: "/ahmed.jpeg", // Using placeholder
        description: "Promoted sustainable development and environmental conservation during his tenure."
    },
    {
        id: 5,
        name: "M. O. H. Farook",
        tenure: "2010 - 2013",
        image: "/farook.jpeg", // Using placeholder
        description: "Focused on administrative reforms and strengthening democratic institutions."
    }
];

// Chief Ministers data
const chiefMinisters = [
    {
        id: 1,
        name: "Hemant Soren",
        tenure: "2019 - Present",
        party: "JMM",
        image: "/hemant-img.jpeg",
        description: "Current CM leading progressive governance with focus on tribal rights and development."
    },
    {
        id: 2,
        name: "Raghubar Das",
        tenure: "2014 - 2019",
        party: "BJP",
        image: "/hemant-img.jpeg", // Using placeholder
        description: "First non-tribal CM who focused on industrial growth and infrastructure development."
    },
    {
        id: 3,
        name: "Arjun Munda",
        tenure: "2010 - 2013",
        party: "BJP",
        image: "/hemant-img.jpeg", // Using placeholder
        description: "Tribal leader who served multiple terms and promoted indigenous culture and development."
    },
    {
        id: 4,
        name: "Shibu Soren",
        tenure: "2008 - 2010",
        party: "JMM",
        image: "/hemant-img.jpeg", // Using placeholder
        description: "Veteran tribal leader and founder of JMM, champion of tribal rights."
    },
    {
        id: 5,
        name: "Madhu Koda",
        tenure: "2006 - 2008",
        party: "Independent",
        image: "/hemant-img.jpeg", // Using placeholder
        description: "Independent leader who focused on mining sector reforms and rural development."
    }
];

export default function AboutJharkhand() {
    const [currentGovernorIndex, setCurrentGovernorIndex] = useState(0);
    const [currentCMIndex, setCurrentCMIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading time (remove this in production)
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds loading time

        return () => clearTimeout(loadingTimer);
    }, []);

    // Auto-rotate governor carousel every 3 seconds
    useEffect(() => {
        if (isLoading) return;
        
        const interval = setInterval(() => {
            setCurrentGovernorIndex((prevIndex) => 
                (prevIndex + 1) % governors.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Auto-rotate CM carousel every 3 seconds (with slight offset)
    useEffect(() => {
        if (isLoading) return;
        
        const interval = setInterval(() => {
            setCurrentCMIndex((prevIndex) => 
                (prevIndex + 1) % chiefMinisters.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Loading skeleton component
    const AboutJharkhandSkeleton = () => (
        <>
            <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden -mx-4 md:-mx-8 lg:-mx-12">
                {/* Hero Section Skeleton */}
                <div className="relative w-screen h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0">
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative z-10 w-full h-[400px] flex flex-col justify-center items-center text-center px-6 -mt-[400px]">
                    <div className="animate-fade-in-up">
                        <Skeleton className="h-20 w-96 mx-auto mb-6" />
                        <Skeleton className="h-8 w-2/3 mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 mx-auto" />
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title Skeleton */}
                        <div className="text-center mb-16">
                            <Skeleton className="h-16 w-2/3 mx-auto mb-6" />
                            <Skeleton className="h-6 w-3/4 mx-auto" />
                        </div>

                        <div className="space-y-20">
                            {/* Governance Section Skeleton */}
                            <section>
                                <div className="glass-morphism rounded-3xl p-8 md:p-12">
                                    <div className="flex items-center mb-12">
                                        <Skeleton className="h-10 w-1/3" />
                                        <div className="flex-1 h-0.5 bg-gray-600 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Carousel Skeletons */}
                                        {[1, 2].map((i) => (
                                            <div key={i} className="glass-morphism rounded-2xl p-6">
                                                <div className="text-center relative h-96">
                                                    <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                                                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                                                    <Skeleton className="h-4 w-24 mx-auto mb-2" />
                                                    <Skeleton className="h-3 w-16 mx-auto mb-3" />
                                                    <Skeleton className="h-16 w-full" />
                                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                        {[1, 2, 3, 4, 5].map((dot) => (
                                                            <Skeleton key={dot} className="w-2 h-2 rounded-full" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* State Statistics Skeleton */}
                                        <div className="glass-morphism rounded-2xl p-6">
                                            <Skeleton className="h-6 w-32 mx-auto mb-6" />
                                            <div className="space-y-4">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <Skeleton className="h-4 w-16" />
                                                            <Skeleton className="h-8 w-8" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legislative Assembly Image Skeleton */}
                                    <div className="mt-12 rounded-2xl overflow-hidden">
                                        <Skeleton className="w-full h-64 md:h-80" />
                                    </div>
                                </div>
                            </section>

                            {/* Famous Personalities Section Skeleton */}
                            <section>
                                <div className="glass-morphism rounded-3xl p-8 md:p-12">
                                    <div className="flex items-center mb-12">
                                        <Skeleton className="h-10 w-1/4" />
                                        <div className="flex-1 h-0.5 bg-gray-600 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="glass-morphism rounded-2xl p-6">
                                                <div className="flex flex-col items-center text-center">
                                                    <Skeleton className="w-32 h-32 rounded-full mb-6" />
                                                    <Skeleton className="h-6 w-24 mb-2" />
                                                    <Skeleton className="h-16 w-full mb-4" />
                                                    <Skeleton className="h-6 w-20 rounded-full" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* About Jharkhand Section Skeleton */}
                            <section>
                                <div className="glass-morphism rounded-3xl p-8 md:p-12">
                                    <div className="flex items-center mb-12">
                                        <Skeleton className="h-10 w-1/3" />
                                        <div className="flex-1 h-0.5 bg-gray-600 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="glass-morphism rounded-2xl p-6">
                                                    <Skeleton className="h-8 w-3/4 mb-4" />
                                                    <TextSkeleton lines={4} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-6">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="glass-morphism rounded-2xl p-6">
                                                    <Skeleton className="h-8 w-3/4 mb-4" />
                                                    <TextSkeleton lines={4} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cultural Heritage & Quick Facts Skeletons */}
                                    <div className="mt-12 space-y-12">
                                        <div className="glass-morphism rounded-2xl p-8">
                                            <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="text-center">
                                                        <Skeleton className="h-12 w-12 mx-auto mb-3" />
                                                        <Skeleton className="h-6 w-24 mx-auto mb-2" />
                                                        <Skeleton className="h-12 w-full" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-600/20">
                                            <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i}>
                                                        <Skeleton className="h-8 w-16 mx-auto mb-2" />
                                                        <Skeleton className="h-4 w-20 mx-auto" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gray-700/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
            </section>
            <Footer />
        </>
    );

    // Show loading skeleton while loading
    if (isLoading) {
        return <AboutJharkhandSkeleton />;
    }
    return (
        <>
            <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden -mx-4 md:-mx-8 lg:-mx-12">
                {/* Hero Section with Dark Theme Gradient Background - Full Screen Width */}
                <div className="relative w-[2400px] h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0">
                    {/* Dark overlay pattern for texture */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative z-10 w-full h-[400px] flex flex-col justify-center items-center text-center px-6 -mt-[400px]">
                    <div className="animate-fade-in-up">
                        <h1 className={`${noto.className} text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white`}>
                            JharYatra
                        </h1>
                        <p className={`${libertinus.className} text-xl md:text-2xl text-gray-100 mb-4 animate-fade-in-up animation-delay-200`}>
                            Explore the Wonders of Jharkhand
                        </p>
                        <p className={`text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-300`}>
                            Where the serene beauty of nature meets a rich cultural soul
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-8 md:px-12 mt-6 lg:px-16 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Title */}
                        <div className="text-center mb-16 animate-fade-in-up animation-delay-400">
                            <h2 className={`${noto.className} text-4xl md:text-5xl font-bold mb-6 text-white`}>
                                Jharkhand: The Land of Forests
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                A comprehensive overview of the state&apos;s governance, culture, and heritage
                            </p>
                        </div>

                        <div className="space-y-20">
                            {/* Governance Section */}
                            <section className="animate-fade-in-up animation-delay-500">
                                <div className="glass-morphism rounded-3xl p-8 md:p-12 card-hover-effect">
                                    <div className="flex items-center mb-12">
                                        <h2 className={`${noto.className} text-3xl md:text-4xl font-bold text-emerald-400`}>
                                            Governance & Administration
                                        </h2>
                                        <div className="flex-1 h-0.5 bg-emerald-400 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* CM Carousel */}
                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect group overflow-hidden">
                                            <div className="text-center relative h-96">
                                                <div className="flex flex-col transition-all duration-500 ease-in-out"
                                                     style={{
                                                         transform: `translateY(-${currentCMIndex * 384}px)`,
                                                     }}>
                                                    {chiefMinisters.map((cm, index) => (
                                                        <div key={cm.id} className="w-full h-96 flex flex-col justify-center items-center flex-shrink-0 py-4">
                                                            <div className="relative mb-4">
                                                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-1">
                                                                    <img 
                                                                        src={cm.image}
                                                                        alt={`${cm.name}, Chief Minister of Jharkhand`}
                                                                        className="w-full h-full rounded-full object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <h3 className={`${noto.className} text-lg font-semibold text-tomato mb-2`}>Chief Minister</h3>
                                                            <p className="text-gray-300 font-medium mb-1 text-sm">{cm.name}</p>
                                                            <p className="text-xs text-gray-400 mb-2">{cm.tenure}</p>
                                                            <p className="text-xs text-emerald-400 mb-3 font-medium">{cm.party}</p>
                                                            <p className="text-xs text-gray-400 text-center leading-relaxed px-2">{cm.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                {/* Carousel Indicators */}
                                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                    {chiefMinisters.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                index === currentCMIndex 
                                                                    ? 'bg-emerald-400 scale-110' 
                                                                    : 'bg-gray-600 hover:bg-gray-500'
                                                            }`}
                                                            onClick={() => setCurrentCMIndex(index)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Governor Carousel */}
                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect group overflow-hidden">
                                            <div className="text-center relative h-96">
                                                <div className="flex flex-col transition-all duration-500 ease-in-out"
                                                     style={{
                                                         transform: `translateY(-${currentGovernorIndex * 384}px)`,
                                                     }}>
                                                    {governors.map((governor, index) => (
                                                        <div key={governor.id} className="w-full h-96 flex flex-col justify-center items-center flex-shrink-0 py-4">
                                                            <div className="relative mb-4">
                                                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-1">
                                                                    <img 
                                                                        src={governor.image}
                                                                        alt={`${governor.name}, Governor of Jharkhand`}
                                                                        className="w-full h-full rounded-full object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <h3 className={`${noto.className} text-lg font-semibold text-tomato mb-2`}>Governor</h3>
                                                            <p className="text-gray-300 font-medium mb-1 text-sm">{governor.name}</p>
                                                            <p className="text-xs text-gray-400 mb-3">{governor.tenure}</p>
                                                            <p className="text-xs text-gray-400 text-center leading-relaxed px-2">{governor.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                {/* Carousel Indicators */}
                                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                    {governors.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                index === currentGovernorIndex 
                                                                    ? 'bg-purple-400 scale-110' 
                                                                    : 'bg-gray-600 hover:bg-gray-500'
                                                            }`}
                                                            onClick={() => setCurrentGovernorIndex(index)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* State Statistics */}
                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect">
                                            <h3 className={`${noto.className} text-xl font-semibold text-tomato mb-6 text-center`}>State Statistics</h3>
                                            <div className="space-y-4">
                                                <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-300">Districts</span>
                                                        <span className="text-2xl font-bold text-emerald-400">24</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-300">MLA Seats</span>
                                                        <span className="text-2xl font-bold text-blue-400">81</span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-300">MPs</span>
                                                        <span className="text-2xl font-bold text-purple-400">20</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1">14 Lok Sabha + 6 Rajya Sabha</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legislative Assembly Image */}
                                    <div className="mt-12 rounded-2xl overflow-hidden card-hover-effect">
                                        <div className="relative h-64 md:h-80">
                                            <img
                                                src="/mahal.jpeg"
                                                alt="Jharkhand Legislative Assembly building"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 text-white">
                                                <h4 className={`${noto.className} text-xl font-semibold mb-2`}>Legislative Assembly</h4>
                                                <p className="text-gray-200">Seat of democratic governance in Jharkhand</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Famous Personalities Section */}
                            <section className="animate-fade-in-up animation-delay-600">
                                <div className="glass-morphism rounded-3xl p-8 md:p-12 card-hover-effect">
                                    <div className="flex items-center mb-12">
                                        <h2 className={`${noto.className} text-3xl md:text-4xl font-bold text-purple-400`}>
                                            Pride of Jharkhand
                                        </h2>
                                        <div className="flex-1 h-0.5 bg-purple-400 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {/* MS Dhoni Card */}
                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect group">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-6">
                                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                                                        <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-white">MSD</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className={`${noto.className} text-xl font-bold text-tomato mb-2`}>MS Dhoni</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    Cricket Legend & Former Indian Captain. Known for his cool demeanor and match-winning performances.
                                                </p>
                                                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full">
                                                    <span className="text-xs text-yellow-400 font-medium">Cricket Icon</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Placeholder for more personalities */}
                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect group">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-6">
                                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-1">
                                                        <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-white">🎭</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className={`${noto.className} text-xl font-bold text-tomato mb-2`}>Cultural Icons</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    Jharkhand has produced numerous artists, writers, and cultural ambassadors who have enriched Indian heritage.
                                                </p>
                                                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full">
                                                    <span className="text-xs text-emerald-400 font-medium">Arts & Culture</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass-morphism rounded-2xl p-6 card-hover-effect group">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-6">
                                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-1">
                                                        <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-white">🏛️</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className={`${noto.className} text-xl font-bold text-tomato mb-2`}>Leaders & Visionaries</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    Political leaders and social reformers who have shaped the destiny of Jharkhand and contributed to India&apos;s progress.
                                                </p>
                                                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full">
                                                    <span className="text-xs text-purple-400 font-medium">Leadership</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Detailed Description About Jharkhand */}
                            <section className="animate-fade-in-up animation-delay-700">
                                <div className="glass-morphism rounded-3xl p-8 md:p-12 card-hover-effect">
                                    <div className="flex items-center mb-12">
                                        <h2 className={`${noto.className} text-3xl md:text-4xl font-bold text-yellow-400`}>
                                            About Jharkhand
                                        </h2>
                                        <div className="flex-1 h-0.5 bg-yellow-400 ml-6"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Geography & Location */}
                                        <div className="space-y-6">
                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-emerald-400 mb-4 flex items-center`}>
                                                    🌍 Geography & Location
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Jharkhand, literally meaning &ldquo;The Land of Forests,&rdquo; is a state in eastern India carved out of Bihar in 2000. 
                                                    Located between 21°58&apos;10&quot; and 25°19&apos;15&quot; North latitude and 83°19&apos;50&quot; and 87°57&apos;10&quot; East longitude, 
                                                    it covers an area of 79,714 square kilometers.
                                                </p>
                                            </div>

                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-blue-400 mb-4 flex items-center`}>
                                                    🏛️ Capital & Major Cities
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    <span className="font-semibold text-tomato">Ranchi</span> serves as the capital city, known as the &ldquo;City of Waterfalls.&rdquo; 
                                                    Other major cities include Jamshedpur (Steel City of India), Dhanbad (Coal Capital), 
                                                    Bokaro (Steel City), and Hazaribagh.
                                                </p>
                                            </div>

                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-purple-400 mb-4 flex items-center`}>
                                                    👥 Demographics
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    With a population of approximately 38 million (2022), Jharkhand is home to diverse tribal communities 
                                                    including Santhal, Oraon, Munda, Ho, and Kharia. The state has 32 recognized tribal groups, 
                                                    making it one of India&apos;s most ethnically diverse states.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Economy & Resources */}
                                        <div className="space-y-6">
                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-yellow-400 mb-4 flex items-center`}>
                                                    ⛏️ Natural Resources
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Jharkhand is incredibly rich in mineral resources, accounting for about 29% of India&apos;s coal reserves, 
                                                    26% of iron ore, and significant deposits of copper, mica, bauxite, and uranium. 
                                                    The state contributes nearly 40% of India&apos;s mineral production.
                                                </p>
                                            </div>

                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-red-400 mb-4 flex items-center`}>
                                                    🏭 Industrial Heritage
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Home to major industrial giants like Tata Steel (Asia&apos;s first steel plant), 
                                                    SAIL Bokaro, and numerous coal mines. The state houses India&apos;s largest 
                                                    steel-producing companies and is a major contributor to the country&apos;s industrial output.
                                                </p>
                                            </div>

                                            <div className="glass-morphism rounded-2xl p-6">
                                                <h3 className={`${noto.className} text-2xl font-bold text-green-400 mb-4 flex items-center`}>
                                                    🌿 Flora & Fauna
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    About 29% of the state is covered by forests, hosting rich biodiversity including tigers, elephants, 
                                                    and over 180 bird species. Notable protected areas include Betla National Park, 
                                                    Palamau Tiger Reserve, and Hazaribagh Wildlife Sanctuary.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cultural Heritage */}
                                    <div className="mt-12">
                                        <div className="glass-morphism rounded-2xl p-8">
                                            <h3 className={`${noto.className} text-2xl font-bold text-pink-400 mb-6 text-center`}>
                                                🎭 Rich Cultural Heritage
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="text-center">
                                                    <div className="text-3xl mb-3">🎵</div>
                                                    <h4 className="font-semibold text-tomato mb-2">Music & Dance</h4>
                                                    <p className="text-sm text-gray-300">Traditional folk dances like Jhumair, Domkach, and Lahasua reflect the vibrant tribal culture.</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-3xl mb-3">🎨</div>
                                                    <h4 className="font-semibold text-tomato mb-2">Arts & Crafts</h4>
                                                    <p className="text-sm text-gray-300">Famous for Dokra metal craft, Sohrai paintings, and intricate bamboo and cane work.</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-3xl mb-3">🗣️</div>
                                                    <h4 className="font-semibold text-tomato mb-2">Languages</h4>
                                                    <p className="text-sm text-gray-300">Hindi is official, while Santhali, Mundari, Ho, and other tribal languages are widely spoken.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key Facts */}
                                    <div className="mt-12">
                                        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
                                            <h3 className={`${noto.className} text-2xl font-bold text-emerald-400 mb-6 text-center`}>
                                                📊 Quick Facts
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-yellow-400">2000</div>
                                                    <div className="text-sm text-gray-300">Year Formed</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-400">79,714</div>
                                                    <div className="text-sm text-gray-300">Area (sq km)</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-green-400">38M+</div>
                                                    <div className="text-sm text-gray-300">Population</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-purple-400">32</div>
                                                    <div className="text-sm text-gray-300">Tribal Groups</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </section>
            <Footer />
        </>
    );
}