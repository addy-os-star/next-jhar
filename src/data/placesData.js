// Website data extraction utility for the AI chatbot
// This file contains comprehensive Jharkhand tourism data extracted from the website

export const COMPREHENSIVE_PLACES_DATA = [
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
        pictureFolder: "Rachi",
        // Enhanced data for AI responses
        climate: "Pleasant year-round with moderate temperatures. Best weather from October to March.",
        attractions: ["Rock Garden", "Pahari Mandir", "Tagore Hill", "Kanke Dam", "Ranchi Lake", "Sun Temple"],
        activities: ["Cycling tours", "Waterfall visits", "Trekking", "Photography", "Boating", "Temple visits"],
        bestTime: "October to March",
        duration: "2-3 days",
        budgetRange: "₹1,500 - ₹4,000",
        accommodation: {
            budget: "₹800-2000 per night - Guest houses, budget hotels",
            midRange: "₹2000-4000 per night - 3-star hotels, business hotels",
            luxury: "₹4000+ per night - Premium hotels, resorts"
        },
        transport: {
            local: "City buses (₹10-20), Auto-rickshaws (₹50-100), Taxis (₹200-500)",
            reaching: "Ranchi Airport (8km), Railway Station, NH33 highway connectivity"
        },
        food: {
            street: "₹50-150 per meal - Local street food, chaat, litti chokha",
            restaurant: "₹200-800 per meal - Multi-cuisine restaurants, cafes",
            specialty: "Thekua, Rugra, local fish curry, tribal cuisines"
        },
        nearbyPlaces: ["Hundru Falls (45km)", "Jonha Falls (40km)", "Netarhat (150km)"],
        travelTips: [
            "Rent a bicycle to explore the city's waterfall circuit",
            "Visit Rock Garden early morning for best photography",
            "Try local street food at Main Road and Firayalal Chowk"
        ]
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
        pictureFolder: "Jamshepdpur",
        climate: "Moderate climate with pleasant winters. Summer can be hot (35-42°C).",
        attractions: ["Jubilee Park", "Dimna Lake", "Tata Steel Plant", "Dalma Wildlife Sanctuary", "Bhuvaneshwari Temple"],
        activities: ["Boating", "Industrial tours", "Wildlife safari", "Park visits", "Lake activities", "Shopping"],
        bestTime: "November to February",
        duration: "2-3 days",
        budgetRange: "₹2,000 - ₹5,000",
        accommodation: {
            budget: "₹1000-2500 per night - Budget hotels, lodges",
            midRange: "₹2500-5000 per night - 3-4 star hotels",
            luxury: "₹5000+ per night - Premium hotels, corporate stays"
        },
        transport: {
            local: "City buses (₹15-25), Auto-rickshaws (₹60-120), Taxis (₹250-600)",
            reaching: "Tatanagar Railway Station, well connected by road to major cities"
        },
        food: {
            street: "₹80-200 per meal - Street food, local eateries",
            restaurant: "₹300-1000 per meal - Multi-cuisine, fine dining",
            specialty: "Bengali cuisine, local sweets, Tata Steel canteen food"
        },
        nearbyPlaces: ["Dalma Wildlife Sanctuary (10km)", "Dimna Lake (13km)", "Chandil Dam (40km)"],
        travelTips: [
            "Book Tata Steel plant tour in advance",
            "Best boating experience at Dimna Lake during sunset",
            "Jubilee Park has zoo and rose garden - plan full day"
        ]
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
        pictureFolder: "Bella National Park",
        climate: "Tropical climate. Dry winters (Nov-Apr) ideal for wildlife viewing.",
        attractions: ["Tiger Safari", "Elephant Safari", "Watchtowers", "Forest Rest Houses", "Palamau Fort"],
        activities: ["Wildlife safari", "Bird watching", "Photography", "Nature walks", "Elephant rides"],
        bestTime: "November to April",
        duration: "2-3 days",
        budgetRange: "₹5,000 - ₹15,000",
        accommodation: {
            budget: "₹2000-4000 per night - Forest rest houses, basic lodges",
            midRange: "₹4000-8000 per night - Eco-resorts, nature camps",
            luxury: "₹8000-15000 per night - Luxury wildlife resorts"
        },
        transport: {
            local: "Jeep safari (₹1500-3000 per safari), Elephant rides (₹500-1000)",
            reaching: "Daltonganj railway station (25km), road connectivity from Ranchi (170km)"
        },
        food: {
            park: "₹150-300 per meal - Park canteens, basic meals",
            resort: "₹500-1200 per meal - Resort dining, buffet meals",
            specialty: "Simple vegetarian meals, local tribal cuisine"
        },
        nearbyPlaces: ["Palamau Fort (5km)", "Kamaldah Lake (15km)", "Netarhat (50km)"],
        travelTips: [
            "Book safari permits 2-3 days in advance",
            "Carry binoculars and zoom lens for wildlife photography",
            "Morning safari (6-11 AM) has better animal sighting chances"
        ],
        safariTimings: {
            morning: "6:00 AM - 11:00 AM",
            evening: "3:00 PM - 6:00 PM",
            closed: "Monsoon season (July-September) safaris may be suspended"
        },
        wildlife: ["Tigers", "Elephants", "Leopards", "Sloth Bears", "Wild Boars", "Deer species", "180+ bird species"]
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
        pictureFolder: "Netarhat",
        climate: "Cool and pleasant year-round. Temperature: 15-25°C. Ideal hill station climate.",
        attractions: ["Sunrise Point", "Sunset Point", "Netarhat Dam", "Upper Ghaghri Falls", "Lower Ghaghri Falls"],
        activities: ["Sunrise viewing", "Sunset viewing", "Trekking", "Photography", "Nature walks", "Waterfall visits"],
        bestTime: "Year-round destination, peak season October to March",
        duration: "2-3 days",
        budgetRange: "₹3,000 - ₹8,000",
        accommodation: {
            budget: "₹1500-3000 per night - Tourist lodge, government guest house",
            midRange: "₹3000-6000 per night - Private hotels, resorts",
            luxury: "₹6000+ per night - Premium hill resorts"
        },
        transport: {
            local: "Local taxis (₹500-1500 for sightseeing), walking trails",
            reaching: "Ranchi (156km) via road, nearest railway at Latehar (65km)"
        },
        food: {
            local: "₹100-250 per meal - Local dhabas, simple meals",
            hotel: "₹300-700 per meal - Hotel dining, multi-cuisine",
            specialty: "Hill station specialties, Maggi point, local tea"
        },
        nearbyPlaces: ["Upper Ghaghri Falls (8km)", "Lower Ghaghri Falls (10km)", "Betla National Park (50km)"],
        travelTips: [
            "Wake up early for spectacular sunrise at Sunrise Point",
            "Carry warm clothes as evenings can be cool",
            "Book accommodation in advance during peak season"
        ],
        viewingPoints: {
            sunrise: "Best viewing from 5:30-6:30 AM at designated sunrise point",
            sunset: "Perfect sunset views from 5:30-6:30 PM at sunset point",
            photography: "Golden hour provides best lighting for landscape photography"
        }
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
        pictureFolder: "deoghar",
        climate: "Tropical climate. Hot summers, pleasant winters. Monsoon brings heavy rainfall.",
        attractions: ["Baidyanath Temple", "Naulakha Mandir", "Trikuta Parvat", "Basukinath Temple", "Tapovan"],
        activities: ["Temple visits", "Spiritual retreats", "Ropeway rides", "Local shopping", "Prayer ceremonies"],
        bestTime: "October to March, avoid monsoon season",
        duration: "1-2 days",
        budgetRange: "₹1,000 - ₹3,000",
        accommodation: {
            budget: "₹200-800 per night - Dharamshalas, pilgrim lodges",
            midRange: "₹1000-2500 per night - Hotels, guest houses",
            luxury: "₹2500+ per night - Premium hotels (limited options)"
        },
        transport: {
            local: "Cycle rickshaws (₹30-80), auto-rickshaws (₹50-150), walking",
            reaching: "Jasidih railway station (7km), well connected by road"
        },
        food: {
            temple: "Free prasad at temples, community kitchens",
            local: "₹50-150 per meal - Simple vegetarian meals, local eateries",
            restaurant: "₹150-400 per meal - Pure vegetarian restaurants"
        },
        nearbyPlaces: ["Basukinath Temple (42km)", "Tapovan (10km)", "Trikuta Parvat (25km)"],
        travelTips: [
            "Dress modestly and remove shoes before entering temples",
            "Visit early morning (4-7 AM) to avoid crowds",
            "Carry water and stay hydrated during temple visits"
        ],
        religiousInfo: {
            significance: "One of 12 Jyotirlingas, major Shiva pilgrimage site",
            festivals: "Shravan month (July-August) sees massive pilgrim influx",
            rituals: "Early morning aarti at 4 AM, evening aarti at 6 PM",
            dress: "Conservative dress required, no leather items allowed"
        }
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
        pictureFolder: "Hundrufall",
        climate: "Pleasant climate, best during and after monsoon for maximum water flow.",
        attractions: ["320-feet waterfall", "Rainbow formation", "Rocky terrain", "Natural pools", "Viewpoints"],
        activities: ["Photography", "Nature walks", "Picnicking", "Swimming in pools", "Rock climbing"],
        bestTime: "July to February for best water flow",
        duration: "Half day to full day",
        budgetRange: "₹500 - ₹1,500",
        accommodation: {
            nearby: "Stay in Ranchi (45km) - all budget ranges available",
            dayTrip: "Perfect for day trips from Ranchi",
            camping: "Limited camping options with permission"
        },
        transport: {
            reaching: "45km from Ranchi, private vehicle recommended",
            local: "₹15-20 parking fee, 10-minute walk to falls",
            route: "Ranchi → Purulia Road → Hundru Falls (well signposted)"
        },
        food: {
            local: "₹50-150 - Small food stalls near parking",
            packed: "Recommended to carry packed lunch and water",
            nearby: "Restaurant options available on Ranchi-Purulia highway"
        },
        nearbyPlaces: ["Jonha Falls (20km)", "Dassam Falls (40km)", "Ranchi city (45km)"],
        travelTips: [
            "Visit during morning hours for best lighting and rainbow views",
            "Wear comfortable shoes for rocky terrain",
            "Carry water and light snacks as limited options available",
            "Best photography during monsoon and post-monsoon"
        ],
        safetyInfo: {
            swimming: "Swimming allowed in designated natural pools only",
            monsoon: "Extra caution during monsoon due to slippery rocks",
            timing: "Visit between 6 AM - 6 PM for safety",
            guide: "Local guides available for ₹200-500"
        }
    }
];

