'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, MapPin, DollarSign, Clock, Star, Bot, User, Info, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { COMPREHENSIVE_PLACES_DATA, SEASONAL_INFO, TRANSPORT_INFO, CULTURAL_INFO, BUDGET_TEMPLATES } from '@/data/placesData';

// Use comprehensive data from external file
const PLACES_DATA = COMPREHENSIVE_PLACES_DATA;

// Enhanced AI Knowledge Base with comprehensive information
const AI_KNOWLEDGE = {
    general: {
        "best time": `${SEASONAL_INFO.winter.description}. ${SEASONAL_INFO.winter.months} with temperatures ${SEASONAL_INFO.winter.temperature}.`,
        "how to reach": `${TRANSPORT_INFO.airways.main}. ${TRANSPORT_INFO.railways.connectivity}. ${TRANSPORT_INFO.roadways.connectivity}`,
        "local food": `Traditional: ${CULTURAL_INFO.food.traditional.join(', ')}. Tribal: ${CULTURAL_INFO.food.tribal.join(', ')}. Sweets: ${CULTURAL_INFO.food.sweets.join(', ')}.`,
        "accommodation": `Budget: ${BUDGET_TEMPLATES.budget.accommodation}, Moderate: ${BUDGET_TEMPLATES.moderate.accommodation}, Luxury: ${BUDGET_TEMPLATES.luxury.accommodation}`,
        "transport": `Airways: ${TRANSPORT_INFO.airways.connectivity}. Railways: Major stations - ${TRANSPORT_INFO.railways.major.join(', ')}. Roads: ${TRANSPORT_INFO.roadways.highways.join(', ')}.`,
        "culture": `Languages: ${CULTURAL_INFO.languages.slice(0,3).join(', ')}. Festivals: ${CULTURAL_INFO.festivals.slice(0,4).join(', ')}. Crafts: ${CULTURAL_INFO.crafts.join(', ')}.`,
        "weather": `Winter: ${SEASONAL_INFO.winter.description} Summer: ${SEASONAL_INFO.summer.description} Monsoon: ${SEASONAL_INFO.monsoon.description}`
    },
    categories: {
        "waterfall": "Famous waterfalls: Hundru (320ft), Dassam (144ft), Jonha Falls. Best visited Jul-Feb for maximum flow.",
        "wildlife": "Betla National Park, Palamau Tiger Reserve. Safari timings: 6-11 AM, 3-6 PM. Book permits 2-3 days advance.",
        "religious": "Baidyanath Deoghar (Jyotirlinga), Parasnath Hill (Jain), Rajrappa Temple. Dress modestly, remove shoes.",
        "hill station": "Netarhat (Queen of Chotanagpur), Hazaribagh offer cool climate. Best for sunrise/sunset views.",
        "city": "Ranchi (Capital), Jamshedpur (Steel City), Dhanbad (Coal Capital). Modern amenities with cultural heritage."
    }
};

