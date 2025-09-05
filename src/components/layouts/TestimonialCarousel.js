'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Fake testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: '/logo-1.jpeg',
    rating: 5,
    comment: 'Visiting Jharkhand was a revelation! The waterfalls and forests are breathtaking. Definitely coming back for more adventures.',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Mumbai',
    avatar: '/logo-2.jpeg',
    rating: 4,
    comment: 'The tribal culture and heritage sites in Jharkhand are fascinating. I loved the authentic food and warm hospitality of the locals.',
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    location: 'Bangalore',
    avatar: '/logo-3.jpeg',
    rating: 5,
    comment: 'Ranchi was such a pleasant surprise with its cool climate and beautiful landscapes. The Hundru Falls was the highlight of my trip!',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Jaipur',
    avatar: '/logo-1.jpeg',
    rating: 5,
    comment: 'The spiritual energy at Baidyanath Dham in Deoghar was incredible. A must-visit for anyone seeking peace and tranquility.',
  },
  {
    id: 5,
    name: 'Meera Patel',
    location: 'Ahmedabad',
    avatar: '/logo-5.jpeg',
    rating: 4,
    comment: 'Jamshedpur is such a clean and well-planned city. The Jubilee Park and Dimna Lake were beautiful spots to relax and unwind.',
  },
  {
    id: 6,
    name: 'Arjun Nair',
    location: 'Kochi',
    avatar: '/logo-2.jpeg',
    rating: 5,
    comment: 'The adventure sports options in Jharkhand are amazing! Tried rock climbing and trekking - absolutely thrilling experiences.',
  },
  {
    id: 7,
    name: 'Neha Kapoor',
    location: 'Chandigarh',
    avatar: '/logo-3.jpeg',
    rating: 4,
    comment: 'The handicrafts and tribal art of Jharkhand are unique and beautiful. Brought back some amazing souvenirs for my family.',
  },
  {
    id: 8,
    name: 'Rajesh Kumar',
    location: 'Patna',
    avatar: '/logo-1.jpeg',
    rating: 5,
    comment: 'The Netarhat hill station is truly the "Queen of Chotanagpur". The sunrise view from there is something I will never forget.',
  },
  {
    id: 9,
    name: 'Sunita Reddy',
    location: 'Hyderabad',
    avatar: '/logo-2.jpeg',
    rating: 4,
    comment: 'The tribal dances and music performances in Jharkhand showcase such rich cultural heritage. It was a truly immersive experience.',
  },
  {
    id: 10,
    name: 'Amit Khanna',
    location: 'Kolkata',
    avatar: '/logo-5.jpeg',
    rating: 5,
    comment: 'The Parasnath Hill and Jain temples were spiritually uplifting. The peaceful atmosphere and natural beauty are unmatched.',
  },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState([]);
  
  // Number of testimonials to show at once based on screen size
  const [itemsToShow, setItemsToShow] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    // Update visible testimonials when activeIndex or itemsToShow changes
    const visibleItems = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    setVisibleTestimonials(visibleItems);
  }, [activeIndex, itemsToShow]);
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div id="testimonials" className="w-full py-12">
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">
          What People Say About <span className="text-blue-400">Jharkhand</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">Real experiences from our visitors</p>
        
        {/* Testimonial Cards */}
        <div className="relative">
          <div className="flex justify-center gap-6 overflow-hidden">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transform transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 italic">&ldquo;{testimonial.comment}&rdquo;</p>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full p-2 shadow-lg z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full p-2 shadow-lg z-10"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index >= activeIndex && index < activeIndex + itemsToShow
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}