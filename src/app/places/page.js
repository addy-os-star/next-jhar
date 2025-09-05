"use client";
import { useState, useEffect } from 'react';
import UserTabs from "@/components/layouts/UserTabs";
import Header from "@/components/layouts/header";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Skeleton, CardSkeleton } from "@/components/ui/skeleton";
import { Noto_Sans, Libertinus_Serif } from "next/font/google";

const noto = Noto_Sans({ subsets: ["latin"], weight: ['400', '600', '700'] })
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: ['400', '600'] })

// 1. Place data array - 50 Tourist Places in Jharkhand
const PLACES = [
    {
        name: "Ranchi",
        image: "/picture/Rachi/36b11dc7-3c17-4210-a09f-c5c2a1ca87e6.jpg",
        description: [
            "Capital city known as the City of Waterfalls with beautiful natural scenery.",
            "Perfect for cycling tours to explore untouched nature and serene landscapes."
        ],
        link: "/places/ranchi",
        category: "city",
        tags: ["capital", "waterfalls", "nature", "cycling"],
        pictureFolder: "Rachi"
    },
    {
        name: "Jamshedpur",
        image: "/picture/Jamshepdpur/3d46681c-e8cf-4d01-ae87-de2fe9cca9a8.jpg",
        description: [
            "Steel City of India with beautiful parks, lakes, and industrial landmarks.",
            "Planned city with modern infrastructure and green spaces."
        ],
        link: "/places/jamshedpur",
        category: "city",
        tags: ["steel city", "parks", "lakes", "industrial"],
        pictureFolder: "Jamshepdpur"
    },
    {
        name: "Dhanbad",
        image: "/picture/dhanbad/181a232d-83fc-41c3-b4f8-715364c3b4ae.jpg",
        description: [
            "Coal capital of India famous for its mines and vibrant city life.",
            "Unique blend of industry and nature with mining heritage."
        ],
        link: "/places/dhanbad",
        category: "city",
        tags: ["coal", "mining", "industry", "heritage"],
        pictureFolder: "dhanbad"
    },
    {
        name: "Deoghar",
        image: "/picture/deoghar/0463d334-9bce-498b-b73d-0128ba050146.jpg",
        description: [
            "Major Hindu pilgrimage site known for Baidyanath Temple.",
            "Sacred destination with serene surroundings and spiritual significance."
        ],
        link: "/places/deoghar",
        category: "religious",
        tags: ["pilgrimage", "temple", "spiritual", "sacred"],
        pictureFolder: "deoghar"
    },
    {
        name: "Betla National Park",
        image: "/picture/Bella National Park/08bdd6f4-f505-48cc-b3a9-4b2e69610081.jpg",
        description: [
            "Premier wildlife sanctuary home to tigers, elephants, and diverse fauna.",
            "Popular destination for wildlife safaris and nature photography."
        ],
        link: "/places/betla-national-park",
        category: "wildlife",
        tags: ["tigers", "elephants", "safari", "wildlife", "photography"],
        pictureFolder: "Bella National Park"
    },
    {
        name: "Palamau Tiger Reserve",
        image: "/picture/PalmaerTigerReserve/2fcfe806-ecbe-4b1d-a856-39c97d6dadca.jpg",
        description: [
            "First tiger reserve in India with rich biodiversity and scenic beauty.",
            "Home to tigers, leopards, and various species of birds and animals."
        ],
        link: "/places/palamau-tiger-reserve",
        category: "wildlife",
        tags: ["tiger reserve", "biodiversity", "leopards", "birds"],
        pictureFolder: "PalmaerTigerReserve"
    },
    {
        name: "Hazaribagh",
        image: "/picture/Hazaribagh/0317bb7e-8357-43cf-a2a5-49d3337c4fa1.jpg",
        description: [
            "Hill station known for its pleasant climate and natural beauty.",
            "Famous for Hazaribagh Wildlife Sanctuary and scenic landscapes."
        ],
        link: "/places/hazaribagh",
        category: "hill station",
        tags: ["hill station", "climate", "wildlife sanctuary", "scenic"],
        pictureFolder: "Hazaribagh"
    },
    {
        name: "Dassam Falls",
        image: "/picture/Dassamfall/063350c3-8c91-474e-8da8-7114e56e4b73.jpg",
        description: [
            "Spectacular waterfall cascading from 144 feet height.",
            "Popular picnic spot surrounded by lush green forests."
        ],
        link: "/places/dassam-falls",
        category: "waterfall",
        tags: ["waterfall", "picnic", "forests", "nature"],
        pictureFolder: "Dassamfall"
    },
    {
        name: "Hundru Falls",
        image: "/picture/Hundrufall/0690e723-a84d-401e-997e-e09dadaf57d4.jpg",
        description: [
            "Magnificent waterfall dropping from 320 feet creating rainbow effects.",
            "One of the highest waterfalls in Jharkhand with breathtaking views."
        ],
        link: "/places/hundru-falls",
        category: "waterfall",
        tags: ["waterfall", "rainbow", "highest", "views"],
        pictureFolder: "Hundrufall"
    },
    {
        name: "Jonha Falls",
        image: "/picture/Jonha fall/4263a237-b1f0-4a10-8a3c-fbdaa6a3166b.jpg",
        description: [
            "Beautiful waterfall also known as Gautamdhara with mythological significance.",
            "Serene location perfect for meditation and spiritual retreats."
        ],
        link: "/places/jonha-falls",
        category: "waterfall",
        tags: ["waterfall", "mythological", "meditation", "spiritual"],
        pictureFolder: "Jonha fall"
    },
    {
        name: "Netarhat",
        image: "/picture/Netarhat/269bad5f-754e-4f55-bcab-111f0bd3262b.jpg",
        description: [
            "Queen of Chotanagpur known for stunning sunrise and sunset views.",
            "Popular hill station with pleasant weather year-round."
        ],
        link: "/places/netarhat",
        category: "hill station",
        tags: ["queen of chotanagpur", "sunrise", "sunset", "hill station"],
        pictureFolder: "Netarhat"
    },
    {
        name: "Parasnath Hill",
        image: "/picture/parasnath/6h8j0f2i-5i3e-8h1f-g6j9-e2i5h7f0g3j6.jpg",
        description: [
            "Highest peak in Jharkhand and sacred Jain pilgrimage site.",
            "Challenging trek with panoramic views from the summit."
        ],
        link: "/places/parasnath-hill",
        category: "religious",
        tags: ["highest peak", "jain", "pilgrimage", "trek", "summit"],
        pictureFolder: "parasnath"
    },
    {
        name: "McCluskieganj",
        image: "/places/mc.jpeg",
        description: [
            "Historic Anglo-Indian settlement with colonial architecture.",
            "Unique cultural heritage and peaceful countryside atmosphere."
        ],
        link: "/places/mccluskieganj",
        category: "heritage",
        tags: ["anglo-indian", "colonial", "heritage", "countryside"]
    },
    {
        name: "Rajrappa Temple",
        image: "/picture/Rajrappa temple/008f4b70-358f-41a8-9ae3-bba91eb8ba3e.jpg",
        description: [
            "Famous temple dedicated to Goddess Chhinnamasta at river confluence.",
            "Significant religious site with unique tantric traditions."
        ],
        link: "/places/rajrappa-temple",
        category: "religious",
        tags: ["temple", "goddess", "confluence", "tantric"],
        pictureFolder: "Rajrappa temple"
    },
    {
        name: "Bokaro",
        image: "/picture/Bokaro/647700ab-6eac-404b-a52a-0979ab5f21ad.jpg",
        description: [
            "Steel city with modern infrastructure and beautiful parks.",
            "Known for Bokaro Steel Plant and well-planned urban development."
        ],
        link: "/places/bokaro",
        category: "city",
        tags: ["steel city", "infrastructure", "parks", "urban"],
        pictureFolder: "Bokaro"
    },
    {
        name: "Giridih",
        image: "/picture/Giridih/39de15ea-43f2-4e83-b700-37e54933a5db.jpg",
        description: [
            "Historic town known for coal mines and natural beauty.",
            "Rich in mineral resources with scenic hill ranges."
        ],
        link: "/places/giridih",
        category: "city",
        tags: ["historic", "coal mines", "minerals", "hills"],
        pictureFolder: "Giridih"
    },
    {
        name: "Jamshedpur Zoological Park",
        image: "/places/zoo_j.jpeg",
        description: [
            "Well-maintained zoo with diverse collection of animals and birds.",
            "Popular family destination with educational programs."
        ],
        link: "/places/jamshedpur-zoo",
        category: "wildlife",
        tags: ["zoo", "animals", "birds", "family", "education"]
    },
    {
        name: "Maithon Dam",
        image: "/picture/Maithon Dam/066e16f2-0b20-4699-86b5-b2a806728313.jpg",
        description: [
            "Large reservoir offering boating, fishing, and water sports.",
            "Scenic location perfect for picnics and weekend getaways."
        ],
        link: "/places/maithon-dam",
        category: "dam",
        tags: ["reservoir", "boating", "fishing", "water sports", "picnic"],
        pictureFolder: "Maithon Dam"
    },
    {
        name: "Dimna Lake",
        image: "/picture/Dinna lake/37055646-05e0-4124-bf78-e5c702b8ba34.jpg",
        description: [
            "Artificial lake surrounded by hills offering boat rides and recreation.",
            "Popular spot for adventure activities and water sports."
        ],
        link: "/places/dimna-lake",
        category: "lake",
        tags: ["artificial lake", "hills", "boat rides", "adventure", "water sports"],
        pictureFolder: "Dinna lake"
    },
    {
        name: "Lodh Falls",
        image: "/places/lodh.jpeg",
        description: [
            "Highest waterfall in Jharkhand dropping from 468 feet.",
            "Spectacular natural wonder surrounded by dense forests."
        ],
        link: "/places/lodh-falls",
        category: "waterfall",
        tags: ["highest waterfall", "natural wonder", "dense forests"]
    },
    {
        name: "Jubilee Park",
        image: "/ranc-img.jpeg",
        description: [
            "Beautiful urban park in Jamshedpur with zoo and recreational facilities.",
            "Perfect for family outings with boating and amusement rides."
        ],
        link: "/places/jubilee-park",
        category: "park",
        tags: ["urban park", "zoo", "recreational", "family", "boating"]
    },
    {
        name: "Birsa Zoological Park",
        image: "/jamshedpur.jpeg",
        description: [
            "Modern zoo in Ranchi with diverse wildlife and conservation programs.",
            "Educational destination promoting wildlife awareness."
        ],
        link: "/places/birsa-zoo",
        category: "wildlife",
        tags: ["modern zoo", "wildlife", "conservation", "education"]
    },
    {
        name: "Ghatshila",
        image: "/dhanbad.jpeg",
        description: [
            "Scenic hill town on Subarnarekha river known for natural beauty.",
            "Popular for rock climbing, trekking, and river activities."
        ],
        link: "/places/ghatshila",
        category: "hill station",
        tags: ["hill town", "subarnarekha", "rock climbing", "trekking"]
    },
    {
        name: "Usri Falls",
        image: "/deoghar.jpeg",
        description: [
            "Beautiful waterfall near Giridih known for its scenic beauty.",
            "Popular picnic spot with natural pools for swimming."
        ],
        link: "/places/usri-falls",
        category: "waterfall",
        tags: ["waterfall", "scenic", "picnic", "swimming"]
    },
    {
        name: "Dalma Wildlife Sanctuary",
        image: "/ranc-img.jpeg",
        description: [
            "Protected area known for elephant migration and diverse wildlife.",
            "Excellent for wildlife photography and nature walks."
        ],
        link: "/places/dalma-sanctuary",
        category: "wildlife",
        tags: ["sanctuary", "elephant migration", "photography", "nature walks"]
    },
    {
        name: "Kanke Dam",
        image: "/jamshedpur.jpeg",
        description: [
            "Peaceful reservoir near Ranchi perfect for relaxation and fishing.",
            "Scenic spot with hills and greenery ideal for picnics."
        ],
        link: "/places/kanke-dam",
        category: "dam",
        tags: ["reservoir", "relaxation", "fishing", "hills", "picnic"]
    },
    {
        name: "Dumka",
        image: "/dhanbad.jpeg",
        description: [
            "Cultural center of Santhal Pargana with rich tribal heritage.",
            "Known for traditional crafts, music, and cultural festivals."
        ],
        link: "/places/dumka",
        category: "cultural",
        tags: ["santhal pargana", "tribal heritage", "crafts", "music", "festivals"]
    },
    {
        name: "Maluti Temples",
        image: "/deoghar.jpeg",
        description: [
            "Ancient temple complex with 108 terracotta temples.",
            "Archaeological marvel showcasing exquisite craftsmanship."
        ],
        link: "/places/maluti-temples",
        category: "heritage",
        tags: ["ancient temples", "terracotta", "archaeological", "craftsmanship"]
    },
    {
        name: "Topchanchi Lake",
        image: "/ranc-img.jpeg",
        description: [
            "Serene lake near Dhanbad offering boating and water activities.",
            "Popular weekend destination with scenic surroundings."
        ],
        link: "/places/topchanchi-lake",
        category: "lake",
        tags: ["serene lake", "boating", "water activities", "weekend"]
    },
    {
        name: "Mayurbhanj Palace",
        image: "/jamshedpur.jpeg",
        description: [
            "Historic palace showcasing royal architecture and heritage.",
            "Beautiful example of princely state architecture."
        ],
        link: "/places/mayurbhanj-palace",
        category: "heritage",
        tags: ["historic palace", "royal", "architecture", "princely state"]
    },
    {
        name: "Tata Steel Zoological Park",
        image: "/dhanbad.jpeg",
        description: [
            "Well-maintained zoo with rare species and conservation efforts.",
            "Educational center promoting wildlife conservation awareness."
        ],
        link: "/places/tata-steel-zoo",
        category: "wildlife",
        tags: ["zoo", "rare species", "conservation", "education"]
    },
    {
        name: "Jagannath Temple Ranchi",
        image: "/deoghar.jpeg",
        description: [
            "Beautiful temple dedicated to Lord Jagannath with spiritual significance.",
            "Important pilgrimage site with traditional architecture."
        ],
        link: "/places/jagannath-temple",
        category: "religious",
        tags: ["temple", "jagannath", "spiritual", "pilgrimage", "architecture"]
    },
    {
        name: "Rock Garden Ranchi",
        image: "/picture/RockGardenRanchi/OIP (1).webp",
        description: [
            "Unique garden created among natural rock formations.",
            "Popular spot for photography and evening walks."
        ],
        link: "/places/rock-garden",
        category: "park",
        tags: ["rock garden", "rock formations", "photography", "walks"],
        pictureFolder: "RockGardenRanchi"
    },
    {
        name: "Hirni Falls",
        image: "/jamshedpur.jpeg",
        description: [
            "Picturesque waterfall surrounded by dense forests and wildlife.",
            "Ideal for nature lovers and adventure enthusiasts."
        ],
        link: "/places/hirni-falls",
        category: "waterfall",
        tags: ["picturesque", "dense forests", "wildlife", "adventure"]
    },
    {
        name: "Sun Temple Ranchi",
        image: "/dhanbad.jpeg",
        description: [
            "Modern temple dedicated to Sun God with unique architecture.",
            "Beautiful spiritual destination with cultural significance."
        ],
        link: "/places/sun-temple",
        category: "religious",
        tags: ["sun temple", "modern", "architecture", "spiritual"]
    },
    {
        name: "Panch Gagh Falls",
        image: "/deoghar.jpeg",
        description: [
            "Five separate waterfalls creating a magnificent natural spectacle.",
            "Popular trekking destination with challenging trails."
        ],
        link: "/places/panch-gagh-falls",
        category: "waterfall",
        tags: ["five waterfalls", "natural spectacle", "trekking", "trails"]
    },
    {
        name: "Ranchi Lake",
        image: "/ranc-img.jpeg",
        description: [
            "Artificial lake in the heart of Ranchi city offering boat rides.",
            "Popular urban recreational spot with surrounding gardens."
        ],
        link: "/places/ranchi-lake",
        category: "lake",
        tags: ["artificial lake", "city", "boat rides", "urban", "gardens"]
    },
    {
        name: "Massanjore Dam",
        image: "/jamshedpur.jpeg",
        description: [
            "Large dam with scenic beauty and recreational facilities.",
            "Perfect for fishing, boating, and family picnics."
        ],
        link: "/places/massanjore-dam",
        category: "dam",
        tags: ["large dam", "scenic", "fishing", "boating", "family"]
    },
    {
        name: "Khandoli Park",
        image: "/dhanbad.jpeg",
        description: [
            "Beautiful park near waterfalls with natural swimming pools.",
            "Ideal location for camping and outdoor activities."
        ],
        link: "/places/khandoli-park",
        category: "park",
        tags: ["park", "waterfalls", "swimming pools", "camping", "outdoor"]
    },
    {
        name: "Getalsud Dam",
        image: "/deoghar.jpeg",
        description: [
            "Scenic dam with beautiful reservoir and surrounding hills.",
            "Popular spot for photography and peaceful retreats."
        ],
        link: "/places/getalsud-dam",
        category: "dam",
        tags: ["scenic dam", "reservoir", "hills", "photography", "peaceful"]
    },
    {
        name: "Sidhoo Kanho Park",
        image: "/ranc-img.jpeg",
        description: [
            "Memorial park dedicated to tribal freedom fighters.",
            "Cultural significance with beautiful landscaping and monuments."
        ],
        link: "/places/sidhoo-kanho-park",
        category: "cultural",
        tags: ["memorial park", "tribal", "freedom fighters", "cultural", "monuments"]
    },
    {
        name: "Tilaiya Dam",
        image: "/jamshedpur.jpeg",
        description: [
            "Multi-purpose dam offering scenic views and water sports.",
            "Popular destination for weekend trips and adventure activities."
        ],
        link: "/places/tilaiya-dam",
        category: "dam",
        tags: ["multi-purpose", "scenic views", "water sports", "weekend", "adventure"]
    },
    {
        name: "Tapkeshwar Temple",
        image: "/dhanbad.jpeg",
        description: [
            "Sacred cave temple dedicated to Lord Shiva with natural formations.",
            "Spiritual destination with unique geological features."
        ],
        link: "/places/tapkeshwar-temple",
        category: "religious",
        tags: ["cave temple", "shiva", "natural formations", "spiritual", "geological"]
    },
    {
        name: "Birsa Munda Museum",
        image: "/deoghar.jpeg",
        description: [
            "Museum dedicated to tribal hero Birsa Munda and tribal culture.",
            "Educational center showcasing tribal heritage and history."
        ],
        link: "/places/birsa-munda-museum",
        category: "cultural",
        tags: ["museum", "birsa munda", "tribal hero", "culture", "heritage"]
    },
    {
        name: "Panchet Dam",
        image: "/ranc-img.jpeg",
        description: [
            "Large reservoir with excellent fishing and boating opportunities.",
            "Scenic location perfect for nature lovers and photographers."
        ],
        link: "/places/panchet-dam",
        category: "dam",
        tags: ["large reservoir", "fishing", "boating", "nature", "photographers"]
    },
    {
        name: "Phusro",
        image: "/jamshedpur.jpeg",
        description: [
            "Coal mining town with industrial heritage and natural beauty.",
            "Unique blend of mining history and scenic landscapes."
        ],
        link: "/places/phusro",
        category: "heritage",
        tags: ["coal mining", "industrial heritage", "natural beauty", "mining history"]
    },
    {
        name: "Satsang Ashram",
        image: "/dhanbad.jpeg",
        description: [
            "Peaceful spiritual retreat center with meditation facilities.",
            "Serene environment perfect for spiritual seekers and yoga practitioners."
        ],
        link: "/places/satsang-ashram",
        category: "spiritual",
        tags: ["spiritual retreat", "meditation", "serene", "yoga", "peaceful"]
    },
    {
        name: "Tagore Hill",
        image: "/deoghar.jpeg",
        description: [
            "Historic hill where Rabindranath Tagore spent time writing.",
            "Cultural landmark with panoramic views and literary significance."
        ],
        link: "/places/tagore-hill",
        category: "cultural",
        tags: ["historic hill", "tagore", "literary", "panoramic views", "cultural"]
    },
    {
        name: "Itkhori",
        image: "/ranc-img.jpeg",
        description: [
            "Ancient town with historical temples and archaeological sites.",
            "Rich in history with beautiful stone carvings and sculptures."
        ],
        link: "/places/itkhori",
        category: "heritage",
        tags: ["ancient town", "temples", "archaeological", "stone carvings", "sculptures"]
    },
    {
        name: "Tenughat Dam",
        image: "/jamshedpur.jpeg",
        description: [
            "Beautiful dam with scenic surroundings and recreational activities.",
            "Popular spot for fishing, boating, and family outings."
        ],
        link: "/places/tenughat-dam",
        category: "dam",
        tags: ["beautiful dam", "scenic", "recreational", "fishing", "family outings"]
    }
];

