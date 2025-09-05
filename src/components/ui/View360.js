'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    RotateCcw, 
    RotateCw, 
    ZoomIn, 
    ZoomOut, 
    Maximize, 
    Minimize, 
    X, 
    PlayCircle, 
    PauseCircle,
    RotateCw as Rotate360,
    Eye
} from 'lucide-react';
import { getPlaceImages } from '@/lib/imageUtils';

const View360 = ({ place, isOpen, onClose }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoRotate, setIsAutoRotate] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const rotationStartRef = useRef({ x: 0, y: 0 });
    const autoRotateRef = useRef(null);

    // Generate 360-degree images based on place data
    const generate360Images = (place) => {
        if (place.pictureFolder) {
            // Get all images for the place from imageUtils
            const allImages = getPlaceImages(place.pictureFolder);
            
            if (allImages.length > 0) {
                const targetImageCount = 12; // Ideal number for smooth 360 rotation
                let images360 = [];
                
                // If we have enough images, use them
                if (allImages.length >= targetImageCount) {
                    images360 = allImages.slice(0, targetImageCount);
                } else {
                    // If we have fewer images, repeat them to create a smoother 360 experience
                    for (let i = 0; i < targetImageCount; i++) {
                        images360.push(allImages[i % allImages.length]);
                    }
                }
                
                return images360;
            }
        }
        
        // Fallback to main image if no picture folder or images found
        return [place.image];
    };

    const images360 = generate360Images(place);

    // Handle mouse/touch events for dragging
    const handlePointerDown = (e) => {
        setIsDragging(true);
        setIsAutoRotate(false);
        
        const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
        const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
        
        dragStartRef.current = { x: clientX, y: clientY };
        rotationStartRef.current = { ...rotation };
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        
        const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
        const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
        
        const deltaX = clientX - dragStartRef.current.x;
        const deltaY = clientY - dragStartRef.current.y;
        
        setRotation({
            x: Math.max(-90, Math.min(90, rotationStartRef.current.x - deltaY * 0.5)),
            y: (rotationStartRef.current.y + deltaX * 0.5) % 360
        });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Auto rotation
    useEffect(() => {
        if (isAutoRotate) {
            autoRotateRef.current = setInterval(() => {
                setRotation(prev => ({
                    ...prev,
                    y: (prev.y + 1) % 360
                }));
            }, 50);
        } else {
            clearInterval(autoRotateRef.current);
        }
        
        return () => clearInterval(autoRotateRef.current);
    }, [isAutoRotate]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearInterval(autoRotateRef.current);
        };
    }, []);

    // Handle fullscreen
    const toggleFullscreen = () => {
        if (!isFullscreen && containerRef.current) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    // Get current image based on rotation
    const getCurrentImageIndex = () => {
        const normalizedY = ((rotation.y % 360) + 360) % 360;
        return Math.floor((normalizedY / 360) * images360.length);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    ref={containerRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="absolute inset-4 bg-gray-900 rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-blue-400" />
                                    360° View - {place.name}
                                </h2>
                                <p className="text-gray-300 text-sm mt-1">
                                    Drag to explore • Scroll to zoom • Click controls to interact
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* 360 View Container */}
                    <div
                        className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                        onMouseDown={handlePointerDown}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onMouseLeave={handlePointerUp}
                        onTouchStart={handlePointerDown}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                        onWheel={(e) => {
                            e.preventDefault();
                            const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
                            setZoom(prev => Math.max(0.5, Math.min(3, prev + zoomDelta)));
                        }}
                    >
                        {/* 360 Image Display */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                transform: `scale(${zoom})`,
                                transformOrigin: 'center',
                            }}
                            animate={{
                                rotateX: rotation.x,
                                rotateY: rotation.y,
                            }}
                            transition={{ type: "tween", duration: 0.1 }}
                        >
                            <img
                                src={images360[getCurrentImageIndex()]}
                                alt={`360 view of ${place.name}`}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Panoramic Indicator */}
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                            <div className="flex items-center gap-2 text-white text-sm">
                                <Rotate360 className="w-4 h-4 animate-spin-slow" />
                                <span>360° {Math.round(rotation.y)}°</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-6 py-3">
                            {/* Rotation Controls */}
                            <button
                                onClick={() => setRotation(prev => ({ ...prev, y: prev.y - 15 }))}
                                className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                title="Rotate Left"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            
                            <button
                                onClick={() => setRotation(prev => ({ ...prev, y: prev.y + 15 }))}
                                className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                title="Rotate Right"
                            >
                                <RotateCw className="w-5 h-5" />
                            </button>

                            {/* Divider */}
                            <div className="w-px h-6 bg-white/20"></div>

                            {/* Zoom Controls */}
                            <button
                                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                                className="text-white hover:text-green-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            
                            <span className="text-white text-sm px-2">
                                {Math.round(zoom * 100)}%
                            </span>
                            
                            <button
                                onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
                                className="text-white hover:text-green-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                title="Zoom In"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>

                            {/* Divider */}
                            <div className="w-px h-6 bg-white/20"></div>

                            {/* Auto Rotate */}
                            <button
                                onClick={() => setIsAutoRotate(!isAutoRotate)}
                                className={`transition-colors p-2 hover:bg-white/10 rounded-full ${
                                    isAutoRotate ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                                }`}
                                title="Auto Rotate"
                            >
                                {isAutoRotate ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                            </button>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                                title="Toggle Fullscreen"
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="absolute top-20 right-6 z-20 bg-black/60 backdrop-blur-md rounded-xl p-4 max-w-xs">
                        <h3 className="text-white font-semibold mb-2">Navigation Tips</h3>
                        <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Drag to rotate view</li>
                            <li>• Scroll to zoom in/out</li>
                            <li>• Use controls for precise movement</li>
                            <li>• Enable auto-rotate for hands-free viewing</li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default View360;