'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';

import Link from 'next/link';

// Tourist agents data - 10 Tourist Agents from Jharkhand
const touristAgents = [
  {
    id: 1,
    name: 'Jharkhand Explorers',
    rating: 4.8,
    contact: '+91 9876543210',
    email: 'info@jharkhandexplorers.com',
    speciality: 'Adventure Tours & Trekking',
    location: 'Ranchi',
    experience: '15+ years',
    image: '/ranc-img.jpeg',
    description: 'Leading adventure tour operator specializing in waterfall treks and wildlife safaris across Jharkhand.'
  },
  {
    id: 2,
    name: 'Tribal Trails Tourism',
    rating: 4.7,
    contact: '+91 9876543211',
    email: 'bookings@tribaltrails.in',
    speciality: 'Cultural & Heritage Tours',
    location: 'Dumka',
    experience: '12+ years',
    image: '/jharkhand.jpg',
    description: 'Authentic tribal culture experiences with local communities and traditional art workshops.'
  },
  {
    id: 3,
    name: 'Green Getaways Jharkhand',
    rating: 4.6,
    contact: '+91 9876543212',
    email: 'eco@greengetaways.co.in',
    speciality: 'Eco Tourism & Nature Walks',
    location: 'Hazaribagh',
    experience: '10+ years',
    image: '/do-img.jpg',
    description: 'Sustainable tourism focusing on forest conservation and nature photography tours.'
  },
  {
    id: 4,
    name: 'Heritage Holidays Pvt Ltd',
    rating: 4.9,
    contact: '+91 9876543213',
    email: 'tours@heritageholidays.net',
    speciality: 'Historical & Religious Tours',
    location: 'Deoghar',
    experience: '18+ years',
    image: '/mal-img.jpg',
    description: 'Premium spiritual and heritage tours covering ancient temples and archaeological sites.'
  },
  {
    id: 5,
    name: 'Steel City Tours',
    rating: 4.5,
    contact: '+91 9876543214',
    email: 'contact@steelcitytours.com',
    speciality: 'Industrial & City Tours',
    location: 'Jamshedpur',
    experience: '8+ years',
    image: '/ranc-img.jpeg',
    description: 'Modern city tours showcasing industrial heritage and urban attractions of Jamshedpur.'
  },
  {
    id: 6,
    name: 'Palamau Adventures',
    rating: 4.8,
    contact: '+91 9876543215',
    email: 'wildlife@palamuadventures.in',
    speciality: 'Wildlife Safaris & Photography',
    location: 'Daltonganj',
    experience: '14+ years',
    image: '/jharkhand.jpg',
    description: 'Expert wildlife guides for Betla National Park and Palamau Tiger Reserve expeditions.'
  },
  {
    id: 7,
    name: 'Netarhat Hill Station Tours',
    rating: 4.4,
    contact: '+91 9876543216',
    email: 'hills@netarhattours.co.in',
    speciality: 'Hill Station & Sunrise Tours',
    location: 'Netarhat',
    experience: '11+ years',
    image: '/do-img.jpg',
    description: 'Scenic hill station packages with sunrise/sunset viewpoints and nature retreats.'
  },
  {
    id: 8,
    name: 'Waterfall Wonders',
    rating: 4.6,
    contact: '+91 9876543217',
    email: 'falls@waterfallwonders.in',
    speciality: 'Waterfall Tours & Photography',
    location: 'Ranchi',
    experience: '9+ years',
    image: '/mal-img.jpg',
    description: 'Specialized tours to Hundru, Dassam, Jonha and other spectacular waterfalls of Jharkhand.'
  },
  {
    id: 9,
    name: 'Coal City Travels',
    rating: 4.3,
    contact: '+91 9876543218',
    email: 'info@coalcitytravels.com',
    speciality: 'Mining Heritage & Local Tours',
    location: 'Dhanbad',
    experience: '7+ years',
    image: '/ranc-img.jpeg',
    description: 'Unique mining heritage tours and local cultural experiences in the coal capital region.'
  },
  {
    id: 10,
    name: 'Santhal Pargana Expeditions',
    rating: 4.7,
    contact: '+91 9876543219',
    email: 'tribal@santhalpargana.tours',
    speciality: 'Tribal Culture & Folk Arts',
    location: 'Sahibganj',
    experience: '13+ years',
    image: '/jharkhand.jpg',
    description: 'Immersive tribal experiences with folk dance performances and traditional craft workshops.'
  }
];