export default function Places() {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState(PLACES);

    // Simulate initial page loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    // 2. Filter places when search changes - Enhanced search functionality
    useEffect(() => {
        const q = search.trim().toLowerCase();
        if (!q) {
            setFiltered(PLACES);
        } else {
            setFiltered(
                PLACES.filter(
                    place =>
                        // Search in name
                        place.name.toLowerCase().includes(q) ||
                        // Search in description
                        place.description.some(d => d.toLowerCase().includes(q)) ||
                        // Search in category
                        place.category.toLowerCase().includes(q) ||
                        // Search in tags
                        place.tags.some(tag => tag.toLowerCase().includes(q))
                )
            );
        }
    }, [search]);

    if (isLoading) {
        return (
            <>
                <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden -mx-4 md:-mx-8 lg:-mx-12">
                    {/* Hero Section Skeleton */}
                    <div className="relative w-screen h-[300px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0">
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                    <div className="relative z-10 w-full h-[300px] flex flex-col justify-center items-center text-center px-6 -mt-[300px]">
                        <Skeleton className="h-16 w-2/3 mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 mx-auto" />
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-20">
                        <div className="max-w-7xl mx-auto">
                            {/* UserTabs skeleton */}
                            <div className="flex justify-center mb-8">
                                <div className="flex gap-4">
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton key={index} className="h-12 w-24 rounded-lg" />
                                    ))}
                                </div>
                            </div>

                            {/* Search skeleton */}
                            <div className="glass-morphism rounded-3xl p-8 mb-8">
                                <div className="flex justify-center">
                                    <Skeleton className="h-12 w-full max-w-2xl rounded-full" />
                                </div>
                            </div>

                            {/* Cards skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="glass-morphism rounded-2xl overflow-hidden card-hover-effect">
                                        <Skeleton className="h-48 w-full" />
                                        <div className="p-6">
                                            <Skeleton className="h-6 w-3/4 mb-4" />
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-2/3 mb-4" />
                                            <Skeleton className="h-10 w-32 rounded-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
                {/* Hero Section with Gradient Background */}
                <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[300px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0">
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative z-10 w-full h-[200px] sm:h-[250px] lg:h-[300px] flex flex-col justify-center items-center text-center px-4 sm:px-6 -mt-[200px] sm:-mt-[250px] lg:-mt-[300px]">
                    <div className="animate-fade-in-up">
                        <h1 className={`${noto.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white`}>
                            Explore Jharkhand
                        </h1>
                        <p className={`${libertinus.className} text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto px-4`}>
                            Discover 50+ amazing destinations across the Land of Forests
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                    <div className="max-w-7xl mx-auto">
                        {/* UserTabs */}
                        <div className="flex justify-center mt-8 mb-8 sm:mb-12 animate-fade-in-up animation-delay-200">
                            <UserTabs />
                        </div>

                        {/* Search Section */}
                        <div className="glass-morphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 card-hover-effect animate-fade-in-up animation-delay-300">
                            <form
                                className="flex justify-center"
                                onSubmit={e => e.preventDefault()}
                            >
                                <div className="relative w-full max-w-2xl">
                                    <input
                                        type="text"
                                        placeholder="Search places by name, category, or keywords..."
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm text-sm sm:text-base"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors">
                                        <CiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </form>
                            
                            {/* Search Results Count */}
                            <div className="text-center mt-3 sm:mt-4">
                                <p className="text-gray-300 text-sm sm:text-base">
                                    {search.trim() ? (
                                        <span>
                                            Found <span className="font-bold text-emerald-400">{filtered.length}</span> places
                                            {search.trim() && (
                                                <span className="text-gray-400"> for &quot;{search.trim()}&quot;</span>
                                            )}
                                        </span>
                                    ) : (
                                        <span>Showing all <span className="font-bold text-emerald-400">{PLACES.length}</span> places</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        
                        {/* Places Grid */}
                        <div className="animate-fade-in-up animation-delay-400">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                {filtered.length === 0 ? (
                                    <div className="col-span-full text-center text-gray-400 py-12 sm:py-16 lg:py-20">
                                        <div className="flex flex-col items-center glass-morphism rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-md mx-auto">
                                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🔍</div>
                                            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">No places found</h3>
                                            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                                Try searching with different keywords like:
                                            </p>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {["waterfall", "temple", "wildlife", "heritage", "dam", "hill station"].map((keyword) => (
                                                    <button
                                                        key={keyword}
                                                        onClick={() => setSearch(keyword)}
                                                        className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs sm:text-sm hover:bg-emerald-500/30 transition-colors"
                                                    >
                                                        {keyword}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    filtered.map((place, idx) => (
                                        <div
                                            key={place.name + idx}
                                            className="glass-morphism rounded-xl sm:rounded-2xl overflow-hidden card-hover-effect group flex flex-col"
                                        >
                                            {/* Image */}
                                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                                <Image
                                                    src={place.image}
                                                    alt={place.name}
                                                    width={400}
                                                    height={200}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                
                                                {/* Category Badge */}
                                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                                    <span className="px-2 sm:px-3 py-1 bg-emerald-500/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                                                        {place.category.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                                <h3 className={`${noto.className} text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors`}>
                                                    {place.name}
                                                </h3>
                                                
                                                <div className="text-gray-300 mb-3 sm:mb-4 space-y-1 sm:space-y-2">
                                                    {place.description.map((line, i) => (
                                                        <p key={i} className="text-xs sm:text-sm leading-relaxed">{line}</p>
                                                    ))}
                                                </div>
                                                
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                                    {place.tags.slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {place.tags.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                                                            +{place.tags.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Action Button at the bottom */}
                                                <div className="mt-auto flex justify-center">
                                                    <Button asChild className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg btn-modern transition-all duration-300 group-hover:scale-105 text-sm sm:text-base">
                                                        <Link href={`/places/${place.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                                            Explore Now
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-400/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </section>

        </>
    );
}