'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RatingComponent from '@/components/RatingComponent';

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeId = searchParams.get('placeId');
  const [mounted, setMounted] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show rating form after a short delay
    const timer = setTimeout(() => {
      setShowRating(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRatingSubmit = (ratingData) => {
    console.log('Rating submitted for:', placeId, ratingData);
    setRatingSubmitted(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/70"></div>
      </div>

      {/* Main content card with 3D effect */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          duration: 0.8 
        }}
        className="relative z-10 bg-black/20 backdrop-blur-xl p-12 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.5)] text-center max-w-md w-full mx-4 border border-white/10"
      >
        {/* Success icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-emerald-500/30"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold bg-gradient-to-r from-emerald-300 to-blue-400 bg-clip-text text-transparent mb-6"
        >
          Thank You!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-300 mb-10 text-lg"
        >
          Your submission has been received successfully.
        </motion.p>
        
        <div className="space-y-5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-lg py-7 rounded-2xl shadow-lg shadow-emerald-700/20 border border-emerald-600/20"
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg py-7 rounded-2xl shadow-lg shadow-blue-700/20 border border-blue-600/20"
              onClick={() => router.push(`/places/${placeId?.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              View Place Details
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Rating Component */}
      <AnimatePresence>
        {showRating && !ratingSubmitted && placeId && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 0.8 
            }}
            className="relative z-10 max-w-md w-full mx-4 mt-6"
          >
            <RatingComponent 
              placeName={placeId} 
              onRatingSubmit={handleRatingSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Thank You Message */}
      <AnimatePresence>
        {ratingSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mt-6 text-center"
          >
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Thank you for helping us improve! 🌟
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}