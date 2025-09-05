"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { FaLocationCrosshairs, FaStar, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";

const places = [
    {
        name: "Ranchi",
        image: "/ranc-img.jpeg",
        description: "One of the best ways to explore the hinterlands of Ranchi is on a bicycle as it takes merely 10–15 mins to get out of the chaotic city and be in the middle of unexplored and untouched nature.",
        tags: ["Curves", "Palace", "Mountain", "Zoo"],
        rating: 4.8,
        visitors: "50K+",
        link: "/places/ranchi"
    },
    {
        name: "Jamshedpur",
        image: "/JAMSHEDPUR.jpeg",
        description: "Known as the Steel City of India, Jamshedpur offers a perfect blend of industrial heritage and natural beauty with its lush parks and modern infrastructure.",
        tags: ["Steel City", "Parks", "Industry", "Culture"],
        rating: 4.6,
        visitors: "45K+",
        link: "/places/jamshedpur"
    },
    {
        name: "Dhanbad",
        image: "/DHANBAD.jpeg",
        description: "The Coal Capital of India, Dhanbad is rich in mineral resources and offers unique insights into the mining industry alongside cultural attractions.",
        tags: ["Coal", "Mining", "Heritage", "Industry"],
        rating: 4.4,
        visitors: "40K+",
        link: "/places/dhanbad"
    },
    {
        name: "Bokaro",
        image: "/BOKARO.avif",
        description: "Home to one of India's largest steel plants, Bokaro combines industrial might with serene landscapes and modern urban planning.",
        tags: ["Steel", "Industry", "Modern", "Urban"],
        rating: 4.5,
        visitors: "35K+",
        link: "/places/bokaro"
    },
    {
        name: "Deoghar",
        image: "/DEOGHAR.jpeg",
        description: "A sacred city known for the Baidyanath Temple, Deoghar attracts millions of pilgrims and offers spiritual tranquility.",
        tags: ["Temple", "Spiritual", "Pilgrimage", "Peace"],
        rating: 4.7,
        visitors: "60K+",
        link: "/places/deoghar"
    },
    {
        name: "Hazaribagh",
        image: "/HAZARIBAG.jpeg",
        description: "Surrounded by hills and forests, Hazaribagh is perfect for nature lovers and adventure seekers with its wildlife sanctuary.",
        tags: ["Nature", "Wildlife", "Adventure", "Forest"],
        rating: 4.6,
        visitors: "30K+",
        link: "/places/hazaribagh"
    }
];

export default function SwipeCard() {
    return (
        <section className="relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                className="w-full max-w-7xl mx-auto"
            >
                <CarouselContent>
                    {places.map((place, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-2">
                                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    {/* Image Section */}
                                    <div className="relative overflow-hidden">
                                        <Image 
                                            src={place.image} 
                                            alt={place.name} 
                                            layout="cover" 
                                            width={0} 
                                            height={0} 
                                            sizes="100vh" 
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
                                        />
                                        
                                        {/* Subtle overlay */}
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        
                                        {/* Rating badge */}
                                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                                            <FaStar className="h-4 w-4 text-yellow-500" />
                                            <span className="text-white text-sm font-semibold">{place.rating}</span>
                                        </div>
                                        
                                        {/* Visitors badge */}
                                        <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {place.visitors} visitors
                                        </div>
                                        
                                        {/* Heart icon */}
                                        <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                                            <FaHeart className="h-4 w-4 text-gray-300" />
                                        </div>
                                    </div>
                                    
                                    {/* Content Section */}
                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white text-center mb-3">
                                            {place.name}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                                            {place.description}
                                        </p>
                                        
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                                            {place.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                                                    <FaMapMarkerAlt className="h-3 w-3 mr-1 inline" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {/* CTA Button */}
                                        <div className="text-center">
                                            <Link href={place.link}>
                                                <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 w-full">
                                                    Want To Visit
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                {/* Simple Navigation Buttons */}
                <CarouselPrevious className="bg-gray-700 border-none text-white hover:bg-gray-600 transition-colors duration-200" />
                <CarouselNext className="bg-gray-700 border-none text-white hover:bg-gray-600 transition-colors duration-200" />
            </Carousel>
        </section>
    );
}