// Weather and seasonal information
export const SEASONAL_INFO = {
    winter: {
        months: "October to February",
        temperature: "15-25°C",
        description: "Perfect tourism weather with clear skies and pleasant temperatures",
        activities: ["All outdoor activities", "Wildlife safaris", "Trekking", "Sightseeing"],
        clothing: "Light woollens for evenings, cotton clothes for day",
        rainfall: "Minimal rainfall"
    },
    summer: {
        months: "March to June", 
        temperature: "25-42°C",
        description: "Hot weather, but hill stations remain pleasant",
        activities: ["Hill station visits", "Early morning activities", "Indoor sightseeing"],
        clothing: "Cotton clothes, sun protection, hats",
        rainfall: "Occasional pre-monsoon showers"
    },
    monsoon: {
        months: "July to September",
        temperature: "22-32°C",
        description: "Heavy rainfall, lush green landscapes, waterfalls at peak flow",
        activities: ["Waterfall visits", "Photography", "Limited outdoor activities"],
        clothing: "Rainwear, waterproof footwear",
        rainfall: "Heavy - 1200-1500mm annually"
    }
};

// Transportation and connectivity information
export const TRANSPORT_INFO = {
    airways: {
        main: "Birsa Munda Airport, Ranchi - Main gateway to Jharkhand",
        connectivity: "Connected to Delhi, Mumbai, Kolkata, Bangalore, Chennai",
        domestic: "Regular flights by IndiGo, Air India, SpiceJet"
    },
    railways: {
        major: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
        connectivity: "Well connected to all major Indian cities",
        passes: "Jharkhand lies on important railway routes"
    },
    roadways: {
        highways: ["NH 33", "NH 2", "NH 32", "NH 19"],
        connectivity: "Excellent road connectivity to neighboring states",
        buses: "State transport and private buses available"
    }
};

