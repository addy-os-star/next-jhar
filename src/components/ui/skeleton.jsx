import React from 'react';

// Basic skeleton element
export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 rounded ${className}`}
      {...props}
    />
  );
};

// Card skeleton
export const CardSkeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 ${className}`}>
      <Skeleton className="h-40 sm:h-48 w-full mb-3 sm:mb-4" />
      <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
      <Skeleton className="h-3 sm:h-4 w-full mb-2" />
      <Skeleton className="h-3 sm:h-4 w-2/3" />
    </div>
  );
};

// Hero skeleton
export const HeroSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Skeleton className="h-12 sm:h-14 lg:h-16 w-64 sm:w-80 lg:w-96 mx-auto mb-4 sm:mb-6" />
          <Skeleton className="h-6 sm:h-7 lg:h-8 w-full sm:w-2/3 mx-auto" />
        </div>
      </div>
    </div>
  );
};

// Grid skeleton
export const GridSkeleton = ({ cols = 3, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-4 sm:gap-6 lg:gap-8 ${className}`}>
      {Array.from({ length: cols * 2 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

// Text skeleton
export const TextSkeleton = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton 
          key={index} 
          className={`h-4 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`} 
        />
      ))}
    </div>
  );
};

// Button skeleton
export const ButtonSkeleton = ({ className = "" }) => {
  return (
    <Skeleton className={`h-12 w-32 rounded-full ${className}`} />
  );
};

// Navigation skeleton
export const NavigationSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <ButtonSkeleton key={index} className="h-10 sm:h-12 w-24 sm:w-32" />
      ))}
    </div>
  );
};

// FAQ skeleton
export const FaqSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50">
          <div className="px-8 py-6">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Contact card skeleton
export const ContactCardSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 text-center border border-gray-700/50">
      <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4" />
      <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mx-auto mb-2" />
      <Skeleton className="h-4 sm:h-5 w-20 sm:w-24 mx-auto mb-1" />
      <Skeleton className="h-3 sm:h-4 w-24 sm:w-28 mx-auto" />
    </div>
  );
};

// Form skeleton
export const FormSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
      <Skeleton className="h-6 sm:h-7 lg:h-8 w-36 sm:w-44 lg:w-48 mx-auto mb-6 sm:mb-8" />
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Skeleton className="h-10 sm:h-12 w-full" />
          <Skeleton className="h-10 sm:h-12 w-full" />
        </div>
        <Skeleton className="h-10 sm:h-12 w-full" />
        <Skeleton className="h-24 sm:h-32 w-full" />
        <Skeleton className="h-10 sm:h-12 w-full" />
      </div>
    </div>
  );
};

// Image skeleton
export const ImageSkeleton = ({ className = "" }) => {
  return (
    <Skeleton className={`aspect-video w-full ${className}`} />
  );
};

// List skeleton
export const ListSkeleton = ({ items = 5, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
};

// Weather card skeleton
export const WeatherCardSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-8 text-center border border-gray-700/50">
      <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-32 mx-auto mb-3" />
      <Skeleton className="h-8 w-24 mx-auto mb-3" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

// Emergency contact skeleton
export const EmergencyContactSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 text-center border border-gray-700/50">
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-24 mx-auto mb-2" />
      <Skeleton className="h-8 w-20 mx-auto mb-1" />
      <Skeleton className="h-4 w-28 mx-auto" />
    </div>
  );
};

// Transport option skeleton
export const TransportOptionSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
      <div className="flex items-center mb-4">
        <Skeleton className="w-16 h-16 rounded-full mr-4" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

// Custom skeleton for specific content
export const CustomSkeleton = ({ children, className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
};
