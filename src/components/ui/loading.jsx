import React from 'react';
import { 
  HeroSkeleton, 
  GridSkeleton, 
  NavigationSkeleton, 
  FaqSkeleton, 
  ContactCardSkeleton, 
  FormSkeleton,
  WeatherCardSkeleton,
  EmergencyContactSkeleton,
  TransportOptionSkeleton,
  CardSkeleton,
  TextSkeleton
} from './skeleton';

// Generic page loading component
export const PageLoading = ({ type = "default" }) => {
  switch (type) {
    case "help":
      return <HelpPageLoading />;
    case "home":
      return <HomePageLoading />;
    case "places":
      return <PlacesPageLoading />;
    case "jha-vibes":
      return <JhaVibesPageLoading />;
    default:
      return <DefaultPageLoading />;
  }
};

// Help page loading
export const HelpPageLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NavigationSkeleton />
        <div className="text-center mb-12">
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>
        <FaqSkeleton />
      </div>
    </div>
  );
};

// Home page loading
export const HomePageLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>
        <GridSkeleton cols={3} />
        <div className="mt-16">
          <div className="text-center mb-12">
            <TextSkeleton lines={1} className="max-w-xl mx-auto" />
          </div>
          <GridSkeleton cols={2} />
        </div>
      </div>
    </div>
  );
};

// Places page loading
export const PlacesPageLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>
        <GridSkeleton cols={3} />
        <div className="mt-16">
          <div className="text-center mb-12">
            <TextSkeleton lines={1} className="max-w-xl mx-auto" />
          </div>
          <GridSkeleton cols={2} />
        </div>
      </div>
    </div>
  );
};

// Jha-vibes page loading
export const JhaVibesPageLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>
        <GridSkeleton cols={3} />
        <div className="mt-16">
          <div className="text-center mb-12">
            <TextSkeleton lines={1} className="max-w-xl mx-auto" />
          </div>
          <GridSkeleton cols={2} />
        </div>
      </div>
    </div>
  );
};

// Default page loading
export const DefaultPageLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSkeleton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>
        <GridSkeleton cols={3} />
      </div>
    </div>
  );
};

// Section-specific loading components
export const HelpSectionLoading = ({ section }) => {
  switch (section) {
    case "faqs":
      return <FaqSkeleton />;
    case "travel-tips":
      return <GridSkeleton cols={2} />;
    case "contact":
      return (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ContactCardSkeleton key={index} />
            ))}
          </div>
          <FormSkeleton />
        </div>
      );
    case "emergency":
      return (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <EmergencyContactSkeleton key={index} />
            ))}
          </div>
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
            <TextSkeleton lines={1} className="text-center mb-6" />
            <GridSkeleton cols={2} />
          </div>
        </div>
      );
    case "weather":
      return (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <WeatherCardSkeleton key={index} />
            ))}
          </div>
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
            <TextSkeleton lines={1} className="text-center mb-6" />
            <GridSkeleton cols={2} />
          </div>
        </div>
      );
    case "transport":
      return (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <TransportOptionSkeleton key={index} />
            ))}
          </div>
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
            <TextSkeleton lines={1} className="text-center mb-6" />
            <GridSkeleton cols={3} />
          </div>
        </div>
      );
    case "customs":
      return (
        <div className="space-y-8">
          <GridSkeleton cols={2} />
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
            <TextSkeleton lines={1} className="text-center mb-6" />
            <GridSkeleton cols={2} />
          </div>
        </div>
      );
    default:
      return <FaqSkeleton />;
  }
};

// Loading spinner component
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-600 border-t-green-400`}></div>
    </div>
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};
