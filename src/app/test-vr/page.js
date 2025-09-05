'use client';

import { useState } from 'react';
import GoogleStreetViewVR from '@/components/ui/GoogleStreetViewVR';
import { Eye, Navigation, MapPin } from 'lucide-react';

const testPlace = {
    name: "Ranchi",
    pictureFolder: "Rock garden ranchi",
    coordinates: { lat: 23.3441, lng: 85.3096 }
};

export default function TestVR() {
    const [showVR, setShowVR] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        VR Street View Experience
                    </h1>
                    <p className="text-xl text-gray-300">
                        Immersive 360° VR experience for tourist destinations
                    </p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <Eye className="w-6 h-6 text-purple-400" />
                        VR Features
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-purple-300">VR Controls</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• <strong>Navigation Button:</strong> Toggle Google Street View</li>
                                <li>• <strong>Eye Button:</strong> Toggle VR mode</li>
                                <li>• <strong>Drag:</strong> Look around in 360°</li>
                                <li>• <strong>Scroll:</strong> Zoom in/out (0.5x - 3x)</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-300">Street View Features</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• <strong>Google iframe:</strong> No API key required</li>
                                <li>• <strong>Real locations:</strong> Authentic Street View</li>
                                <li>• <strong>Fallback mode:</strong> VR images when needed</li>
                                <li>• <strong>Seamless toggle:</strong> Switch between modes</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-400" />
                            Test Configuration
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">Place:</p>
                                <p className="font-semibold">{testPlace.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Image Collection:</p>
                                <p className="font-semibold">{testPlace.pictureFolder}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Coordinates:</p>
                                <p className="font-semibold">{testPlace.coordinates.lat}, {testPlace.coordinates.lng}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button
                            onClick={() => setShowVR(true)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                            <Eye className="w-6 h-6" />
                            Launch VR Experience
                        </button>
                    </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-yellow-400" />
                        Debug Information
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="text-gray-400">VR Modal Status:</span> <span className={showVR ? 'text-green-400' : 'text-red-400'}>{showVR ? 'Open' : 'Closed'}</span></p>
                        <p><span className="text-gray-400">Browser Console:</span> <span className="text-blue-400">Check for detailed logs</span></p>
                        <p><span className="text-gray-400">Image Loading:</span> <span className="text-purple-400">Automatic fallback to VR mode</span></p>
                        <p><span className="text-gray-400">Google Street View:</span> <span className="text-green-400">Available via iframe (no API key needed)</span></p>
                    </div>
                </div>
            </div>
            
            <GoogleStreetViewVR 
                place={testPlace}
                isOpen={showVR}
                onClose={() => setShowVR(false)}
            />
        </div>
    );
}