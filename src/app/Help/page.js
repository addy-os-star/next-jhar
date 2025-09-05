'use client';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, ExclamationTriangleIcon, CloudIcon, TruckIcon, ArchiveBoxIcon, PaperAirplaneIcon, CurrencyDollarIcon, SignalIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

import { HelpSectionLoading, LoadingSpinner } from '@/components/ui/loading';

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [activeTab, setActiveTab] = useState('faqs');
    const [isLoading, setIsLoading] = useState(true);
    const [sectionLoading, setSectionLoading] = useState(false);

    // Simulate initial page loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Simulate section loading when tab changes
    useEffect(() => {
        setSectionLoading(true);
        const timer = setTimeout(() => {
            setSectionLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const faqs = [
        {
            id: 1,
            question: "What is the best time to visit Jharkhand?",
            answer: "The best time to visit Jharkhand is from October to March when the weather is pleasant and comfortable for sightseeing. The monsoon season (July-September) brings lush greenery but heavy rainfall, while summers (April-June) can be quite hot."
        },
        {
            id: 2,
            question: "Do I need a permit to visit tribal areas?",
            answer: "Yes, some tribal areas require special permits. It's recommended to check with local authorities or your tour operator before planning visits to restricted tribal regions. Always respect local customs and traditions."
        },
        {
            id: 3,
            question: "What are the must-visit places in Jharkhand?",
            answer: "Must-visit places include Betla National Park, Hundru Falls, Dassam Falls, Netarhat Hill Station, Deoghar Temple, and the tribal villages. Each offers unique experiences from wildlife to spirituality."
        },
        {
            id: 4,
            question: "Is Jharkhand safe for solo travelers?",
            answer: "Jharkhand is generally safe for travelers, but it's advisable to travel with a guide in remote areas, especially for solo travelers. Stick to well-known tourist routes and avoid traveling at night in rural areas."
        },
        {
            id: 5,
            question: "What should I pack for my Jharkhand trip?",
            answer: "Pack comfortable walking shoes, light cotton clothes, a hat, sunscreen, insect repellent, and a water bottle. If visiting during monsoon, bring rain gear. For winter visits, carry warm clothes as temperatures can drop."
        },
        {
            id: 6,
            question: "How can I reach Jharkhand?",
            answer: "Jharkhand is well-connected by air, rail, and road. Ranchi has an international airport, and major cities like Jamshedpur, Dhanbad, and Bokaro have good rail connectivity. State transport buses connect all major cities."
        },
        {
            id: 7,
            question: "What is the local currency and payment methods?",
            answer: "Indian Rupee (INR) is the local currency. Credit cards are accepted in major hotels and restaurants, but it's advisable to carry cash for local markets and rural areas. ATMs are available in cities."
        },
        {
            id: 8,
            question: "Are there any health precautions I should take?",
            answer: "Consult your doctor for recommended vaccinations. Carry basic medicines, use mosquito repellent, and drink bottled water. Medical facilities are available in major cities, but rural areas may have limited access."
        }
    ];

    const travelTips = [
        {
            title: "Local Transportation",
            content: "Use local buses, shared taxis, or hire private vehicles for inter-city travel. Auto-rickshaws are common in cities. For remote areas, consider hiring a local guide with vehicle."
        },
        {
            title: "Accommodation",
            content: "Book accommodations in advance, especially during peak season. Options range from budget hotels to luxury resorts. Many eco-tourism properties offer unique tribal village experiences."
        },
        {
            title: "Local Cuisine",
            content: "Try traditional tribal dishes like Dhuska, Handia, and local rice preparations. Street food is popular but ensure it's from clean establishments. Carry bottled water."
        },
        {
            title: "Cultural Etiquette",
            content: "Respect local customs and dress modestly. Ask permission before photographing people. Remove shoes before entering temples. Learn basic greetings in local languages."
        },
        {
            title: "Shopping & Souvenirs",
            content: "Buy tribal handicrafts, traditional jewelry, and handloom products. Bargaining is common in local markets. Ensure you&apos;re buying from authentic sources."
        },
        {
            title: "Photography",
            content: "Many scenic spots allow photography, but some tribal areas may have restrictions. Always ask permission before taking photos of people. Respect 'no photography' signs."
        }
    ];

    const contactInfo = [
        {
            icon: PhoneIcon,
            title: "Tourism Helpline",
            details: "+91-651-2200001",
            description: "24/7 emergency support"
        },
        {
            icon: EnvelopeIcon,
            title: "Email Support",
            details: "tourism@jharkhand.gov.in",
            description: "General inquiries and bookings"
        },
        {
            icon: MapPinIcon,
            title: "Tourism Office",
            details: "Tourism Complex, Ranchi",
            description: "Main tourism information center"
        },
        {
            icon: ClockIcon,
            title: "Office Hours",
            details: "9:00 AM - 6:00 PM",
            description: "Monday to Saturday"
        }
    ];

    const emergencyContacts = [
        { name: "Police", number: "100", description: "Emergency police assistance" },
        { name: "Ambulance", number: "108", description: "Medical emergency services" },
        { name: "Fire Brigade", number: "101", description: "Fire and rescue services" },
        { name: "Women Helpline", number: "1091", description: "Women safety and support" },
        { name: "Child Helpline", number: "1098", description: "Child protection services" },
        { name: "Tourist Police", number: "+91-651-2200002", description: "Tourist-specific assistance" }
    ];

    const weatherInfo = [
        { season: "Summer (March-June)", temp: "25°C - 45°C", description: "Hot and dry weather, best for early morning and evening activities" },
        { season: "Monsoon (July-September)", temp: "20°C - 35°C", description: "Heavy rainfall, lush greenery, waterfalls at their best" },
        { season: "Winter (October-February)", temp: "10°C - 25°C", description: "Pleasant weather, ideal for sightseeing and outdoor activities" }
    ];

    const transportationOptions = [
        { type: "Air", icon: PaperAirplaneIcon, details: "Ranchi Airport (IXR) connects to major cities", description: "Domestic flights available" },
        { type: "Rail", icon: ArchiveBoxIcon, details: "Major stations: Ranchi, Jamshedpur, Dhanbad", description: "Well-connected rail network" },
        { type: "Road", icon: TruckIcon, details: "State transport and private buses", description: "Regular services to all cities" },
        { type: "Local", icon: TruckIcon, details: "Taxis, auto-rickshaws, and car rentals", description: "Convenient local transport" }
    ];

    const localCustoms = [
        { title: "Greetings", content: "Use 'Namaste' with folded hands. Respect elders by touching their feet." },
        { title: "Dress Code", content: "Dress modestly, especially in rural areas. Cover shoulders and knees." },
        { title: "Temple Etiquette", content: "Remove shoes before entering temples. Don&apos;t wear leather items." },
        { title: "Photography", content: "Always ask permission before taking photos of people or religious sites." },
        { title: "Food Customs", content: "Many locals are vegetarian. Respect dietary preferences and restrictions." },
        { title: "Language", content: "Hindi is widely spoken. Learning basic phrases shows respect." }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="h-16 w-96 bg-gray-700/50 rounded mx-auto mb-6 animate-pulse"></div>
                            <div className="h-8 w-2/3 bg-gray-700/50 rounded mx-auto animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="h-12 w-32 bg-gray-700/50 rounded-full animate-pulse"></div>
                        ))}
                    </div>
                    <div className="text-center mb-12">
                        <div className="h-8 w-64 bg-gray-700/50 rounded mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 w-96 bg-gray-700/50 rounded mx-auto animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50">
                                <div className="px-8 py-6">
                                    <div className="h-6 w-full bg-gray-700/50 rounded mb-2 animate-pulse"></div>
                                    <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Help & Support
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Your comprehensive guide to exploring the beautiful landscapes and rich culture of Jharkhand
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                    {[
                        { id: 'faqs', label: 'FAQs' },
                        { id: 'travel-tips', label: 'Travel Tips' },
                        { id: 'contact', label: 'Contact' },
                        { id: 'emergency', label: 'Emergency' },
                        { id: 'weather', label: 'Weather' },
                        { id: 'transport', label: 'Transport' },
                        { id: 'customs', label: 'Local Customs' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border text-sm ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white border-transparent shadow-lg shadow-green-500/25'
                                    : 'bg-transparent text-gray-300 border-gray-600 hover:border-green-500 hover:text-green-400'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Loading indicator for section changes */}
                {sectionLoading && (
                    <div className="flex justify-center mb-8">
                        <LoadingSpinner size="md" />
                    </div>
                )}

                {/* Content Sections */}
                {!sectionLoading && (
                    <>
                        {/* FAQs Section */}
                        {activeTab === 'faqs' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Frequently Asked Questions
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Find answers to common questions about visiting Jharkhand
                                    </p>
                                </div>
                                
                                <div className="max-w-4xl mx-auto space-y-4">
                                    {faqs.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="glass-cont rounded-xl overflow-hidden border border-gray-700/50"
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-all duration-300"
                                            >
                                                <span className="font-semibold text-white text-lg">
                                                    {faq.question}
                                                </span>
                                                {openFaq === faq.id ? (
                                                    <ChevronDownIcon className="h-5 w-5 text-green-400 transition-transform duration-300" />
                                                ) : (
                                                    <ChevronRightIcon className="h-5 w-5 text-gray-400 transition-transform duration-300" />
                                                )}
                                            </button>
                                            {openFaq === faq.id && (
                                                <div className="px-8 pb-6">
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Travel Tips Section */}
                        {activeTab === 'travel-tips' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Travel Tips & Guidance
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Essential information to make your Jharkhand journey memorable
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                    {travelTips.map((tip, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-8 hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-4">
                                                {tip.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {tip.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Resources */}
                                <div className="glass-cont rounded-xl p-8 mt-12 border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                                        Additional Resources
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="text-center">
                                            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <span className="text-2xl">📱</span>
                                            </div>
                                            <h4 className="font-semibold text-white mb-2">Mobile App</h4>
                                            <p className="text-gray-400 text-sm">Download our official tourism app</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <span className="text-2xl">🗺️</span>
                                            </div>
                                            <h4 className="font-semibold text-white mb-2">Maps & Guides</h4>
                                            <p className="text-gray-400 text-sm">Detailed maps and travel guides</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <span className="text-2xl">📞</span>
                                            </div>
                                            <h4 className="font-semibold text-white mb-2">Emergency</h4>
                                            <p className="text-gray-400 text-sm">24/7 emergency contact numbers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Information Section */}
                        {activeTab === 'contact' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Contact Information
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Get in touch with our tourism support team
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                    {contactInfo.map((contact, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-6 text-center hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                                <contact.icon className="h-8 w-8 text-green-400" />
                                            </div>
                                            <h3 className="font-semibold text-white mb-2">
                                                {contact.title}
                                            </h3>
                                            <p className="text-green-400 font-medium mb-1">
                                                {contact.details}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {contact.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Contact Form */}
                                <div className="glass-cont rounded-xl p-8 max-w-2xl mx-auto border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                                        Send us a Message
                                    </h3>
                                    <form className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                                        />
                                        <textarea
                                            placeholder="Your Message"
                                            rows="4"
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-green-500/25"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Emergency Contacts Section */}
                        {activeTab === 'emergency' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Emergency Contacts
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Important numbers for emergency situations
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                    {emergencyContacts.map((contact, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-6 text-center hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                                                <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
                                            </div>
                                            <h3 className="font-semibold text-white mb-2">
                                                {contact.name}
                                            </h3>
                                            <p className="text-red-400 font-bold text-xl mb-1">
                                                {contact.number}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {contact.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="glass-cont rounded-xl p-8 border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                        Safety Tips
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-white">Keep Emergency Numbers Handy</h4>
                                                    <p className="text-gray-400 text-sm">Save these numbers in your phone contacts</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-white">Share Your Location</h4>
                                                    <p className="text-gray-400 text-sm">Let someone know where you&apos;re going</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-white">Carry ID Documents</h4>
                                                    <p className="text-gray-400 text-sm">Keep copies of important documents</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-white">Stay Connected</h4>
                                                    <p className="text-gray-400 text-sm">Ensure your phone is charged and has network</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Weather Information Section */}
                        {activeTab === 'weather' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Weather Information
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Plan your trip according to the weather patterns
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                    {weatherInfo.map((weather, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-8 text-center hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                                                <CloudIcon className="h-10 w-10 text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-3">
                                                {weather.season}
                                            </h3>
                                            <p className="text-blue-400 font-bold text-2xl mb-3">
                                                {weather.temp}
                                            </p>
                                            <p className="text-gray-300 leading-relaxed">
                                                {weather.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="glass-cont rounded-xl p-8 border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                        Weather Tips
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="font-semibold text-white mb-4">What to Pack</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Light cotton clothes for summer</li>
                                                <li>• Rain gear for monsoon season</li>
                                                <li>• Warm clothes for winter</li>
                                                <li>• Comfortable walking shoes</li>
                                                <li>• Sunscreen and hat</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-4">Best Activities</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Wildlife safaris in winter</li>
                                                <li>• Waterfall visits in monsoon</li>
                                                <li>• Temple visits year-round</li>
                                                <li>• Trekking in pleasant weather</li>
                                                <li>• Cultural festivals</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transportation Section */}
                        {activeTab === 'transport' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Transportation Guide
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Complete guide to getting around Jharkhand
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                    {transportationOptions.map((transport, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-8 hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mr-4 border border-green-500/30">
                                                    <transport.icon className="h-8 w-8 text-green-400" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-white">
                                                    {transport.type}
                                                </h3>
                                            </div>
                                            <p className="text-green-400 font-medium mb-2">
                                                {transport.details}
                                            </p>
                                            <p className="text-gray-300">
                                                {transport.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="glass-cont rounded-xl p-8 border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                        Travel Tips
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <CurrencyDollarIcon className="h-12 w-12 text-green-400 mx-auto mb-3" />
                                            <h4 className="font-semibold text-white mb-2">Budget Planning</h4>
                                            <p className="text-gray-400 text-sm">Plan your transport budget in advance</p>
                                        </div>
                                        <div className="text-center">
                                            <SignalIcon className="h-12 w-12 text-green-400 mx-auto mb-3" />
                                            <h4 className="font-semibold text-white mb-2">Online Booking</h4>
                                            <p className="text-gray-400 text-sm">Book tickets online for better rates</p>
                                        </div>
                                        <div className="text-center">
                                            <ClockIcon className="h-12 w-12 text-green-400 mx-auto mb-3" />
                                            <h4 className="font-semibold text-white mb-2">Timing</h4>
                                            <p className="text-gray-400 text-sm">Check schedules and plan accordingly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Local Customs Section */}
                        {activeTab === 'customs' && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Local Customs & Etiquette
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Understanding and respecting local traditions
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                    {localCustoms.map((custom, index) => (
                                        <div
                                            key={index}
                                            className="glass-cont rounded-xl p-8 hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-4">
                                                {custom.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {custom.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="glass-cont rounded-xl p-8 border border-gray-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                        Cultural Sensitivity
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="font-semibold text-white mb-4">Do&apos;s</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Respect religious sites and customs</li>
                                                <li>• Dress modestly and appropriately</li>
                                                <li>• Ask permission before taking photos</li>
                                                <li>• Learn basic local greetings</li>
                                                <li>• Support local artisans and crafts</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-4">Don&apos;ts</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li>• Don&apos;t wear revealing clothes</li>
                                                <li>• Don&apos;t touch religious artifacts</li>
                                                <li>• Don&apos;t disrespect local traditions</li>
                                                <li>• Don&apos;t litter or damage property</li>
                                                <li>• Don&apos;t make insensitive comments</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>


        </div>
    );
}