"use client";
import { useState, useEffect } from "react";
import { SunIcon, CloudIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function WeatherWidget() {
    const [show, setShow] = useState(false);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch weather for Ranchi, Jharkhand (Open-Meteo API)
        setLoading(true);
        fetch("https://api.open-meteo.com/v1/forecast?latitude=23.3441&longitude=85.3096&current_weather=true")
            .then(res => res.json())
            .then(data => {
                setWeather(data.current_weather);
                setLoading(false);
            })
            .catch(() => {
                setWeather(null);
                setLoading(false);
            });
    }, []);

    const getWeatherIcon = () => {
        if (!weather) return <SunIcon className="w-6 h-6" />;
        return weather.weathercode === 0 ? 
            <SunIcon className="w-6 h-6" /> : 
            <CloudIcon className="w-6 h-6" />;
    };

    const getWeatherCondition = () => {
        if (!weather) return "Unknown";
        if (weather.weathercode === 0) return "Clear";
        if (weather.weathercode <= 3) return "Partly Cloudy";
        if (weather.weathercode <= 48) return "Foggy";
        if (weather.weathercode <= 67) return "Rainy";
        if (weather.weathercode <= 77) return "Snowy";
        if (weather.weathercode <= 82) return "Showers";
        return "Stormy";
    };

    return (
        <div
            className="fixed bottom-16 sm:bottom-24 lg:bottom-32 left-2 sm:left-4 lg:left-8 z-50 flex flex-col items-end group"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {/* Weather Popup - Positioned above the button */}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-6 mb-2 sm:mb-4 min-w-[260px] sm:min-w-[280px] max-w-[90vw] sm:max-w-none border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="flex items-center gap-2">
                                <div className="text-emerald-400">
                                    {getWeatherIcon()}
                                </div>
                                <h3 className="font-bold text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-500">
                                    Jharkhand Weather
                                </h3>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-3 sm:py-4">
                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-emerald-400 border-t-transparent mx-auto mb-2"></div>
                                <div className="text-gray-400 text-xs sm:text-sm">Loading weather...</div>
                            </div>
                        ) : weather ? (
                            <div className="space-y-3 sm:space-y-4">
                                {/* Main Temperature */}
                                <div className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                                        {Math.round(weather.temperature)}°C
                                    </div>
                                    <div className="text-emerald-400 font-medium text-sm sm:text-base">
                                        {getWeatherCondition()}
                                    </div>
                                </div>

                                {/* Weather Details */}
                                <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 text-xs sm:text-sm">Wind Speed</span>
                                        <span className="text-white font-medium text-xs sm:text-sm">{weather.windspeed} km/h</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 text-xs sm:text-sm">Wind Direction</span>
                                        <span className="text-white font-medium text-xs sm:text-sm">{weather.winddirection}°</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 text-xs sm:text-sm">Location</span>
                                        <span className="text-emerald-400 font-medium text-xs sm:text-sm">Ranchi, Jharkhand</span>
                                    </div>
                                </div>

                                {/* Last Updated */}
                                <div className="text-center">
                                    <div className="text-xs text-gray-500">
                                        Last updated: {new Date().toLocaleTimeString('en-IN', { 
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            timeZone: 'Asia/Kolkata'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-3 sm:py-4">
                                <div className="text-red-400 text-xs sm:text-sm mb-2">Unable to load weather</div>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="text-emerald-400 text-xs hover:text-emerald-300 underline"
                                >
                                    Try again
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Weather Icon Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900/80 backdrop-blur-md hover:bg-gray-800/80 shadow-2xl rounded-full p-3 sm:p-4 transition-all duration-300 border border-gray-700/50 hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                aria-label="Show weather"
            >
                <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                    {getWeatherIcon()}
                </div>
                
                {/* Temperature Badge */}
                {weather && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-lg"
                    >
                        <span className="text-xs sm:text-sm">{Math.round(weather.temperature)}°</span>
                    </motion.div>
                )}
            </motion.button>
        </div>
    );
}