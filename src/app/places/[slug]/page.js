"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Play, 
    Pause, 
    Volume2, 
    VolumeX, 
    MapPin, 
    Calendar, 
    Star,
    ArrowLeft,
    Eye,
    Camera,
    Navigation,
    Heart,
    Share2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    X,
    RotateCw
} from "lucide-react";
import { getPlaceImages, getPlacePictureFolder } from "@/lib/imageUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import View360 from "@/components/ui/View360";
import VRView360 from "@/components/ui/VRView360";
import GoogleStreetViewVR from "@/components/ui/GoogleStreetViewVR";

const PLACES = [
    {
        name: "Ranchi",
        slug: "ranchi",
        image: "/picture/Rachi/36b11dc7-3c17-4210-a09f-c5c2a1ca87e6.jpg",
        description: [
            "Capital city known for its waterfalls and natural beauty",
            "Home to the famous Pahari Mandir and Hundru Falls"
        ],
        longDescription: [
            "Ranchi, the capital of Jharkhand, is surrounded by lush forests and waterfalls. The city features numerous attractions including Hundru Falls, Dassam Falls, and the iconic Pahari Mandir temple situated atop a hill. The Rock Garden and Tagore Hill are popular tourist spots, while the Tribal Research Institute provides insights into local tribal culture.",
            "The city offers a perfect blend of urban development and natural beauty. With its pleasant climate and rich cultural heritage, Ranchi serves as an ideal destination for both adventure seekers and spiritual travelers."
        ],
        audio: "/audio/ranchihill_e.mp3",
        view360: "/360/ranchi",
        category: "City",
        tags: ["Waterfalls", "Temples", "Nature", "Capital"],
        coordinates: { lat: 23.3441, lng: 85.3096 },
        bestTime: "October to March",
        duration: "2-3 days",
        highlights: ["Rock Garden", "Pahari Mandir", "Tagore Hill", "Kanke Dam"],
        pictureFolder: "Rock garden ranchi"
    },
    {
        name: "Deoghar",
        slug: "deoghar",
        image: "/picture/deoghar/0463d334-9bce-498b-b73d-0128ba050146.jpg",
        description: [
            "Sacred city home to Baidyanath Temple",
            "One of the twelve Jyotirlingas in India"
        ],
        longDescription: [
            "Deoghar, also known as Baidyanath Dham, is one of the holiest cities in India. The Baidyanath Temple complex houses one of the twelve Jyotirlingas. During the month of Shravan, thousands of devotees carry holy water from the Ganges to offer at the temple.",
            "The spiritual energy of Deoghar is palpable, with constant chanting and devotional activities throughout the year. The city's infrastructure has been developed to accommodate millions of pilgrims."
        ],
        audio: "/audio/deoghar.mp3",
        view360: "/360/deoghar",
        category: "Religious",
        tags: ["Temple", "Pilgrimage", "Spiritual", "Heritage"],
        coordinates: { lat: 24.4824, lng: 86.6906 },
        bestTime: "October to March",
        duration: "1-2 days",
        highlights: ["Baidyanath Temple", "Nandan Pahar", "Trikut Pahar", "Ropeway"],
        pictureFolder: "deoghar"
    },
    {
        name: "Jamshedpur",
        slug: "jamshedpur",
        image: "/picture/Jamshepdpur/3d46681c-e8cf-4d01-ae87-de2fe9cca9a8.jpg",
        description: [
            "India's first planned industrial city",
            "Known for its clean streets and industrial heritage"
        ],
        longDescription: [
            "Jamshedpur, also known as Tatanagar, is India's first planned industrial city. Founded by Jamsetji Tata, it's home to Tata Steel and other major industries. The city features Jubilee Park, Dimna Lake, and the Tata Steel Zoological Park.",
            "The city seamlessly blends industrial development with environmental consciousness. Its well-planned layout, excellent educational institutions, and recreational facilities make it a model industrial city."
        ],
        audio: "/audio/jamshedpur_e.mp3",
        view360: "/360/Jamshedpur",
        category: "Industrial_City",
        tags: ["Industrial", "Clean City", "Parks", "Lakes"],
        coordinates: { lat: 22.8046, lng: 86.2029 },
        bestTime: "November to February",
        duration: "2-3 days",
        highlights: ["Jubilee Park", "Dimna Lake", "Tata Steel Plant", "Zoological Park"],
        pictureFolder: "Jamshepdpur"
    },
    {
        name: "Dhanbad",
        slug: "dhanbad",
        image: "/picture/dhanbad/181a232d-83fc-41c3-b4f8-715364c3b4ae.jpg",
        description: [
            "Coal capital of India famous for mining heritage",
            "Unique blend of industry and natural beauty"
        ],
        longDescription: [
            "Dhanbad, known as the Coal Capital of India, is a major mining city in Jharkhand. The city is famous for its vast coal reserves and the mining industry that drives its economy. Despite being an industrial hub, Dhanbad offers scenic beauty with its surrounding hills and forests.",
            "The city is home to some of India's most productive coal mines and has played a crucial role in the country's industrial development. Visitors can explore the mining heritage while enjoying the natural landscapes that surround the urban areas."
        ],
        audio: "/audio/dhanbad.mp3",
        view360: "/360/dhanbad",
        category: "City",
        tags: ["Mining", "Coal", "Industry", "Heritage"],
        coordinates: { lat: 23.7957, lng: 86.4304 },
        bestTime: "October to March",
        duration: "1-2 days",
        highlights: ["Coal Mines", "ISM Dhanbad", "Maithon Dam", "Topchanchi Lake"],
        pictureFolder: "dhanbad"
    },
    {
        name: "Netarhat",
        slug: "netarhat",
        image: "/picture/Netarhat/269bad5f-754e-4f55-bcab-111f0bd3262b.jpg",
        description: [
            "Queen of Chotanagpur plateau",
            "Famous for sunrise and sunset viewpoints"
        ],
        longDescription: [
            "Netarhat, known as the 'Queen of Chotanagpur', is a beautiful hill station located in the Latehar district of Jharkhand. At an elevation of 1,128 meters, it offers spectacular sunrise and sunset views that attract visitors from across the country.",
            "The hill station features dense forests, rolling hills, and a pleasant climate throughout the year. The Netarhat Residential School, established during the British era, adds to the historical significance of this charming destination."
        ],
        audio: "/audio/netarhat.mp3",
        view360: "/360/netarhat",
        category: "Hill_Station",
        tags: ["Hill Station", "Sunrise", "Sunset", "Queen of Chotanagpur"],
        coordinates: { lat: 23.4677, lng: 84.2549 },
        bestTime: "September to March",
        duration: "2-3 days",
        highlights: ["Sunrise Point", "Sunset Point", "Netarhat Dam", "Forest Trails"],
        pictureFolder: "Netarhat"
    },
    {
        name: "Hazaribagh",
        slug: "hazaribagh",
        image: "/picture/Hazaribagh/0317bb7e-8357-43cf-a2a5-49d3337c4fa1.jpg",
        description: [
            "Hill station with pleasant climate",
            "Famous for wildlife sanctuary and natural beauty"
        ],
        longDescription: [
            "Hazaribagh is a picturesque hill station known for its pleasant climate and natural beauty. The city is surrounded by dense forests and is home to the famous Hazaribagh Wildlife Sanctuary, which houses various species of flora and fauna.",
            "The town offers a perfect escape from the hustle and bustle of city life. With its serene lakes, rolling hills, and rich biodiversity, Hazaribagh provides excellent opportunities for nature lovers and wildlife enthusiasts."
        ],
        audio: "/audio/hazaribagh.mp3",
        view360: "/360/hazaribagh",
        category: "Hill_Station",
        tags: ["Hill Station", "Wildlife", "Nature", "Sanctuary"],
        coordinates: { lat: 23.9931, lng: 85.3594 },
        bestTime: "October to April",
        duration: "2-3 days",
        highlights: ["Wildlife Sanctuary", "Canary Hill", "Hazaribagh Lake", "Forest Trails"],
        pictureFolder: "Hazaribagh"
    },
    {
        name: "Dalma Wildlife Sanctuary",
        slug: "dalma-wildlife-sanctuary",
        image: "/picture_1/Dalma wildlife santury/0a385e82-5e2c-4f62-adbc-c744c8749395.jpg",
        description: [
            "Protected area known for elephant migration",
            "Rich biodiversity and scenic forest trails"
        ],
        longDescription: [
            "Dalma Wildlife Sanctuary is a prominent wildlife reserve in Jharkhand, famous for its elephant population and seasonal migration patterns. The sanctuary covers an area of 193 square kilometers and is home to diverse flora and fauna including elephants, leopards, sambars, and various bird species.",
            "The sanctuary offers excellent opportunities for wildlife viewing, nature photography, and forest trekking. The best time to visit is during the winter months when animals are more active and visible near water sources."
        ],
        audio: "/audio/dalma.mp3",
        view360: "/360/dalma",
        category: "Wildlife",
        tags: ["Wildlife", "Elephants", "Nature", "Photography"],
        coordinates: { lat: 22.8838, lng: 86.1103 },
        bestTime: "November to March",
        duration: "1-2 days",
        highlights: ["Elephant Migration", "Wildlife Photography", "Forest Trails", "Bird Watching"],
        pictureFolder: "Dalma wildlife santury"
    },
    {
        name: "Jubilee Park",
        slug: "jubilee-park",
        image: "/picture_1/Jubilee park/34d67002-5974-4f23-9d5a-64b003b2f2ce.jpg",
        description: [
            "Beautiful urban park in Jamshedpur",
            "Perfect for family outings and recreation"
        ],
        longDescription: [
            "Jubilee Park is one of the largest and most beautiful parks in Jamshedpur, spread over 225 acres. The park features a zoo, rose garden, and various recreational facilities making it a perfect destination for families and nature lovers.",
            "The park houses a variety of animals in its zoo section and offers boating facilities in its lake. The well-maintained gardens, walking trails, and children's play areas make it an ideal spot for relaxation and recreation."
        ],
        audio: "/audio/jubilee.mp3",
        view360: "/360/jubilee",
        category: "Park",
        tags: ["Park", "Zoo", "Family", "Recreation"],
        coordinates: { lat: 22.7925, lng: 86.1842 },
        bestTime: "October to March",
        duration: "Half day",
        highlights: ["Zoo", "Rose Garden", "Boating", "Walking Trails"],
        pictureFolder: "Jubilee park"
    },
    {
        name: "Kanke Dam",
        slug: "kanke-dam",
        image: "/picture_1/Kanke dam/01fd408c-6d8a-47e2-a193-0b43c21dd0d6.jpg",
        description: [
            "Scenic dam near Ranchi city",
            "Popular picnic spot with beautiful surroundings"
        ],
        longDescription: [
            "Kanke Dam is a beautiful reservoir located about 32 kilometers from Ranchi. Built across the Kanke River, this dam creates a picturesque lake surrounded by hills and forests, making it a popular destination for day trips and picnics.",
            "The serene environment, combined with the scenic beauty of the surrounding landscape, makes Kanke Dam an ideal spot for relaxation, photography, and nature appreciation. The area also offers opportunities for boating and fishing."
        ],
        audio: "/audio/kanke.mp3",
        view360: "/360/kanke",
        category: "Dam",
        tags: ["Dam", "Picnic", "Boating", "Photography"],
        coordinates: { lat: 23.4261, lng: 85.3200 },
        bestTime: "October to April",
        duration: "Half day",
        highlights: ["Scenic Lake", "Boating", "Photography", "Picnic Spots"],
        pictureFolder: "Kanke dam"
    },
    {
        name: "Dumka",
        slug: "dumka",
        image: "/picture_1/Dumka/4461a555-f89d-43ae-a359-e00c2465a423.jpg",
        description: [
            "Historical town with rich cultural heritage",
            "Capital of Santhal Pargana division"
        ],
        longDescription: [
            "Dumka is a historically significant town and the capital of the Santhal Pargana division in Jharkhand. The town is known for its rich tribal culture and heritage, particularly of the Santhal community.",
            "Dumka offers insights into traditional tribal life and customs. The town serves as an important cultural center and gateway to understanding the indigenous communities of Jharkhand."
        ],
        audio: "/audio/dumka.mp3",
        view360: "/360/dumka",
        category: "Cultural",
        tags: ["Cultural", "Heritage", "Tribal", "Historical"],
        coordinates: { lat: 24.2676, lng: 87.2445 },
        bestTime: "October to March",
        duration: "1-2 days",
        highlights: ["Tribal Culture", "Heritage Sites", "Local Markets", "Traditional Crafts"],
        pictureFolder: "Dumka"
    },
    {
        name: "Ghatshila",
        slug: "ghatshila",
        image: "/picture_1/Ghatshila/6284f79b-78a9-4256-b19b-398e066ce07d.jpg",
        description: [
            "Scenic town surrounded by hills and forests",
            "Beautiful natural landscapes and peaceful environment"
        ],
        longDescription: [
            "Ghatshila is a picturesque town located in the East Singhbhum district of Jharkhand. The town is surrounded by hills and dense forests, offering beautiful natural landscapes and a peaceful environment.",
            "The area is known for its scenic beauty and serves as a perfect destination for nature lovers seeking tranquility away from urban chaos. The town offers excellent opportunities for trekking and nature photography."
        ],
        audio: "/audio/ghatshila.mp3",
        view360: "/360/ghatshila",
        category: "Nature",
        tags: ["Nature", "Hills", "Peaceful", "Photography"],
        coordinates: { lat: 22.5833, lng: 86.4667 },
        bestTime: "October to April",
        duration: "1-2 days",
        highlights: ["Scenic Views", "Forest Trails", "Photography", "Nature Walks"],
        pictureFolder: "Ghatshila"
    },
    {
        name: "Lodh Falls",
        slug: "lodh-falls",
        image: "/picture_1/Lodh fall/1de0ab2a-ee34-4d3a-bb46-a06de4141b0b.jpg",
        description: [
            "Magnificent waterfall cascading from great height",
            "One of the highest waterfalls in Jharkhand"
        ],
        longDescription: [
            "Lodh Falls is one of the most spectacular waterfalls in Jharkhand, cascading from a height of 143 meters. Located near Netarhat, this waterfall is formed by the Burha River and offers breathtaking views especially during the monsoon season.",
            "The waterfall is surrounded by dense forests and rocky terrain, making it a perfect destination for adventure enthusiasts and nature photographers. The best time to visit is during and immediately after the monsoon when the water flow is at its peak."
        ],
        audio: "/audio/lodh.mp3",
        view360: "/360/lodh",
        category: "Waterfall",
        tags: ["Waterfall", "Adventure", "Photography", "Nature"],
        coordinates: { lat: 23.5167, lng: 84.2333 },
        bestTime: "July to February",
        duration: "Half day",
        highlights: ["Spectacular Views", "Photography", "Nature Trails", "Adventure"],
        pictureFolder: "Lodh fall"
    },
    {
        name: "Maluti Temples",
        slug: "maluti-temples",
        image: "/picture_1/Maluti temple/3aa2abf5-c0cf-404c-b179-93a4d9edcfd3.jpg",
        description: [
            "Ancient temple complex with unique terracotta architecture",
            "Rich heritage site with historical significance"
        ],
        longDescription: [
            "Maluti is a small village famous for its cluster of ancient temples dating back to the 17th and 18th centuries. The village houses 108 temples, though many are now in ruins, showcasing unique terracotta architecture and intricate carvings.",
            "These temples represent the rich cultural heritage of the region and offer insights into the architectural styles of bygone eras. The terracotta work on the temple walls depicts various mythological scenes and is considered a masterpiece of regional art."
        ],
        audio: "/audio/maluti.mp3",
        view360: "/360/maluti",
        category: "Religious",
        tags: ["Temples", "Heritage", "Architecture", "Historical"],
        coordinates: { lat: 25.2142, lng: 87.3211 },
        bestTime: "October to March",
        duration: "Half day",
        highlights: ["Ancient Temples", "Terracotta Art", "Architecture", "Heritage"],
        pictureFolder: "Maluti temple"
    },
    {
        name: "Mayurbhanj Palace",
        slug: "mayurbhanj-palace",
        image: "/picture_1/Mayurbhanj place/013c63d7-b897-43c8-9561-5a3c37aab274.jpg",
        description: [
            "Historical palace showcasing royal architecture",
            "Beautiful heritage structure with cultural significance"
        ],
        longDescription: [
            "Mayurbhanj Palace is a magnificent heritage structure that showcases the royal architecture and grandeur of bygone eras. The palace represents the rich cultural heritage and royal history of the region.",
            "The palace features beautiful architectural details and serves as a window into the lifestyle of the erstwhile rulers. Visitors can explore the various sections of the palace and learn about the historical significance of this heritage site."
        ],
        audio: "/audio/mayurbhanj.mp3",
        view360: "/360/mayurbhanj",
        category: "Heritage",
        tags: ["Palace", "Heritage", "Architecture", "Royal"],
        coordinates: { lat: 23.2599, lng: 85.3094 },
        bestTime: "October to March",
        duration: "Half day",
        highlights: ["Royal Architecture", "Heritage", "Photography", "History"],
        pictureFolder: "Mayurbhanj palace"
    },
    {
        name: "Usri Falls",
        slug: "usri-falls",
        image: "/picture_1/Usri fall/60d53d30-9679-46f1-b1b6-f25a12b224f7.jpg",
        description: [
            "Beautiful waterfall surrounded by lush greenery",
            "Perfect spot for nature lovers and photographers"
        ],
        longDescription: [
            "Usri Falls is a beautiful waterfall located in the Gumla district of Jharkhand. The waterfall cascades down rocky terrain surrounded by lush green forests, creating a spectacular natural scene.",
            "The falls are particularly impressive during the monsoon season when the water flow is at its peak. The surrounding area offers excellent opportunities for nature photography and peaceful relaxation amidst pristine natural beauty."
        ],
        audio: "/audio/usri.mp3",
        view360: "/360/usri",
        category: "Waterfall",
        tags: ["Waterfall", "Nature", "Photography", "Peaceful"],
        coordinates: { lat: 23.0833, lng: 84.5167 },
        bestTime: "July to February",
        duration: "Half day",
        highlights: ["Natural Beauty", "Photography", "Peace", "Forest Trails"],
        pictureFolder: "Usri fall"
    },
    {
        name: "Hirni Falls",
        slug: "hirni-falls",
        image: "/picture_1/hirni fall/1b4e1f96-4564-43c5-96a2-25977d9c9e79.jpg",
        description: [
            "Scenic waterfall with crystal clear water",
            "Hidden gem perfect for adventure seekers"
        ],
        longDescription: [
            "Hirni Falls is a hidden gem located in the Ranchi district, known for its crystal clear water and scenic beauty. The waterfall is surrounded by dense forests and rocky formations, making it a perfect destination for adventure enthusiasts.",
            "The falls offer a serene environment away from the crowds, making it ideal for those seeking tranquility and natural beauty. The trek to reach the falls adds to the adventure, rewarding visitors with spectacular views."
        ],
        audio: "/audio/hirni.mp3",
        view360: "/360/hirni",
        category: "Waterfall",
        tags: ["Waterfall", "Adventure", "Hidden Gem", "Nature"],
        coordinates: { lat: 23.4167, lng: 85.2833 },
        bestTime: "July to February",
        duration: "Half day",
        highlights: ["Crystal Clear Water", "Adventure Trek", "Scenic Beauty", "Photography"],
        pictureFolder: "Hirni fall"
    },
    {
        name: "Jagannath Temple",
        slug: "jagannath-temple",
        image: "/picture_1/jagarnath temple/0655681f-03bd-4d92-ab3f-3ab509074626.jpg",
        description: [
            "Sacred temple dedicated to Lord Jagannath",
            "Important pilgrimage site with spiritual significance"
        ],
        longDescription: [
            "Jagannath Temple is an important pilgrimage site in Jharkhand, dedicated to Lord Jagannath. The temple attracts devotees from across the region and is known for its spiritual significance and religious festivals.",
            "The temple features beautiful architecture and serves as a center for various religious activities and cultural celebrations. The annual festivals and ceremonies draw large numbers of pilgrims and visitors."
        ],
        audio: "/audio/jagannath.mp3",
        view360: "/360/jagannath",
        category: "Religious",
        tags: ["Temple", "Pilgrimage", "Spiritual", "Religious"],
        coordinates: { lat: 23.3569, lng: 85.3348 },
        bestTime: "October to March",
        duration: "Half day",
        highlights: ["Religious Significance", "Architecture", "Festivals", "Spiritual"],
        pictureFolder: "Jagarnath temple"
    },
    {
        name: "Tata Steel Zoological Park",
        slug: "tata-steel-zoological-park",
        image: "/picture_1/tata steel zoological/01695be1-9681-4a41-8fdd-d2d87879b92e.jpg",
        description: [
            "Well-maintained zoo with diverse wildlife",
            "Perfect family destination with educational value"
        ],
        longDescription: [
            "Tata Steel Zoological Park is one of the well-maintained zoos in Jharkhand, located in Jamshedpur. The zoo houses a diverse collection of animals and birds, making it an excellent destination for families and wildlife enthusiasts.",
            "The park focuses on conservation and education, providing visitors with opportunities to learn about various species and their habitats. The well-designed enclosures and natural settings create a comfortable environment for both animals and visitors."
        ],
        audio: "/audio/tata_zoo.mp3",
        view360: "/360/tata_zoo",
        category: "Zoo",
        tags: ["Zoo", "Wildlife", "Family", "Education"],
        coordinates: { lat: 22.7996, lng: 86.1844 },
        bestTime: "October to March",
        duration: "Half day",
        highlights: ["Diverse Wildlife", "Educational", "Family Fun", "Conservation"],
        pictureFolder: "Tata steel zoological"
    },
    {
        name: "Topchanchi Lake",
        slug: "topchanchi-lake",
        image: "/picture_1/topchanchu lake/03d1fb4c-b332-422c-ba39-5f6a21866860.jpg",
        description: [
            "Scenic lake surrounded by hills and forests",
            "Popular destination for boating and relaxation"
        ],
        longDescription: [
            "Topchanchi Lake is a beautiful artificial lake located in the Dhanbad district of Jharkhand. The lake is surrounded by hills and dense forests, creating a picturesque setting that attracts visitors from across the region.",
            "The lake offers various recreational activities including boating, fishing, and nature walks. The serene environment and natural beauty make it a perfect destination for weekend getaways and family outings."
        ],
        audio: "/audio/topchanchi.mp3",
        view360: "/360/topchanchi",
        category: "Lake",
        tags: ["Lake", "Boating", "Nature", "Relaxation"],
        coordinates: { lat: 23.9167, lng: 86.2833 },
        bestTime: "October to April",
        duration: "Half day",
        highlights: ["Boating", "Scenic Views", "Photography", "Nature Walks"],
        pictureFolder: "Topchanchu lake"
    }
];
export default function PlaceDetail({ params }) {
    const { slug } = params;
    const place = PLACES.find(
        p => p.slug === slug || p.name.toLowerCase() === slug.toLowerCase()
    );
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [show360, setShow360] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [placeImages, setPlaceImages] = useState([]);
    
    const audioRef = useRef(null);

    useEffect(() => {
        setIsLoading(false);
        // Load images for the place
        if (place && place.pictureFolder) {
            const images = getPlaceImages(place.pictureFolder);
            setPlaceImages(images);
        } else if (place) {
            // Fallback to try getting images by slug
            const pictureFolder = getPlacePictureFolder(slug);
            if (pictureFolder) {
                const images = getPlaceImages(pictureFolder);
                setPlaceImages(images);
            }
        }
    }, [place, slug]);

    if (!place) return notFound();

    const handleAudioToggle = () => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        const audio = new Audio(place.audio);
        audioRef.current = audio;

        audio.addEventListener('error', () => {
            setAudioError(true);
            setIsPlaying(false);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        });

        audio.play().then(() => {
            setIsPlaying(true);
            setAudioError(false);
        }).catch(error => {
            console.error('Audio playback failed:', error);
            setAudioError(true);
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${place.name} - JharYatra`,
                    text: place.description[0],
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
                
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-6 left-6 z-20"
                >
                    <Link
                        href="/places"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Places</span>
                    </Link>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-6 right-6 z-20 flex gap-3"
                >
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </motion.div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                                {place.name}
                            </h1>
                            
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {place.tags.map((tag, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 rounded-full text-sm font-medium"
                                    >
                                        #{tag}
                                    </motion.span>
                                ))}
                            </div>

                            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                                {place.description[0]}
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{place.bestTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    <span>{place.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{place.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce"
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </div>

            {/* Action Buttons Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
            >
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleAudioToggle}
                            disabled={audioError}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5" />
                            ) : audioError ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                            <span>{isPlaying ? 'Pause Audio' : audioError ? 'Audio Unavailable' : 'Listen'}</span>
                        </button>

                        <button
                            onClick={() => setShow360(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        >
                            <RotateCw className="w-5 h-5" />
                            <span>Street View VR</span>
                        </button>

                        <button
                            onClick={() => setShowMap(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                        >
                            <Navigation className="w-5 h-5" />
                            <span>View Map</span>
                        </button>

                        <Link
                            href="/form"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Book Now</span>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-8">Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {place.highlights?.map((highlight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-emerald-400" />
                                    <span className="text-white font-medium">{highlight}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Image Gallery Carousel */}
                {placeImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
                        <div className="relative">
                            <Carousel className="w-full max-w-5xl mx-auto">
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {placeImages.map((imageSrc, index) => (
                                        <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="relative group cursor-pointer"
                                            >
                                                <div className="relative h-64 overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                                                    <Image
                                                        src={imageSrc}
                                                        alt={`${place.name} - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                        quality={85}
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                                                    
                                                    {/* Image overlay with index */}
                                                    <div className="absolute bottom-3 right-3">
                                                        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                                                            {index + 1} / {placeImages.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex -left-12 bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-white" />
                                <CarouselNext className="hidden md:flex -right-12 bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-white" />
                            </Carousel>
                            
                            {/* Mobile navigation dots */}
                            <div className="flex justify-center mt-6 md:hidden">
                                <div className="flex gap-2">
                                    {placeImages.slice(0, Math.min(5, placeImages.length)).map((_, index) => (
                                        <div
                                            key={index}
                                            className="w-2 h-2 rounded-full bg-gray-600"
                                        />
                                    ))}
                                    {placeImages.length > 5 && (
                                        <span className="text-gray-400 text-xs ml-2">
                                            +{placeImages.length - 5} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-8">About {place.name}</h2>
                    <div className="space-y-6">
                        {place.longDescription.map((para, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="text-gray-300 leading-relaxed text-lg"
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Visit Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-3">Best Time to Visit</h3>
                        <p className="text-gray-300">{place.bestTime}</p>
                    </div>
                    <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-3">Recommended Duration</h3>
                        <p className="text-gray-300">{place.duration}</p>
                    </div>
                    <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-3">Category</h3>
                        <p className="text-gray-300">{place.category.replace('_', ' ')}</p>
                    </div>
                </motion.div>
            </div>

            {/* Google Street View VR Experience */}
            <GoogleStreetViewVR 
                place={place}
                isOpen={show360}
                onClose={() => setShow360(false)}
            />

            {/* Map Modal */}
            <AnimatePresence>
                {showMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setShowMap(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-full max-w-4xl h-[70vh] bg-gray-900 rounded-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowMap(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all duration-300"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            
                            <div className="w-full h-full">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d${place.coordinates?.lng || 85.3096}!3d${place.coordinates?.lat || 23.3441}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${place.coordinates?.lat || 23.3441}°N%20${place.coordinates?.lng || 85.3096}°E!5e0!3m2!1sen!2sin!4v1609876543210!5m2!1sen!2sin`}
                                    className="w-full h-full"
                                    title={`${place.name} Map`}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}