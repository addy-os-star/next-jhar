"use client";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FaAnglesRight, FaStar, FaHeart } from "react-icons/fa6";
import Link from "next/link";
import AutoScroll from "embla-carousel-auto-scroll";

const artifacts = [
    {
        name: "Dokra Art Statue",
        image: "/PENDENT copy.jpg",
        period: "(19th century)",
        description: "Traditional tribal metal craft",
        rating: 4.9,
        category: "Metal Craft",
        link: "https://www.jharcraft.in/product/dokra-art/"
    },
    {
        name: "Tussar Silk Fabric",
        image: "/tussar_silk_fabric.webp",
        period: "(Traditional)",
        description: "Handwoven silk from tribal artisans",
        rating: 4.8,
        category: "Textile",
        link: "https://www.jharcraft.in/product/tussar-silk/"
    },
    {
        name: "Bamboo Craft",
        image: "/bamboo_craft.jpg",
        period: "(Contemporary)",
        description: "Sustainable bamboo products",
        rating: 4.7,
        category: "Bamboo",
        link: "https://www.jharcraft.in/product/bamboo-craft/"
    },
    {
        name: "Stone Carving",
        image: "/stone_craft.jpeg",
        period: "(Ancient)",
        description: "Traditional stone art forms",
        rating: 4.6,
        category: "Stone",
        link: "https://www.jharcraft.in/product/stone-carving/"
    },
    {
        name: "Wooden Toys",
        image: "/wooden_toys.jpg",
        period: "(Traditional)",
        description: "Handcrafted wooden artifacts",
        rating: 4.8,
        category: "Wood",
        link: "https://www.jharcraft.in/product/wooden-toys/"
    },
    {
        name: "Tribal Jewelry",
        image: "/tribal_jewel.jpg",
        period: "(Heritage)",
        description: "Traditional tribal ornaments",
        rating: 4.9,
        category: "Jewelry",
        link: "https://www.jharcraft.in/product/tribal-jewelry/"
    }
];

export default function AutoPlayCard() {
    return (
        <section className="relative">
            <Carousel
                opts={{
                    loop: true
                }}
                plugins={[
                    AutoScroll({
                        stopOnMouseEnter: true,
                        stopOnInteraction: false,
                        speed: 3
                    })
                ]}
                className="w-full max-w-7xl mx-auto"
            >
                <CarouselContent>
                    {artifacts.map((artifact, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 mb-8">
                            <div className="p-2">
                                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    {/* Image Section */}
                                    <div className="relative overflow-hidden">
                                        <Image 
                                            src={artifact.image} 
                                            alt={artifact.name} 
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
                                            <span className="text-white text-sm font-semibold">{artifact.rating}</span>
                                        </div>
                                        
                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {artifact.category}
                                        </div>
                                        
                                        {/* Heart icon */}
                                        <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                                            <FaHeart className="h-4 w-4 text-gray-300" />
                                        </div>
                                    </div>
                                    
                                    {/* Content Section */}
                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white text-center mb-2">
                                            {artifact.name}
                                        </h3>
                                        
                                        {/* Period */}
                                        <p className="text-center text-gray-400 text-sm mb-3">
                                            {artifact.period}
                                        </p>
                                        
                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                                            {artifact.description}
                                        </p>
                                        
                                        {/* CTA Button */}
                                        <div className="text-center">
                                            <Link href={artifact.link}>
                                                <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 w-full flex items-center justify-center gap-2">
                                                    <span>Explore</span>
                                                    <FaAnglesRight className="h-4 w-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}