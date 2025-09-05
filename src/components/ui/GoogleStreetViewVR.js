'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, MapPin, Eye, RotateCcw, RotateCw, ZoomIn, ZoomOut, AlertTriangle, Move } from 'lucide-react';
import { getPlaceImages } from '@/lib/imageUtils';

const GoogleStreetViewVR = ({ place, isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [streetViewAvailable, setStreetViewAvailable] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);
    const [fallbackMode, setFallbackMode] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [streetViewMode, setStreetViewMode] = useState(false);
    const [vrMode, setVrMode] = useState(false);
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const streetViewRef = useRef(null);
    const panoramaRef = useRef(null);
    const vrContainerRef = useRef(null);
    const fallbackImages = getPlaceImages(place.pictureFolder) || [];
    
    console.log('GoogleStreetViewVR rendered:', { 
        placeName: place.name, 
        pictureFolder: place.pictureFolder, 
        isOpen, 
        fallbackImagesCount: fallbackImages.length 
    });

    useEffect(() => {
        console.log('UseEffect triggered:', { isOpen, placeName: place.name });
        if (!isOpen) return;
        
        // Start in VR mode with fallback images
        setIsLoading(true);
        setVrMode(true);
        setFallbackMode(true);
        setStreetViewMode(false);
        
        // Simulate loading for better UX
        setTimeout(() => {
            setIsLoading(false);
            initializeFallbackView();
        }, 1000);
    }, [isOpen, place]);

    // Generate Google Street View iframe URL
    const getStreetViewURL = (coordinates) => {
        const lat = coordinates.lat;
        const lng = coordinates.lng;
        // Using Google Street View embed URL without API key
        return `https://www.google.com/maps/embed?pb=!4v1609876543210!6m8!1m7!1s0x0:0x0!2m2!1d${lat}!2d${lng}!3f0!4f0!5f0.7518454740332859`;
    };

    // Toggle Street View iframe mode
    const toggleStreetView = () => {
        const newStreetViewMode = !streetViewMode;
        setStreetViewMode(newStreetViewMode);
        
        if (newStreetViewMode) {
            setVrMode(false);
            setFallbackMode(false);
        } else {
            setVrMode(true);
            setFallbackMode(true);
        }
    };

    // Toggle VR mode
    const toggleVRMode = () => {
        setVrMode(!vrMode);
        if (!vrMode) {
            resetVRView();
        }
    };

    // Load Google Maps JavaScript API with proper error handling
    const loadGoogleMapsAPI = () => {
        // Check if API is already loaded
        if (window.google && window.google.maps) {
            initializeStreetView();
            return;
        }

        // Check for valid API key
        const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        console.log('Google Maps API key status:', GOOGLE_MAPS_API_KEY ? 'Available' : 'Not configured');
        
        // If no valid API key is available, continue with VR fallback (already initialized)
        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'demo' || GOOGLE_MAPS_API_KEY === '') {
            console.warn('Google Maps API key not configured. Continuing with VR image view.');
            return;
        }

        // Prevent loading multiple scripts
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
        script.async = true;
        script.onload = () => {
            if (window.google && window.google.maps) {
                initializeStreetView();
            } else {
                handleAPIError('Google Maps API failed to load properly');
            }
        };
        script.onerror = (error) => {
            console.error('Failed to load Google Maps API:', error);
            handleAPIError('Failed to load Google Maps API - Invalid API key or network error');
        };
        document.head.appendChild(script);
    };

    // Handle API errors and fallback
    const handleAPIError = (errorMessage) => {
        console.warn('API Error, continuing with VR mode:', errorMessage);
        // Don't show error in VR mode, just continue with images
    };

    const initializeStreetView = () => {
        if (!streetViewRef.current || !window.google) {
            handleAPIError('Google Maps not available');
            return;
        }

        try {
            const coordinates = place.coordinates || getDefaultCoordinates(place.name);
            const streetViewService = new google.maps.StreetViewService();
            const location = new google.maps.LatLng(coordinates.lat, coordinates.lng);

            streetViewService.getPanorama({
                location: location,
                radius: 1000,
                preference: google.maps.StreetViewPreference.NEAREST
            }, (data, status) => {
                if (status === google.maps.StreetViewStatus.OK) {
                    setStreetViewAvailable(true);
                    setCurrentLocation(data.location);
                    setError(null);
                    
                    const panorama = new google.maps.StreetViewPanorama(streetViewRef.current, {
                        position: data.location.latLng,
                        pov: { heading: 0, pitch: 0 },
                        zoom: 1,
                        addressControl: false,
                        linksControl: true,
                        panControl: false,
                        enableCloseButton: false,
                        fullscreenControl: false,
                        motionTracking: true,
                        showRoadLabels: false,
                        clickToGo: true,
                        scrollwheel: true,
                        zoomControl: true
                    });

                    panoramaRef.current = panorama;
                    setIsLoading(false);
                } else if (status === google.maps.StreetViewStatus.ZERO_RESULTS) {
                    console.log('No Street View available for this location, trying satellite view');
                    setStreetViewAvailable(false);
                    setIsLoading(false);
                    initializeSatelliteView(coordinates);
                } else {
                    console.error('Street View error:', status);
                    handleAPIError(`Street View unavailable: ${status}`);
                }
            });
        } catch (error) {
            console.error('Error initializing Street View:', error);
            handleAPIError('Error initializing Google Street View');
        }
    };

    const initializeSatelliteView = (coordinates) => {
        if (!streetViewRef.current || !window.google) {
            handleAPIError('Google Maps not available for satellite view');
            return;
        }

        try {
            const map = new google.maps.Map(streetViewRef.current, {
                center: coordinates,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                disableDefaultUI: true,
                zoomControl: true,
                scrollwheel: true
            });

            new google.maps.Marker({
                position: coordinates,
                map: map,
                title: place.name
            });
        } catch (error) {
            console.error('Error initializing satellite view:', error);
            handleAPIError('Error loading satellite view');
        }
    };

    // Initialize immersive VR 360° image view
    const initializeFallbackView = () => {
        console.log('Initializing VR 360° image view for:', place.name);
        console.log('Picture folder:', place.pictureFolder);
        console.log('Fallback images:', fallbackImages);
        setFallbackMode(true);
        setVrMode(true);
        setCurrentImageIndex(0);
        setRotationX(0);
        setRotationY(0);
        setZoom(1);
    };

    // VR Controls
    const handleMouseDown = (e) => {
        if (!vrMode) return;
        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!vrMode || !isDragging) return;
        
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        
        setRotationY(prev => prev + deltaX * 0.5);
        setRotationX(prev => Math.max(-45, Math.min(45, prev - deltaY * 0.5)));
        
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        if (!vrMode) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };

    const resetVRView = () => {
        setRotationX(0);
        setRotationY(0);
        setZoom(1);
    };

    // Navigate through fallback images
    const nextImage = () => {
        if (fallbackImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % fallbackImages.length);
        }
    };

    const prevImage = () => {
        if (fallbackImages.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + fallbackImages.length) % fallbackImages.length);
        }
    };

    const getDefaultCoordinates = (placeName) => {
        const coordinates = {
            'Ranchi': { lat: 23.3441, lng: 85.3096 },
            'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
            'Dhanbad': { lat: 23.7957, lng: 86.4304 },
            'Deoghar': { lat: 24.4824, lng: 86.6906 },
            'Netarhat': { lat: 23.4667, lng: 84.2667 },
            'Hazaribagh': { lat: 23.9931, lng: 85.3594 },
            'Dalma Wildlife Sanctuary': { lat: 22.8838, lng: 86.1103 },
            'Jubilee Park': { lat: 22.7868, lng: 86.1890 },
            'Kanke Dam': { lat: 23.4261, lng: 85.3200 },
            'Dumka': { lat: 24.2676, lng: 87.2497 },
            'Ghatshila': { lat: 22.5833, lng: 86.4667 },
            'Lodh Falls': { lat: 23.5167, lng: 84.2333 },
            'Maluti Temples': { lat: 24.3189, lng: 87.3042 },
            'Usri Falls': { lat: 23.3000, lng: 85.1000 },
            'Topchanchi Lake': { lat: 23.9167, lng: 86.2833 }
        };
        return coordinates[placeName] || { lat: 23.3441, lng: 85.3096 };
    };

    const resetView = () => {
        if (panoramaRef.current) {
            panoramaRef.current.setPov({ heading: 0, pitch: 0 });
            panoramaRef.current.setZoom(1);
        }
    };

    const adjustHeading = (delta) => {
        if (panoramaRef.current) {
            const currentPov = panoramaRef.current.getPov();
            panoramaRef.current.setPov({
                heading: (currentPov.heading + delta) % 360,
                pitch: currentPov.pitch
            });
        }
    };

    if (!isOpen) {
        console.log('GoogleStreetViewVR not open, returning null');
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black"
            >
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="absolute inset-0 bg-black"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/90 to-transparent p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {vrMode ? (
                                        <Eye className="w-5 h-5 text-purple-400" />
                                    ) : fallbackMode ? (
                                        <Eye className="w-5 h-5 text-purple-400" />
                                    ) : (
                                        <Navigation className="w-5 h-5 text-blue-400" />
                                    )}
                                    {vrMode ? 'VR Experience' : fallbackMode ? '360° Image View' : streetViewAvailable ? 'Google Street View VR' : 'Satellite View'} - {place.name}
                                </h2>
                                <p className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {vrMode ? 'Immersive VR experience with mouse/touch controls' : fallbackMode ? 'Interactive image gallery experience' : 'Real location experience powered by Google Maps'}
                                </p>
                                {error && (
                                    <p className="text-yellow-400 text-xs mt-1 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-white text-lg">Loading {place.name}...</p>
                                <p className="text-gray-400 text-sm mt-2">Searching for Street View...</p>
                            </div>
                        </div>
                    )}

                    {/* Main Content Area */}
                    {streetViewMode ? (
                        /* Google Street View iframe */
                        <div className="w-full h-full relative bg-black">
                            <iframe
                                src={getStreetViewURL(place.coordinates || getDefaultCoordinates(place.name))}
                                className="w-full h-full border-0"
                                style={{ minHeight: '100vh' }}
                                title={`${place.name} Street View`}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            
                            {/* Street View Overlay */}
                            <div className="absolute top-24 left-4 z-20">
                                <div className="bg-green-600/70 backdrop-blur-md rounded-lg px-3 py-2">
                                    <span className="text-white text-sm font-semibold">
                                        GOOGLE STREET VIEW
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full relative overflow-hidden bg-black">
                            {fallbackImages.length > 0 ? (
                                <>
                                    <div 
                                        ref={vrContainerRef}
                                        className="w-full h-full cursor-move select-none"
                                        style={{
                                            backgroundImage: `url(${fallbackImages[currentImageIndex]})`,
                                            backgroundSize: vrMode ? `${200 * zoom}% ${200 * zoom}%` : 'cover',
                                            backgroundPosition: vrMode ? 
                                                `${50 + rotationY * 0.2}% ${50 + rotationX * 0.2}%` : 
                                                'center',
                                            backgroundRepeat: 'no-repeat',
                                            transform: vrMode ? 
                                                `perspective(1000px) rotateX(${rotationX * 0.1}deg) rotateY(${rotationY * 0.1}deg) scale(${zoom})` : 
                                                'none',
                                            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                                            minHeight: '100vh'
                                        }}
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                        onWheel={handleWheel}
                                    />
                                    
                                    {/* VR Overlay Effects */}
                                    {vrMode && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white/50 rounded-full pointer-events-none" />
                                        </>
                                    )}
                                    
                                    {/* Image counter */}
                                    <div className="absolute top-24 left-4 z-20">
                                        <div className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2">
                                            <span className="text-white text-sm">
                                                {currentImageIndex + 1} / {fallbackImages.length}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* VR Mode Indicator */}
                                    {vrMode && (
                                        <div className="absolute top-24 right-4 z-20">
                                            <div className="bg-purple-600/70 backdrop-blur-md rounded-lg px-3 py-2">
                                                <span className="text-white text-sm font-semibold">
                                                    VR MODE
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Instructions */}
                                    {vrMode && (
                                        <div className="absolute bottom-24 left-4 z-20">
                                            <div className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2">
                                                <div className="text-white text-xs space-y-1">
                                                    <p><Move className="w-3 h-3 inline mr-1" />Drag to look around</p>
                                                    <p><ZoomIn className="w-3 h-3 inline mr-1" />Scroll to zoom</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Navigation arrows - only in non-VR mode */}
                                    {!vrMode && fallbackImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                                            >
                                                <RotateCcw className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                                            >
                                                <RotateCw className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-center">
                                    <div className="text-white">
                                        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                                        <h3 className="text-xl font-bold mb-2">No Images Available</h3>
                                        <p className="text-gray-300">No images found for {place.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VR Controls */}
                    {!isLoading && (fallbackMode || vrMode) && fallbackImages.length > 0 && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-6 py-3">
                                <button
                                    onClick={toggleVRMode}
                                    className={`transition-colors p-2 hover:bg-white/10 rounded-full ${
                                        vrMode ? 'text-purple-400 bg-purple-500/20' : 'text-white hover:text-purple-400'
                                    }`}
                                    title={vrMode ? 'Exit VR Mode' : 'Enter VR Mode'}
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                
                                {vrMode ? (
                                    <>
                                        <button
                                            onClick={resetVRView}
                                            className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                            title="Reset View"
                                        >
                                            <Navigation className="w-5 h-5" />
                                        </button>
                                        
                                        <button
                                            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                                            className="text-white hover:text-green-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                            title="Zoom Out"
                                        >
                                            <ZoomOut className="w-5 h-5" />
                                        </button>
                                        
                                        <button
                                            onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
                                            className="text-white hover:text-green-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                            title="Zoom In"
                                        >
                                            <ZoomIn className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                            title="Previous Image"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                        </button>
                                        
                                        <span className="text-white text-sm px-3">
                                            {currentImageIndex + 1} / {fallbackImages.length}
                                        </span>
                                        
                                        <button
                                            onClick={nextImage}
                                            className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                            title="Next Image"
                                        >
                                            <RotateCw className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* Google Street View Controls */}
                    {!isLoading && !fallbackMode && !vrMode && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-6 py-3">
                                <button
                                    onClick={() => adjustHeading(-30)}
                                    className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                    title="Look Left"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                
                                <button
                                    onClick={resetView}
                                    className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                    title="Reset View"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                
                                <button
                                    onClick={() => adjustHeading(30)}
                                    className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                    title="Look Right"
                                >
                                    <RotateCw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Status */}
                    {!isLoading && (
                        <div className="absolute top-20 right-4 z-20">
                            <div className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                        streetViewMode ? 'bg-green-500 animate-pulse' : vrMode ? 'bg-purple-500 animate-pulse' : fallbackMode ? 'bg-purple-500 animate-pulse' : 'bg-yellow-500'
                                    }`}></div>
                                    <span className="text-white text-xs">
                                        {streetViewMode ? 'Google Street View' : vrMode ? 'VR Mode' : fallbackMode ? '360° Images' : 'Satellite View'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GoogleStreetViewVR;