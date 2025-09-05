'use client';

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, MapPin, Calendar, Users, MessageSquare, Send, CheckCircle, AlertCircle, Sparkles, IndianRupee, Info } from 'lucide-react';
import { calculateTotalPrice, getPriceCategories } from '@/lib/pricingData';

import Image from 'next/image';

export default function TravelBookingForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        destination: '',
        date: '',
        guests: '',
        message: '',
        budgetCategory: 'moderate'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [priceCategories, setPriceCategories] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Update price estimation when destination or guests change
        if (name === 'destination' || name === 'guests' || name === 'budgetCategory') {
            const updatedFormData = { ...formData, [name]: value };
            updatePriceEstimation(updatedFormData);
        }
    };

    const updatePriceEstimation = (data) => {
        if (data.destination) {
            const categories = getPriceCategories(data.destination);
            setPriceCategories(categories);
            
            if (data.guests && categories) {
                const guestCount = parseInt(data.guests) || 1;
                const pricing = calculateTotalPrice(data.destination, guestCount, data.budgetCategory);
                setEstimatedPrice(pricing);
            }
        } else {
            setPriceCategories(null);
            setEstimatedPrice(null);
        }
    };

    const validateForm = () => {
        const { name, phone, email, destination, date, guests } = formData;

        if (!name.trim()) {
            alert('Please enter your full name');
            return false;
        }

        if (!phone.trim()) {
            alert('Please enter your phone number');
            return false;
        }

        if (!email.trim() || !email.includes('@')) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!destination.trim()) {
            alert('Please select your destination');
            return false;
        }

        if (!date) {
            alert('Please select your travel date');
            return false;
        }

        if (!guests || guests < 1) {
            alert('Please enter the number of guests (minimum 1)');
            return false;
        }

        return true;
    };

    const sendEmail = async (templateParams) => {
        try {
            const serviceId = 'service_sp09s1m';
            const adminTemplateId = 'template_8xsmew5';
            const userTemplateId = 'template_bha9z2s';
            const publicKey = '4BT-KTLUda3HUX7jY';

            await emailjs.send(serviceId, adminTemplateId, templateParams, publicKey);

            const userTemplateParams = {
                ...templateParams,
                to_email: templateParams.user_email,
                to_name: templateParams.user_name
            };

            await emailjs.send(serviceId, userTemplateId, userTemplateParams, publicKey);

            return true;
        } catch (error) {
            console.error('EmailJS Error:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setSubmitStatus(null);

        const templateParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            destination: formData.destination,
            date: formData.date,
            guests: formData.guests,
            message: formData.message || 'None'
        };

        try {
            const success = await sendEmail(templateParams);

            if (success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    destination: '',
                    date: '',
                    guests: '',
                    message: '',
                    budgetCategory: 'moderate'
                });
                setEstimatedPrice(null);
                setPriceCategories(null);
                router.push(`/thank-you?placeId=${encodeURIComponent(formData.destination)}`);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white">
            {/* Background with gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20"></div>
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
            </div>

            <div className="relative z-10 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500 text-center">
                            Book Your Jharyatra
                        </h1>
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mt-2 sm:mt-0 sm:ml-3" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4"
                    >
                        Embark on an unforgettable journey through the heart of Jharkhand
                    </motion.p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-gray-900/50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-800 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] transition-all duration-500"
                    >
                        {/* Header with glass morphism effect */}
                        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"></div>
                            <div className="relative text-center">
                                <motion.h2
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                                >
                                    Plan Your Adventure
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    className="text-emerald-200 text-sm sm:text-base"
                                >
                                    Fill out the details below and we&apos;ll craft your perfect journey
                                </motion.p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                            {/* Full Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="space-y-2"
                            >
                                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300">
                                    <User className="w-4 h-4 mr-2 text-emerald-400" />
                                    Full Name *
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </motion.div>

                            {/* Phone Number */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="space-y-2"
                            >
                                <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-300">
                                    <Phone className="w-4 h-4 mr-2 text-blue-400" />
                                    Phone Number *
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                                className="space-y-2"
                            >
                                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300">
                                    <Mail className="w-4 h-4 mr-2 text-purple-400" />
                                    Email Address *
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </motion.div>

                            {/* Destination */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1.1 }}
                                className="space-y-2"
                            >
                                <label htmlFor="destination" className="flex items-center text-sm font-medium text-gray-300">
                                    <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                                    Destination *
                                </label>
                                <motion.select
                                    whileFocus={{ scale: 1.02 }}
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-white backdrop-blur-sm text-sm sm:text-base"
                                    required
                                >
                                    <option value="" className="bg-gray-800">-- Select Destination --</option>
                                    <option value="Ranchi" className="bg-gray-800">Ranchi</option>
                                    <option value="Jamshedpur" className="bg-gray-800">Jamshedpur</option>
                                    <option value="Dhanbad" className="bg-gray-800">Dhanbad</option>
                                    <option value="Deoghar" className="bg-gray-800">Deoghar</option>
                                    <option value="Betla National Park" className="bg-gray-800">Betla National Park</option>
                                    <option value="Palamau Tiger Reserve" className="bg-gray-800">Palamau Tiger Reserve</option>
                                    <option value="Hazaribagh" className="bg-gray-800">Hazaribagh</option>
                                    <option value="Dassam Falls" className="bg-gray-800">Dassam Falls</option>
                                    <option value="Hundru Falls" className="bg-gray-800">Hundru Falls</option>
                                    <option value="Jonha Falls" className="bg-gray-800">Jonha Falls</option>
                                    <option value="Netarhat" className="bg-gray-800">Netarhat</option>
                                    <option value="Parasnath Hill" className="bg-gray-800">Parasnath Hill</option>
                                    <option value="McCluskieganj" className="bg-gray-800">McCluskieganj</option>
                                    <option value="Rajrappa Temple" className="bg-gray-800">Rajrappa Temple</option>
                                    <option value="Bokaro" className="bg-gray-800">Bokaro</option>
                                    <option value="Giridih" className="bg-gray-800">Giridih</option>
                                    <option value="Jamshedpur Zoological Park" className="bg-gray-800">Jamshedpur Zoological Park</option>
                                    <option value="Maithon Dam" className="bg-gray-800">Maithon Dam</option>
                                    <option value="Dimna Lake" className="bg-gray-800">Dimna Lake</option>
                                    <option value="Lodh Falls" className="bg-gray-800">Lodh Falls</option>
                                    <option value="Jubilee Park" className="bg-gray-800">Jubilee Park</option>
                                    <option value="Birsa Zoological Park" className="bg-gray-800">Birsa Zoological Park</option>
                                    <option value="Ghatshila" className="bg-gray-800">Ghatshila</option>
                                    <option value="Usri Falls" className="bg-gray-800">Usri Falls</option>
                                    <option value="Dalma Wildlife Sanctuary" className="bg-gray-800">Dalma Wildlife Sanctuary</option>
                                    <option value="Kanke Dam" className="bg-gray-800">Kanke Dam</option>
                                    <option value="Dumka" className="bg-gray-800">Dumka</option>
                                    <option value="Maluti Temples" className="bg-gray-800">Maluti Temples</option>
                                    <option value="Topchanchi Lake" className="bg-gray-800">Topchanchi Lake</option>
                                    <option value="Mayurbhanj Palace" className="bg-gray-800">Mayurbhanj Palace</option>
                                    <option value="Tata Steel Zoological Park" className="bg-gray-800">Tata Steel Zoological Park</option>
                                    <option value="Jagannath Temple Ranchi" className="bg-gray-800">Jagannath Temple Ranchi</option>
                                    <option value="Rock Garden Ranchi" className="bg-gray-800">Rock Garden Ranchi</option>
                                    <option value="Hirni Falls" className="bg-gray-800">Hirni Falls</option>
                                    <option value="Sun Temple Ranchi" className="bg-gray-800">Sun Temple Ranchi</option>
                                    <option value="Panch Gagh Falls" className="bg-gray-800">Panch Gagh Falls</option>
                                    <option value="Ranchi Lake" className="bg-gray-800">Ranchi Lake</option>
                                    <option value="Massanjore Dam" className="bg-gray-800">Massanjore Dam</option>
                                    <option value="Khandoli Park" className="bg-gray-800">Khandoli Park</option>
                                    <option value="Getalsud Dam" className="bg-gray-800">Getalsud Dam</option>
                                    <option value="Sidhoo Kanho Park" className="bg-gray-800">Sidhoo Kanho Park</option>
                                    <option value="Tilaiya Dam" className="bg-gray-800">Tilaiya Dam</option>
                                    <option value="Tapkeshwar Temple" className="bg-gray-800">Tapkeshwar Temple</option>
                                    <option value="Birsa Munda Museum" className="bg-gray-800">Birsa Munda Museum</option>
                                    <option value="Panchet Dam" className="bg-gray-800">Panchet Dam</option>
                                    <option value="Phusro" className="bg-gray-800">Phusro</option>
                                    <option value="Satsang Ashram" className="bg-gray-800">Satsang Ashram</option>
                                    <option value="Tagore Hill" className="bg-gray-800">Tagore Hill</option>
                                    <option value="Itkhori" className="bg-gray-800">Itkhori</option>
                                    <option value="Tenughat Dam" className="bg-gray-800">Tenughat Dam</option>
                                </motion.select>
                            </motion.div>

                            {/* Budget Category Selection */}
                            {formData.destination && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                >
                                    <label htmlFor="budgetCategory" className="flex items-center text-sm font-medium text-gray-300">
                                        <IndianRupee className="w-4 h-4 mr-2 text-yellow-400" />
                                        Budget Category *
                                    </label>
                                    <motion.select
                                        whileFocus={{ scale: 1.02 }}
                                        id="budgetCategory"
                                        name="budgetCategory"
                                        value={formData.budgetCategory}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-white backdrop-blur-sm text-sm sm:text-base"
                                        required
                                    >
                                        <option value="budget" className="bg-gray-800">Budget ({priceCategories?.budget?.range || 'Select destination first'})</option>
                                        <option value="moderate" className="bg-gray-800">Moderate ({priceCategories?.moderate?.range || 'Select destination first'})</option>
                                        <option value="luxury" className="bg-gray-800">Luxury ({priceCategories?.luxury?.range || 'Select destination first'})</option>
                                    </motion.select>
                                </motion.div>
                            )}

                            {/* Price Estimation Display */}
                            {estimatedPrice && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-4 sm:p-6 border border-emerald-500/20 backdrop-blur-sm"
                                >
                                    <div className="flex items-center mb-3">
                                        <IndianRupee className="w-5 h-5 text-emerald-400 mr-2" />
                                        <h3 className="text-lg font-semibold text-emerald-300">Estimated Price</h3>
                                        <Info className="w-4 h-4 text-gray-400 ml-2" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300 text-sm">Per Person:</span>
                                                <span className="text-white font-medium">₹{Math.round(estimatedPrice.pricePerPerson)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300 text-sm">Total ({estimatedPrice.guests} guests):</span>
                                                <span className="text-emerald-400 font-bold text-lg">₹{Math.round(estimatedPrice.totalPrice)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300 text-sm">Category:</span>
                                                <span className="text-blue-400 font-medium">{estimatedPrice.category}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="text-gray-300 text-sm">
                                                <span className="font-medium">Duration:</span> {estimatedPrice.duration}
                                            </div>
                                            <div className="text-gray-300 text-xs">
                                                <span className="font-medium">Includes:</span>
                                                <ul className="mt-1 ml-2">
                                                    {estimatedPrice.included.slice(0, 3).map((item, index) => (
                                                        <li key={index} className="list-disc list-inside">{item}</li>
                                                    ))}
                                                    {estimatedPrice.included.length > 3 && (
                                                        <li className="list-disc list-inside">+{estimatedPrice.included.length - 3} more</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                                        <p className="text-xs text-gray-400 text-center">
                                            * Prices are estimates and may vary based on season, availability, and specific requirements
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Grid for Date and Guests */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Travel Date */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="space-y-2"
                                >
                                    <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-300">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                                        Travel Date *
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white backdrop-blur-sm text-sm sm:text-base"
                                        required
                                    />
                                </motion.div>

                                {/* Number of Guests */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.3 }}
                                    className="space-y-2"
                                >
                                    <label htmlFor="guests" className="flex items-center text-sm font-medium text-gray-300">
                                        <Users className="w-4 h-4 mr-2 text-purple-400" />
                                        Number of Guests *
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="number"
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="20"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base"
                                        placeholder="How many people?"
                                        required
                                    />
                                </motion.div>
                            </div>

                            {/* Special Requests */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                                className="space-y-2"
                            >
                                <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300">
                                    <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                                    Special Requests
                                </label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.02 }}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base"
                                    placeholder="Any special requirements or requests?"
                                />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg focus:ring-4 focus:ring-emerald-300/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2"
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                                            ></motion.div>
                                            <span>Sending...</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="submit"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2"
                                        >
                                            <Send className="w-5 h-5" />
                                            <span>Submit Booking</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Status Messages */}
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center space-x-2 p-4 bg-emerald-900/50 border border-emerald-500/50 rounded-lg backdrop-blur-sm"
                                    >
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        <p className="text-emerald-200">
                                            ✅ Thank you! Your booking request has been received.
                                        </p>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center space-x-2 p-4 bg-red-900/50 border border-red-500/50 rounded-lg backdrop-blur-sm"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <p className="text-red-200">
                                            Sorry, there was an error sending your request. Please try again or contact us directly.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
