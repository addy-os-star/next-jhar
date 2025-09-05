    'use client';
    import { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import Image from 'next/image';

    import UserTabs from "@/components/layouts/UserTabs";
    import { Calendar, Clock, MapPin, Users, BookOpen, Newspaper, Award, TrendingUp, Sparkles, Star, ArrowRight } from 'lucide-react';
    import { Skeleton, CardSkeleton } from '@/components/ui/skeleton';

export default function JhaVibes() {
    const [activeTab, setActiveTab] = useState('history');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Historical timeline data
    const historicalEvents = [
        {
            year: '1765',
            title: 'British East India Company',
            description: 'British East India Company gained control over Jharkhand region, then part of Bengal Presidency.',
            category: 'colonial'
        },
        {
            year: '1855-56',
            title: 'Santhal Rebellion',
            description: 'Major tribal uprising led by Sidhu and Kanhu Murmu against British colonial rule.',
            category: 'rebellion'
        },
        {
            year: '1899',
            title: 'Birsa Munda Movement',
            description: 'Birsa Munda led the Munda rebellion against British rule and exploitation.',
            category: 'freedom'
        },
        {
            year: '1912',
            title: 'Bihar and Orissa Province',
            description: 'Jharkhand became part of the newly created Bihar and Orissa Province.',
            category: 'administrative'
        },
        {
            year: '1947',
            title: 'Independence',
            description: 'India gained independence; Jharkhand remained part of Bihar state.',
            category: 'independence'
        },
        {
            year: '2000',
            title: 'Jharkhand State Formation',
            description: 'Jharkhand became the 28th state of India on November 15, 2000.',
            category: 'statehood'
        }
    ];

    // News articles - 15 comprehensive articles about Jharkhand
    const newsArticles = [
        {
            id: 1,
            title: 'Jharkhand Launches New Tourism Initiative',
            summary: 'State government announces ₹500 crore investment in eco-tourism projects across 15 districts to boost rural economy and preserve natural heritage.',
            date: '2024-01-15',
            category: 'tourism',
            image: '/jharkhand.jpg',
            author: 'Tourism Board Jharkhand',
            readTime: '3 min read'
        },
        {
            id: 2,
            title: 'Tribal Festival Celebrations Begin Across State',
            summary: 'Sarhul festival celebrations kick off with traditional dance and music performances in over 200 villages, showcasing rich tribal culture.',
            date: '2024-01-12',
            category: 'culture',
            image: '/karam.jpg',
            author: 'Cultural Affairs Ministry',
            readTime: '4 min read'
        },
        {
            id: 3,
            title: 'New Industrial Corridor Approved for Development',
            summary: 'Central government approves ₹2000 crore industrial corridor between Ranchi and Jamshedpur to create 50,000 new jobs.',
            date: '2024-01-10',
            category: 'economy',
            image: '/jamshedpur.jpeg',
            author: 'Economic Development Board',
            readTime: '5 min read'
        },
        {
            id: 4,
            title: 'Digital Education Initiative Launched for Tribal Schools',
            summary: 'State launches comprehensive digital education program for 500 tribal schools with smart classrooms and internet connectivity.',
            date: '2024-01-08',
            category: 'education',
            image: '/ent.jpeg',
            author: 'Education Department',
            readTime: '3 min read'
        },
        {
            id: 5,
            title: 'Jharkhand Wins National Award for Forest Conservation',
            summary: 'State receives prestigious national recognition for increasing forest cover by 15% through community participation programs.',
            date: '2024-01-05',
            category: 'environment',
            image: '/jharkhand.jpg',
            author: 'Forest Department',
            readTime: '4 min read'
        },
        {
            id: 6,
            title: 'New Mining Policy Focuses on Sustainable Development',
            summary: 'Revolutionary mining policy emphasizes environmental protection while ensuring fair revenue sharing with local communities.',
            date: '2024-01-03',
            category: 'policy',
            image: '/do-img.jpg',
            author: 'Mining Ministry',
            readTime: '6 min read'
        },
        {
            id: 7,
            title: 'Ranchi Metro Project Gets Central Government Approval',
            summary: 'Ambitious ₹12,000 crore Ranchi Metro project approved to connect major areas with modern transportation system.',
            date: '2024-01-01',
            category: 'infrastructure',
            image: '/ranc-img.jpeg',
            author: 'Transport Authority',
            readTime: '4 min read'
        },
        {
            id: 8,
            title: 'Jharkhand Emerges as Leading Organic Farming State',
            summary: 'State achieves milestone of converting 2 lakh hectares to organic farming, benefiting 50,000 farmers with higher income.',
            date: '2023-12-28',
            category: 'agriculture',
            image: '/karam.jpg',
            author: 'Agriculture Department',
            readTime: '5 min read'
        },
        {
            id: 9,
            title: 'Traditional Handicrafts Get Global Recognition',
            summary: 'Jharkhand tribal handicrafts featured in international exhibitions, boosting exports and artisan livelihoods significantly.',
            date: '2023-12-25',
            category: 'handicrafts',
            image: '/mal-img.jpg',
            author: 'Handicrafts Board',
            readTime: '3 min read'
        },
        {
            id: 10,
            title: 'State Launches Women Entrepreneur Support Program',
            summary: 'Comprehensive program provides financial assistance and training to 10,000 women entrepreneurs across all districts.',
            date: '2023-12-22',
            category: 'women empowerment',
            image: '/ent.jpeg',
            author: 'Women Development Board',
            readTime: '4 min read'
        },
        {
            id: 11,
            title: 'Jharkhand Solar Mission Achieves Major Milestone',
            summary: 'State generates 1000 MW solar power, becoming leader in renewable energy with reduced carbon footprint.',
            date: '2023-12-20',
            category: 'renewable energy',
            image: '/jharkhand.jpg',
            author: 'Energy Department',
            readTime: '4 min read'
        },
        {
            id: 12,
            title: 'Healthcare Infrastructure Gets Major Upgrade',
            summary: 'New medical colleges and 500 health centers established to provide quality healthcare in remote areas.',
            date: '2023-12-18',
            category: 'healthcare',
            image: '/do-img.jpg',
            author: 'Health Department',
            readTime: '5 min read'
        },
        {
            id: 13,
            title: 'Tribal Sports Academy Nurtures Young Talent',
            summary: 'State-of-the-art sports academy produces national and international level athletes from tribal communities.',
            date: '2023-12-15',
            category: 'sports',
            image: '/ranc-img.jpeg',
            author: 'Sports Authority',
            readTime: '3 min read'
        },
        {
            id: 14,
            title: 'Jharkhand Becomes Hub for IT and Startups',
            summary: 'Technology parks in Ranchi and Jamshedpur attract major IT companies, creating opportunities for youth.',
            date: '2023-12-12',
            category: 'technology',
            image: '/jamshedpur.jpeg',
            author: 'IT Department',
            readTime: '6 min read'
        },
        {
            id: 15,
            title: 'Water Conservation Program Shows Remarkable Results',
            summary: 'Innovative rainwater harvesting and watershed management increases groundwater levels by 30% statewide.',
            date: '2023-12-10',
            category: 'water conservation',
            image: '/mal-img.jpg',
            author: 'Water Resources Department',
            readTime: '4 min read'
        }
    ];

    // Important dates and events
    const importantDates = [
        { date: '15-11', event: 'Jharkhand Foundation Day', type: 'state' },
        { date: '15-08', event: 'Independence Day', type: 'national' },
        { date: '26-01', event: 'Republic Day', type: 'national' },
        { date: '02-10', event: 'Gandhi Jayanti', type: 'national' },
        { date: '15-06', event: 'Birsa Munda Jayanti', type: 'state' },
        { date: '03-03', event: 'Sarhul Festival', type: 'tribal' },
        { date: '09-08', event: 'Karma Festival', type: 'tribal' },
        { date: '01-01', event: 'New Year', type: 'general' },
        { date: '14-01', event: 'Makar Sankranti', type: 'cultural' },
        { date: '08-03', event: 'Holi', type: 'festival' },
        { date: '30-03', event: 'Ram Navami', type: 'festival' },
        { date: '10-04', event: 'Good Friday', type: 'festival' }
    ];

    // Upcoming events - 15 comprehensive events across Jharkhand
    const upcomingEvents = [
        {
            id: 1,
            title: 'Jharkhand International Film Festival',
            date: '2024-02-15',
            location: 'Ranchi Cultural Complex',
            description: 'Annual film festival showcasing regional cinema, documentaries on tribal culture, and international films with focus on indigenous communities.',
            category: 'cultural',
            duration: '5 days',
            organizer: 'Jharkhand Film Society',
            ticketPrice: 'Free Entry',
            highlights: ['International Cinema', 'Tribal Documentaries', 'Celebrity Interactions']
        },
        {
            id: 2,
            title: 'Tribal Handicrafts and Arts Expo',
            date: '2024-02-20',
            location: 'Jamshedpur Exhibition Ground',
            description: 'Grand exhibition featuring traditional tribal handicrafts, paintings, sculptures, and live demonstrations by master artisans.',
            category: 'exhibition',
            duration: '7 days',
            organizer: 'Jharkhand Handicrafts Board',
            ticketPrice: '₹50',
            highlights: ['Live Demonstrations', 'Artisan Workshops', 'Cultural Performances']
        },
        {
            id: 3,
            title: 'Jharkhand Food and Culture Festival',
            date: '2024-03-01',
            location: 'Dhanbad Sports Stadium',
            description: 'Celebration of traditional Jharkhandi cuisine with cooking competitions, food stalls, and cultural performances by local artists.',
            category: 'food',
            duration: '3 days',
            organizer: 'Tourism Development Corporation',
            ticketPrice: '₹100',
            highlights: ['Cooking Competitions', 'Traditional Recipes', 'Folk Dance']
        },
        {
            id: 4,
            title: 'Mining Technology and Innovation Conference',
            date: '2024-03-10',
            location: 'Bokaro Steel Plant Auditorium',
            description: 'International conference on sustainable mining technologies, environmental protection, and community development in mining areas.',
            category: 'technology',
            duration: '2 days',
            organizer: 'Mining Technology Institute',
            ticketPrice: '₹500',
            highlights: ['Tech Exhibitions', 'Expert Talks', 'Innovation Awards']
        },
        {
            id: 5,
            title: 'Spring Festival and Tribal Fair',
            date: '2024-03-20',
            location: 'Hazaribagh National Park',
            description: 'Traditional spring festival with folk performances, tribal rituals, nature walks, and wildlife photography competitions.',
            category: 'festival',
            duration: '4 days',
            organizer: 'Forest Department',
            ticketPrice: '₹75',
            highlights: ['Wildlife Photography', 'Nature Walks', 'Tribal Rituals']
        },
        {
            id: 6,
            title: 'Jharkhand Youth Entrepreneurship Summit',
            date: '2024-04-05',
            location: 'Ranchi University Campus',
            description: 'Platform for young entrepreneurs to showcase innovations, connect with investors, and participate in startup competitions.',
            category: 'business',
            duration: '2 days',
            organizer: 'Youth Development Board',
            ticketPrice: 'Free Registration',
            highlights: ['Startup Pitches', 'Investor Meetings', 'Mentorship Sessions']
        },
        {
            id: 7,
            title: 'Sarhul Festival Grand Celebration',
            date: '2024-04-15',
            location: 'Multiple Tribal Villages',
            description: 'Statewide celebration of Sarhul festival with traditional ceremonies, folk music, dance performances, and cultural exhibitions.',
            category: 'religious',
            duration: '3 days',
            organizer: 'Tribal Affairs Department',
            ticketPrice: 'Free Participation',
            highlights: ['Sacred Rituals', 'Folk Music', 'Community Feast']
        },
        {
            id: 8,
            title: 'Jharkhand Adventure Sports Championship',
            date: '2024-04-25',
            location: 'Netarhat Hills',
            description: 'Thrilling adventure sports competition including rock climbing, paragliding, trekking, and mountain biking in scenic hill stations.',
            category: 'sports',
            duration: '5 days',
            organizer: 'Adventure Sports Association',
            ticketPrice: '₹200',
            highlights: ['Rock Climbing', 'Paragliding', 'Mountain Biking']
        },
        {
            id: 9,
            title: 'Organic Farming and Sustainability Fair',
            date: '2024-05-10',
            location: 'Giridih Agricultural Ground',
            description: 'Exhibition of organic farming techniques, sustainable agriculture practices, and farmer training programs with expert guidance.',
            category: 'agriculture',
            duration: '4 days',
            organizer: 'Agriculture Department',
            ticketPrice: 'Free Entry',
            highlights: ['Organic Techniques', 'Farmer Training', 'Sustainable Practices']
        },
        {
            id: 10,
            title: 'Jharkhand Classical Music Festival',
            date: '2024-05-20',
            location: 'Deoghar Temple Complex',
            description: 'Prestigious classical music festival featuring renowned artists, traditional instruments, and spiritual music in divine ambiance.',
            category: 'music',
            duration: '3 days',
            organizer: 'Cultural Ministry',
            ticketPrice: '₹300',
            highlights: ['Classical Ragas', 'Traditional Instruments', 'Spiritual Music']
        },
        {
            id: 11,
            title: 'Women Empowerment and Skill Development Expo',
            date: '2024-06-01',
            location: 'Dumka Community Center',
            description: 'Comprehensive expo showcasing women-led businesses, skill development programs, and empowerment initiatives across the state.',
            category: 'empowerment',
            duration: '6 days',
            organizer: 'Women Development Corporation',
            ticketPrice: 'Free Registration',
            highlights: ['Business Showcase', 'Skill Workshops', 'Success Stories']
        },
        {
            id: 12,
            title: 'Jharkhand Heritage and Architecture Walk',
            date: '2024-06-15',
            location: 'Historic Sites Statewide',
            description: 'Guided heritage walks exploring ancient temples, colonial architecture, tribal settlements, and historical monuments.',
            category: 'heritage',
            duration: '7 days',
            organizer: 'Archaeological Society',
            ticketPrice: '₹150',
            highlights: ['Ancient Temples', 'Colonial Buildings', 'Tribal Architecture']
        },
        {
            id: 13,
            title: 'Renewable Energy and Green Technology Summit',
            date: '2024-07-01',
            location: 'Jamshedpur Convention Center',
            description: 'Summit focusing on solar energy, wind power, green technology innovations, and sustainable development practices.',
            category: 'technology',
            duration: '3 days',
            organizer: 'Energy Development Board',
            ticketPrice: '₹400',
            highlights: ['Solar Innovations', 'Green Tech', 'Sustainability Talks']
        },
        {
            id: 14,
            title: 'Jharkhand Monsoon Photography Festival',
            date: '2024-07-20',
            location: 'Ranchi and Surrounding Hills',
            description: 'Photography festival celebrating monsoon beauty with workshops, competitions, and exhibitions of nature photography.',
            category: 'photography',
            duration: '4 days',
            organizer: 'Photography Association',
            ticketPrice: '₹250',
            highlights: ['Photo Walks', 'Competitions', 'Expert Workshops']
        },
        {
            id: 15,
            title: 'Karma Festival and Tribal Unity Celebration',
            date: '2024-08-10',
            location: 'Chaibasa Tribal Ground',
            description: 'Grand celebration of Karma festival with traditional dances, community bonding activities, and cultural exchange programs.',
            category: 'festival',
            duration: '2 days',
            organizer: 'Tribal Cultural Society',
            ticketPrice: 'Free Participation',
            highlights: ['Karma Dance', 'Community Bonding', 'Cultural Exchange']
        }
    ];

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${String(day).padStart(2, '0')}-${String(selectedMonth + 1).padStart(2, '0')}`;
            const event = importantDates.find(d => d.date === dateStr);
            
            days.push(
                <div key={day} className={`p-3 border rounded-lg text-center cursor-pointer transition-all duration-300 ${
                    event ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200 hover:bg-emerald-800/50' : 'bg-gray-800/30 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                }`}>
                    <div className="font-semibold">{day}</div>
                    {event && (
                        <div className="text-xs text-emerald-300 mt-1">
                            {event.event.substring(0, 10)}...
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20"></div>
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
            </div>

            <div className="relative z-10">
                <div className='mt-12'>
                    <UserTabs />
                </div>
                

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                Jha-Vibes
                            </h1>
                            <Sparkles className="w-8 h-8 text-blue-400 ml-3" />
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            Dive deep into Jharkhand&apos;s rich tapestry of history, culture, and vibrant contemporary life
                        </motion.p>
                    </motion.div>

                    {/* Navigation Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center mb-12"
                    >
                        <div className="inline-flex p-1 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
                            {[
                                { key: 'history', label: 'History', icon: BookOpen },
                                { key: 'news', label: 'News', icon: Newspaper },
                                { key: 'calendar', label: 'Calendar', icon: Calendar },
                                { key: 'events', label: 'Events', icon: Award }
                            ].map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        activeTab === key
                                            ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'history' && (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="max-w-6xl mx-auto"
                            >
                                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                    Historical Timeline
                                </h2>
                                <div className="space-y-8">
                                    {historicalEvents.map((event, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-6 group"
                                        >
                                            <div className="flex-shrink-0 w-24 text-right">
                                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                                                    {event.year}
                                                </span>
                                            </div>
                                            <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-3 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                                            <div className="flex-grow bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-[1.02]">
                                                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed mb-4">{event.description}</p>
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium ${
                                                    event.category === 'colonial' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                                                    event.category === 'rebellion' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' :
                                                    event.category === 'freedom' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                                                    event.category === 'administrative' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                                                    event.category === 'independence' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                                                    'bg-emerald-900/50 text-emerald-300 border border-emerald-700'
                                                }`}>
                                                    <Star className="w-3 h-3" />
                                                    {event.category}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'news' && (
                            <motion.div
                                key="news"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                    Latest News & Updates
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {newsArticles.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group bg-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:scale-105"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    className="group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1 text-xs rounded-full font-medium backdrop-blur-md ${
                                                        article.category === 'tourism' ? 'bg-blue-900/70 text-blue-200 border border-blue-700' :
                                                        article.category === 'culture' ? 'bg-purple-900/70 text-purple-200 border border-purple-700' :
                                                        article.category === 'economy' ? 'bg-green-900/70 text-green-200 border border-green-700' :
                                                        'bg-emerald-900/70 text-emerald-200 border border-emerald-700'
                                                    }`}>
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Calendar className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-sm text-gray-400">{article.date}</span>
                                                    <span className="text-gray-500 mx-2">•</span>
                                                    <span className="text-sm text-gray-400">{article.readTime}</span>
                                                </div>
                                                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">{article.summary}</p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs text-gray-500">By {article.author}</span>
                                                </div>
                                                <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-105">
                                                    Read More
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'calendar' && (
                            <motion.div
                                key="calendar"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                    Important Dates Calendar
                                </h2>
                                
                                {/* Month and Year Selector */}
                                <div className="flex justify-center gap-4 mb-8">
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        className="px-6 py-3 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    >
                                        {months.map((month, index) => (
                                            <option key={index} value={index} className="bg-gray-800">{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        className="px-6 py-3 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    >
                                        {[2024, 2025, 2026].map(year => (
                                            <option key={year} value={year} className="bg-gray-800">{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Calendar Grid */}
                                <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-800 mb-8">
                                    <div className="grid grid-cols-7 gap-2 mb-4">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="text-center font-semibold text-emerald-400 py-2">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {renderCalendar()}
                                    </div>
                                </div>

                                {/* Important Dates List */}
                                <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
                                    <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Important Dates for {months[selectedMonth]}</h3>
                                    <div className="space-y-3">
                                        {importantDates
                                            .filter(date => parseInt(date.date.split('-')[1]) === selectedMonth + 1)
                                            .map((date, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
                                                >
                                                    <Calendar className="w-5 h-5 text-emerald-400" />
                                                    <span className="font-semibold text-white">{date.date}</span>
                                                    <span className="text-gray-300 flex-grow">{date.event}</span>
                                                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                        date.type === 'state' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                                                        date.type === 'national' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                                                        date.type === 'tribal' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' :
                                                        'bg-gray-700/50 text-gray-300 border border-gray-600'
                                                    }`}>
                                                        {date.type}
                                                    </span>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'events' && (
                            <motion.div
                                key="events"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                    Upcoming Events
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group bg-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:scale-105"
                                        >
                                            <div className="h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">
                                                <Award className="w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                        event.category === 'cultural' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' :
                                                        event.category === 'exhibition' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                                                        event.category === 'food' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                                                        event.category === 'technology' ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700' :
                                                        event.category === 'business' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                                                        event.category === 'sports' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                                                        event.category === 'agriculture' ? 'bg-green-800/50 text-green-200 border border-green-600' :
                                                        event.category === 'music' ? 'bg-violet-900/50 text-violet-300 border border-violet-700' :
                                                        event.category === 'heritage' ? 'bg-amber-900/50 text-amber-300 border border-amber-700' :
                                                        'bg-pink-900/50 text-pink-300 border border-pink-700'
                                                    }`}>
                                                        {event.category}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{event.duration}</span>
                                                </div>
                                                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                                    <Calendar className="w-4 h-4 text-emerald-400" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                    <span>{event.location}</span>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">{event.description}</p>
                                                <div className="mb-4">
                                                    <h4 className="text-xs font-semibold text-gray-400 mb-2">Highlights:</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {event.highlights?.map((highlight, i) => (
                                                            <span key={i} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                                                                {highlight}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
                                                    <span>By {event.organizer}</span>
                                                    <span className="font-semibold text-emerald-400">{event.ticketPrice}</span>
                                                </div>
                                                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-105">
                                                    Register Now
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            

        </section>
    );
}