export default function EnhancedBudgetChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! 👋 I\'m your AI travel assistant for Jharkhand! I can help with:\n\n💰 Budget planning & recommendations\n📍 Detailed place information\n🗓️ Best time to visit\n🎯 Activities & attractions\n🍜 Local food & culture\n🚗 Transportation tips\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, type = 'user', data = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      data,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (responses) => {
    setIsTyping(true);
    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + (i * 300)));
      addMessage(responses[i].text, 'bot', responses[i].data);
    }
    setIsTyping(false);
  };

  // Enhanced search with multi-field capability
  const searchPlaces = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    return PLACES_DATA.filter(place => {
      const searchableContent = [
        place.name,
        ...place.description,
        place.category,
        ...place.tags,
        ...(place.attractions || []),
        ...(place.activities || []),
        place.climate || ''
      ].join(' ').toLowerCase();

      return searchTerms.some(term => searchableContent.includes(term));
    });
  };

  // Get detailed place information with comprehensive data
  const getPlaceDetails = (place) => {
    let details = `**${place.name}** (${place.category})\n\n` +
      `📍 **About:** ${place.description[0]}\n\n` +
      `💰 **Budget Range:** ${place.budgetRange}\n` +
      `🗓️ **Best Time:** ${place.bestTime}\n` +
      `⏱️ **Duration:** ${place.duration}\n` +
      `🌤️ **Climate:** ${place.climate}\n\n`;
    
    // Add accommodation details if available
    if (place.accommodation && typeof place.accommodation === 'object') {
      details += `🏠 **Accommodation:**\n`;
      if (place.accommodation.budget) details += `• Budget: ${place.accommodation.budget}\n`;
      if (place.accommodation.midRange) details += `• Mid-range: ${place.accommodation.midRange}\n`;
      if (place.accommodation.luxury) details += `• Luxury: ${place.accommodation.luxury}\n`;
      details += `\n`;
    } else if (place.accommodation) {
      details += `🏠 **Accommodation:** ${place.accommodation}\n\n`;
    }
    
    // Add transport details
    if (place.transport && typeof place.transport === 'object') {
      details += `🚗 **Transport:**\n`;
      if (place.transport.reaching) details += `• How to reach: ${place.transport.reaching}\n`;
      if (place.transport.local) details += `• Local transport: ${place.transport.local}\n`;
      details += `\n`;
    } else if (place.transport) {
      details += `🚗 **Transport:** ${place.transport}\n\n`;
    }
    
    // Add food information
    if (place.food && typeof place.food === 'object') {
      details += `🍽️ **Food & Dining:**\n`;
      if (place.food.street) details += `• Street food: ${place.food.street}\n`;
      if (place.food.restaurant) details += `• Restaurants: ${place.food.restaurant}\n`;
      if (place.food.specialty) details += `• Specialties: ${place.food.specialty}\n`;
      details += `\n`;
    } else if (place.food) {
      details += `🍽️ **Food:** ${place.food}\n\n`;
    }
    
    details += `🎯 **Attractions:** ${place.attractions?.join(', ') || 'Various attractions'}\n` +
               `🎪 **Activities:** ${place.activities?.join(', ') || 'Multiple activities'}\n\n`;
    
    // Add travel tips if available
    if (place.travelTips && place.travelTips.length > 0) {
      details += `💡 **Travel Tips:**\n${place.travelTips.map(tip => `• ${tip}`).join('\n')}\n\n`;
    }
    
    // Add nearby places if available
    if (place.nearbyPlaces && place.nearbyPlaces.length > 0) {
      details += `📍 **Nearby Places:** ${place.nearbyPlaces.join(', ')}\n\n`;
    }
    
    details += `🏷️ **Tags:** ${place.tags.join(', ')}`;
    
    return details;
  };

  // Budget categorization
  const getBudgetRecommendations = (budget) => {
    const filtered = PLACES_DATA.filter(place => {
      const maxBudget = parseInt(place.budgetRange.split('₹')[2]?.split(' ')[0]?.replace(',', '') || '20000');
      return budget >= maxBudget * 0.7; // 70% of max budget
    });

    return {
      category: budget <= 3000 ? 'Budget-Friendly' : budget <= 8000 ? 'Comfortable' : 'Premium',
      places: filtered.slice(0, 4)
    };
  };

  // Intelligent response generation
  const generateResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Extract budget if mentioned
    const budgetMatch = userInput.match(/\d+/);
    if (budgetMatch && (lowerInput.includes('budget') || lowerInput.includes('rupee') || lowerInput.includes('cost'))) {
      const budget = parseInt(budgetMatch[0]);
      const recommendations = getBudgetRecommendations(budget);
      
      return [
        {
          text: `Perfect! With ₹${budget.toLocaleString()}, here are ${recommendations.category} recommendations:`
        },
        {
          text: `Here are the best places within your budget:`,
          data: { type: 'budget_places', places: recommendations.places }
        },
        {
          text: `💡 **Budget Tips:**\n• Book accommodation early\n• Try local street food\n• Use public transport\n• Visit during off-season\n\nNeed details about any place? Just ask! 😊`
        }
      ];
    }

    // Check for specific place mentions
    const mentionedPlace = PLACES_DATA.find(place => 
      lowerInput.includes(place.name.toLowerCase())
    );
    
    if (mentionedPlace) {
      return [
        {
          text: getPlaceDetails(mentionedPlace),
          data: { type: 'place_details', place: mentionedPlace }
        },
        {
          text: `Want budget planning for ${mentionedPlace.name} or nearby recommendations? 🎯`
        }
      ];
    }

    // Check knowledge base
    for (const [key, value] of Object.entries(AI_KNOWLEDGE.general)) {
      if (lowerInput.includes(key.replace(' ', ''))) {
        return [{ text: `💡 **${key.charAt(0).toUpperCase() + key.slice(1)}:**\n\n${value}` }];
      }
    }

    // Category-based queries
    for (const [category, info] of Object.entries(AI_KNOWLEDGE.categories)) {
      if (lowerInput.includes(category)) {
        const categoryPlaces = PLACES_DATA.filter(place => place.category === category);
        return [
          {
            text: `🌟 **${category.charAt(0).toUpperCase() + category.slice(1)} in Jharkhand:**\n\n${info}`
          },
          {
            text: `Here are top ${category} destinations:`,
            data: { type: 'category_places', places: categoryPlaces }
          }
        ];
      }
    }

    // General search
    const searchResults = searchPlaces(userInput);
    if (searchResults.length > 0) {
      return [
        {
          text: `Found ${searchResults.length} places matching "${userInput}":`
        },
        {
          text: "Here are the top matches:",
          data: { type: 'search_results', places: searchResults.slice(0, 4) }
        }
      ];
    }

    // Default helpful response
    return [
      {
        text: "I'd love to help you explore Jharkhand! 🌟\n\nTry asking:\n• 'I have 5000 rupees budget'\n• 'Tell me about Ranchi'\n• 'Best waterfalls to visit'\n• 'Wildlife safari options'\n• 'When to visit Jharkhand'\n\nWhat interests you most? 😊"
      }
    ];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText);
    const responses = generateResponse(inputText.trim());
    setInputText('');
    simulateTyping(responses);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const PlaceCard = ({ place }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200 mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-emerald-800 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {place.name}
        </h4>
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
          {place.budgetRange}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-2">{place.description[0]}</p>
      
      <div className="flex items-center gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-3 h-3" />
          <span>{place.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>{place.bestTime}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => {
            addMessage(`Tell me details about ${place.name}`);
            simulateTyping([{
              text: getPlaceDetails(place),
              data: { type: 'place_details', place: place }
            }]);
          }}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Info className="w-3 h-3" />
          Details
        </button>
        <Link href={place.link} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-1">
            <Star className="w-3 h-3" />
            Visit
          </button>
        </Link>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Bot className="w-6 h-6" />
        <span className="hidden sm:inline font-medium">Travel AI</span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Travel Assistant</h3>
                    <p className="text-xs opacity-90">Intelligent Jharkhand guide</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.type === 'bot' && (
                            <Bot className="w-4 h-4 mt-0.5 text-emerald-600" />
                          )}
                          {message.type === 'user' && (
                            <User className="w-4 h-4 mt-0.5 text-blue-100" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            
                            {/* Render place cards */}
                            {message.data?.places && (
                              <div className="mt-3 space-y-2">
                                {message.data.places.map((place, idx) => (
                                  <PlaceCard key={idx} place={place} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-emerald-600" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about places, budget, or travel tips..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Try: &quot;5000 budget&quot;, &quot;tell me about Ranchi&quot;, &quot;best waterfalls&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}