// Cultural and food information
export const CULTURAL_INFO = {
    languages: ["Hindi (Official)", "Santhali", "Mundari", "Ho", "Kharia", "Kurmali"],
    festivals: [
        "Sarhul (Spring festival)",
        "Karma (Harvest festival)", 
        "Sohrai (Cattle festival)",
        "Tusu (Folk festival)",
        "Durga Puja",
        "Kali Puja"
    ],
    food: {
        staple: "Rice, dal, vegetables",
        traditional: ["Litti Chokha", "Thekua", "Rugra", "Handia", "Pittha"],
        tribal: ["Dhuska", "Chirka Roti", "Bamboo shoot curry"],
        sweets: ["Tilkut", "Anarsa", "Khaja", "Malpua"]
    },
    crafts: ["Dokra metal craft", "Sohrai paintings", "Bamboo and cane work", "Tribal jewelry"]
};

// Budget planning templates
export const BUDGET_TEMPLATES = {
    budget: {
        range: "₹1,000 - ₹3,000",
        accommodation: "₹500-1000 per night",
        food: "₹200-400 per day",
        transport: "₹300-800 per day",
        activities: "₹200-500 per day",
        tips: [
            "Stay in dharamshalas or budget hotels",
            "Eat at local dhabas and street food",
            "Use public transport or shared taxis",
            "Visit free attractions like temples and gardens"
        ]
    },
    moderate: {
        range: "₹3,000 - ₹8,000", 
        accommodation: "₹1500-4000 per night",
        food: "₹500-1200 per day",
        transport: "₹800-2000 per day", 
        activities: "₹500-1500 per day",
        tips: [
            "Stay in 3-star hotels or good guest houses",
            "Mix of restaurant and local food",
            "Private transport for longer distances",
            "Include some paid activities and safaris"
        ]
    },
    luxury: {
        range: "₹8,000 - ₹20,000+",
        accommodation: "₹4000-12000+ per night",
        food: "₹1200-3000+ per day",
        transport: "₹2000-5000+ per day",
        activities: "₹1500-5000+ per day", 
        tips: [
            "Luxury hotels and resorts",
            "Fine dining and specialty restaurants",
            "Private cars with drivers",
            "Premium safaris and guided tours"
        ]
    }
};