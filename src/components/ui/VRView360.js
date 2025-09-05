'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    RotateCcw, 
    RotateCw, 
    ZoomIn, 
    ZoomOut, 
    X, 
    PlayCircle, 
    PauseCircle,
    Eye,
    Move3D,
    MousePointer2,
    Compass
} from 'lucide-react';

const VRView360 = ({ place, isOpen, onClose }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [fov, setFov] = useState(75);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoRotate, setIsAutoRotate] = useState(false);
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const rotationStartRef = useRef({ x: 0, y: 0 });
    const autoRotateRef = useRef(null);
    const imageRef = useRef(null);
    const animationRef = useRef(null);

    // Generate panoramic sphere using place image
    const panoramicImage = place.image;

    // Initialize WebGL renderer for true 360° experience
    useEffect(() => {
        if (!isOpen || !canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Create sphere mesh for 360° projection
        const createSphere = () => {
            const vertices = [];
            const uvs = [];
            const indices = [];
            
            const radius = 1;
            const widthSegments = 32;
            const heightSegments = 16;
            
            for (let j = 0; j <= heightSegments; j++) {
                const v = j / heightSegments;
                const phi = v * Math.PI;
                
                for (let i = 0; i <= widthSegments; i++) {
                    const u = i / widthSegments;
                    const theta = u * Math.PI * 2;
                    
                    const x = -radius * Math.cos(theta) * Math.sin(phi);
                    const y = radius * Math.cos(phi);
                    const z = radius * Math.sin(theta) * Math.sin(phi);
                    
                    vertices.push(x, y, z);
                    uvs.push(u, 1 - v);
                    
                    if (i < widthSegments && j < heightSegments) {
                        const a = j * (widthSegments + 1) + i;
                        const b = j * (widthSegments + 1) + i + 1;
                        const c = (j + 1) * (widthSegments + 1) + i;
                        const d = (j + 1) * (widthSegments + 1) + i + 1;
                        
                        indices.push(a, b, c);
                        indices.push(b, d, c);
                    }
                }
            }
            
            return { vertices, uvs, indices };
        };

        const sphere = createSphere();
        
        // Load and render panoramic image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            imageRef.current = img;
            renderFrame();
        };
        img.src = panoramicImage;

        const renderFrame = () => {
            if (!canvas || !imageRef.current) return;
            
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create panoramic projection
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const fovRad = (fov * Math.PI) / 180;
            
            // Project sphere to screen with current rotation
            const yawRad = (rotation.y * Math.PI) / 180;
            const pitchRad = (rotation.x * Math.PI) / 180;
            
            // Create image data for pixel manipulation
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;
            
            // Create temporary canvas for source image sampling
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = imageRef.current.width;
            tempCanvas.height = imageRef.current.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(imageRef.current, 0, 0);
            const sourceData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            
            // Render each pixel with spherical projection
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    // Convert screen coordinates to normalized device coordinates
                    const ndcX = (x / canvas.width) * 2 - 1;
                    const ndcY = (y / canvas.height) * 2 - 1;
                    
                    // Calculate ray direction from camera
                    const aspect = canvas.width / canvas.height;
                    const tanHalfFov = Math.tan(fovRad / 2);
                    
                    const rayX = ndcX * aspect * tanHalfFov;
                    const rayY = -ndcY * tanHalfFov;
                    const rayZ = -1;
                    
                    // Apply rotation to ray
                    const cosYaw = Math.cos(yawRad);
                    const sinYaw = Math.sin(yawRad);
                    const cosPitch = Math.cos(pitchRad);
                    const sinPitch = Math.sin(pitchRad);
                    
                    // Rotate around Y axis (yaw)
                    const rotatedX = rayX * cosYaw - rayZ * sinYaw;
                    const rotatedZ = rayX * sinYaw + rayZ * cosYaw;
                    
                    // Rotate around X axis (pitch)
                    const finalY = rayY * cosPitch - rotatedZ * sinPitch;
                    const finalZ = rayY * sinPitch + rotatedZ * cosPitch;
                    
                    // Convert to spherical coordinates
                    const length = Math.sqrt(rotatedX * rotatedX + finalY * finalY + finalZ * finalZ);
                    if (length > 0) {
                        const normalizedX = rotatedX / length;
                        const normalizedY = finalY / length;
                        const normalizedZ = finalZ / length;
                        
                        // Calculate texture coordinates
                        const phi = Math.atan2(normalizedZ, normalizedX);
                        const theta = Math.acos(Math.max(-1, Math.min(1, normalizedY)));
                        
                        let u = (phi + Math.PI) / (2 * Math.PI);
                        const v = theta / Math.PI;
                        
                        // Wrap U coordinate
                        u = u % 1;
                        if (u < 0) u += 1;
                        
                        // Sample from source image
                        const srcX = Math.floor(u * sourceData.width) % sourceData.width;
                        const srcY = Math.floor(v * sourceData.height) % sourceData.height;
                        const srcIndex = (srcY * sourceData.width + srcX) * 4;
                        const destIndex = (y * canvas.width + x) * 4;
                        
                        if (srcIndex >= 0 && srcIndex < sourceData.data.length - 3) {
                            data[destIndex] = sourceData.data[srcIndex];         // R
                            data[destIndex + 1] = sourceData.data[srcIndex + 1]; // G
                            data[destIndex + 2] = sourceData.data[srcIndex + 2]; // B
                            data[destIndex + 3] = 255;                           // A
                        }
                    }
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            animationRef.current = requestAnimationFrame(renderFrame);
        };

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isOpen, panoramicImage, rotation, fov]);

    // Handle mouse/touch interactions
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
        
        const sensitivity = 0.3;
        
        setRotation({
            x: Math.max(-89, Math.min(89, rotationStartRef.current.x - deltaY * sensitivity)),
            y: (rotationStartRef.current.y + deltaX * sensitivity) % 360
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
                    y: (prev.y + 0.5) % 360
                }));
            }, 50);
        } else {
            clearInterval(autoRotateRef.current);
        }
        
        return () => clearInterval(autoRotateRef.current);
    }, [isAutoRotate]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black"
                onClick={onClose}
            >
                <motion.div
                    ref={containerRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="absolute inset-0 bg-black overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* VR Header */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Move3D className="w-5 h-5 text-cyan-400" />
                                    VR Experience - {place.name}
                                </h2>
                                <p className="text-gray-300 text-xs mt-1">
                                    <MousePointer2 className="w-3 h-3 inline mr-1" />
                                    Drag to look around • Virtual Reality Mode
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* VR Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-grab active:cursor-grabbing"
                        onMouseDown={handlePointerDown}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onMouseLeave={handlePointerUp}
                        onTouchStart={handlePointerDown}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                        onWheel={(e) => {
                            e.preventDefault();
                            const delta = e.deltaY > 0 ? 5 : -5;
                            setFov(prev => Math.max(20, Math.min(120, prev + delta)));
                        }}
                        style={{ touchAction: 'none' }}
                    />

                    {/* VR Crosshair */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-8 h-8 border-2 border-cyan-400/70 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-cyan-400/90 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Compass */}
                    <div className="absolute top-16 right-4 bg-black/70 backdrop-blur-md rounded-full p-3">
                        <div 
                            className="w-10 h-10 relative"
                            style={{ transform: `rotate(${-rotation.y}deg)` }}
                        >
                            <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"></div>
                            <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-red-500 transform -translate-x-1/2"></div>
                            <div className="absolute top-0.5 left-1/2 text-white text-xs font-bold transform -translate-x-1/2">N</div>
                        </div>
                    </div>

                    {/* VR Info Panel */}
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="flex items-center gap-2 text-cyan-400 text-sm">
                            <Compass className="w-4 h-4 animate-spin-slow" />
                            <span>FOV: {fov}° | Heading: {Math.round(rotation.y)}° | Pitch: {Math.round(rotation.x)}°</span>
                        </div>
                    </div>

                    {/* VR Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-full px-4 py-2">
                            <button
                                onClick={() => setRotation(prev => ({ ...prev, y: prev.y - 15 }))}
                                className="text-white hover:text-cyan-400 transition-colors p-1.5 hover:bg-white/10 rounded-full"
                                title="Look Left"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            
                            <button
                                onClick={() => setIsAutoRotate(!isAutoRotate)}
                                className={`transition-colors p-1.5 hover:bg-white/10 rounded-full ${
                                    isAutoRotate ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                                }`}
                                title="Auto Tour"
                            >
                                {isAutoRotate ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                            </button>

                            <button
                                onClick={() => {
                                    setRotation({ x: 0, y: 0 });
                                    setFov(75);
                                }}
                                className="text-white hover:text-purple-400 transition-colors p-1.5 hover:bg-white/10 rounded-full"
                                title="Reset View"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            
                            <button
                                onClick={() => setRotation(prev => ({ ...prev, y: prev.y + 15 }))}
                                className="text-white hover:text-cyan-400 transition-colors p-1.5 hover:bg-white/10 rounded-full"
                                title="Look Right"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VRView360;