// Custom packages data
const customPackages = [
  {
    id: 'ranchi-adventure',
    name: 'Ranchi Adventure Expedition',
    duration: '4 Days / 3 Nights',
    price: '₹12,999',
    description: 'Explore the capital city and surrounding waterfalls with thrilling adventure activities.',
    highlights: ['Dassam Falls', 'Jonha Falls', 'Tagore Hill', 'Rock Garden', 'Tribal Museum'],
    image: '/ranc-img.jpeg'
  },
  {
    id: 'tribal-heritage',
    name: 'Tribal Heritage Experience',
    duration: '5 Days / 4 Nights',
    price: '₹15,999',
    description: 'Immerse yourself in the rich tribal culture and traditions of Jharkhand.',
    highlights: ['Tribal Villages', 'Folk Dance Performances', 'Traditional Crafts', 'Local Cuisine', 'Cultural Workshops'],
    image: '/jharkhand.jpg'
  },
  {
    id: 'nature-retreat',
    name: 'Nature Retreat Package',
    duration: '3 Days / 2 Nights',
    price: '₹9,999',
    description: 'Rejuvenate amidst the serene natural beauty of Jharkhand\'s forests and hills.',
    highlights: ['Betla National Park', 'Netarhat Hills', 'Lodh Falls', 'Nature Trails', 'Wildlife Safari'],
    image: '/do-img.jpg'
  },
  {
    id: 'spiritual-journey',
    name: 'Spiritual Journey Tour',
    duration: '4 Days / 3 Nights',
    price: '₹11,999',
    description: 'Visit sacred temples and spiritual sites across Jharkhand.',
    highlights: ['Baidyanath Dham', 'Jagannath Temple', 'Maluti Temples', 'Parasnath Hill', 'Meditation Retreats'],
    image: '/mal-img.jpg'
  }
];

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeTab, setActiveTab] = useState('packages');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/bg-morder.jpg"
              alt="Jharkhand Tourism"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500"
            >
              Explore Jharkhand
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-xl md:text-2xl max-w-2xl text-gray-200"
            >
              Discover the perfect travel packages for your next adventure
            </motion.p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-800/50 backdrop-blur-lg rounded-xl">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${activeTab === 'packages'
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                Our Packages
              </button>
              <button
                onClick={() => setActiveTab('agents')}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${activeTab === 'agents'
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                Tourist Agents
              </button>
            </div>
          </div>

          {/* Packages Section */}
          {activeTab === 'packages' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {customPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  >
                    <div className="relative h-64">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {pkg.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
                        <span className="text-sm text-gray-300">{pkg.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-400 mb-4">{pkg.description}</p>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Highlights:</h4>
                        <ul className="space-y-1">
                          {pkg.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <ChevronRight className="w-4 h-4 text-emerald-400 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-400">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={'/form'}
                        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-medium flex items-center justify-center group-hover:scale-105 transition-all duration-300"
                      >
                        Book This Package
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tourist Agents Section */}
          {activeTab === 'agents' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {touristAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ⭐ {agent.rating}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                        {agent.name}
                      </h3>

                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {agent.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-gray-300">{agent.location}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2 text-emerald-400" />
                          <span className="text-gray-300">{agent.experience} experience</span>
                        </div>

                        <div className="text-sm">
                          <span className="text-blue-400 font-medium">Speciality:</span>
                          <span className="text-gray-300 ml-1">{agent.speciality}</span>
                        </div>

                        <div className="text-sm">
                          <span className="text-blue-400 font-medium">Contact:</span>
                          <span className="text-gray-300 ml-1">{agent.contact}</span>
                        </div>

                        <div className="text-sm">
                          <span className="text-blue-400 font-medium">Email:</span>
                          <span className="text-gray-300 ml-1">{agent.email}</span>
                        </div>
                      </div>

                      <Link
                        href={'/form'}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium flex items-center justify-center group-hover:scale-105 transition-all duration-300"
                      >
                        Book Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
}