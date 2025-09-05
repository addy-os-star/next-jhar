"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RatingComponent({ placeName, onRatingSubmit }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleRatingHover = (value) => {
        setHoverRating(value);
    };

    const handleRatingLeave = () => {
        setHoverRating(0);
    };

    const handleSubmitRating = async () => {
        if (rating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call (replace with actual API call)
        try {
            // Here you would typically send the rating to your backend
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
            
            // For now, we'll just simulate success
            const ratingData = {
                place: placeName,
                rating: rating,
                review: review,
                timestamp: new Date().toISOString()
            };
            
            console.log('Rating submitted:', ratingData);
            
            setSubmitStatus('success');
            setShowForm(false);
            
            if (onRatingSubmit) {
                onRatingSubmit(ratingData);
            }
            
        } catch (error) {
            console.error('Error submitting rating:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRatingText = (value) => {
        switch (value) {
            case 1: return 'Poor';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Very Good';
            case 5: return 'Excellent';
            default: return 'Rate your experience';
        }
    };

    const getRatingColor = (value) => {
        switch (value) {
            case 1: return 'text-red-400';
            case 2: return 'text-orange-400';
            case 3: return 'text-yellow-400';
            case 4: return 'text-blue-400';
            case 5: return 'text-emerald-400';
            default: return 'text-gray-400';
        }
    };

    if (!showForm && submitStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                    <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">Thank You!</h3>
                <p className="text-gray-300">Your rating has been submitted successfully.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
        >
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Rate Your Experience</h3>
                <p className="text-gray-300">How was your visit to <span className="text-emerald-400 font-medium">{placeName}</span>?</p>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center mb-6">
                <div className="flex space-x-2 mb-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <motion.button
                            key={value}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                            onClick={() => handleRatingClick(value)}
                            onMouseEnter={() => handleRatingHover(value)}
                            onMouseLeave={handleRatingLeave}
                        >
                            <Star
                                className={`w-10 h-10 transition-all duration-200 ${
                                    value <= (hoverRating || rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-600 hover:text-yellow-400'
                                }`}
                            />
                        </motion.button>
                    ))}
                </div>
                
                <motion.p
                    key={hoverRating || rating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-lg font-medium ${getRatingColor(hoverRating || rating)}`}
                >
                    {getRatingText(hoverRating || rating)}
                </motion.p>
            </div>

            {/* Review Text Area */}
            <div className="mb-6">
                <label htmlFor="review" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
                    Share your experience (optional)
                </label>
                <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Tell us about your experience, what you liked, suggestions for improvement..."
                />
            </div>

            {/* Submit Button */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Button
                    onClick={handleSubmitRating}
                    disabled={isSubmitting || rating === 0}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg focus:ring-4 focus:ring-emerald-300/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
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
                                <span>Submitting...</span>
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
                                <span>Submit Rating</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex items-center space-x-2 p-4 bg-red-900/50 border border-red-500/50 rounded-lg backdrop-blur-sm"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <p className="text-red-200">
                            Sorry, there was an error submitting your rating. Please try again.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}