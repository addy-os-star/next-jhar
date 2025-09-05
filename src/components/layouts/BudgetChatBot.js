'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star,
  Sparkles,
  Bot,
  User
} from 'lucide-react';
import Link from 'next/link';

// Budget ranges and place recommendations
const BUDGET_RECOMMENDATIONS = {
  "low": {
    range: "₹1,000 - ₹3,000",
    places: [
      {
        name: "Ranchi",
        cost: "₹1,500-2,500",
        duration: "1-2 days",
        highlights: ["Free Rock Garden", "Pahari Mandir", "Tagore Hill"],
        description: "Explore the capital city with minimal costs. Visit free attractions and enjoy local street food.",
        link: "/places/ranchi"
      },
      {
        name: "Dhanbad",
        cost: "₹1,200-2,000",
        duration: "1 day",
        highlights: ["Coal mining heritage", "Local markets", "Budget stays"],
        description: "Perfect for budget travelers interested in industrial heritage.",
        link: "/places/dhanbad"
      },
      {
        name: "Deoghar",
        cost: "₹1,800-2,800",
        duration: "1-2 days",
        highlights: ["Baidyanath Temple", "Local dharamshalas", "Street food"],
        description: "Spiritual journey with affordable accommodation in dharamshalas.",
        link: "/places/deoghar"
      }
    ]
  },
  "medium": {
    range: "₹3,000 - ₹8,000",
    places: [
      {
        name: "Netarhat",
        cost: "₹4,000-6,500",
        duration: "2-3 days",
        highlights: ["Sunrise/Sunset points", "Hill station stay", "Forest walks"],
        description: "Perfect hill station getaway with comfortable accommodation.",
        link: "/places/netarhat"
      },
      {
        name: "Hazaribagh",
        cost: "₹3,500-6,000",
        duration: "2-3 days",
        highlights: ["Wildlife sanctuary", "Lake boating", "Nature trails"],
        description: "Great for nature lovers with moderate budget accommodation.",
        link: "/places/hazaribagh"
      },
      {
        name: "Jamshedpur",
        cost: "₹4,500-7,500",
        duration: "2-3 days",
        highlights: ["Jubilee Park", "Dimna Lake", "City amenities"],
        description: "Modern city experience with good hotels and restaurants.",
        link: "/places/jamshedpur"
      }
    ]
  },
  "high": {
    range: "₹8,000 - ₹20,000+",
    places: [
      {
        name: "Betla National Park",
        cost: "₹10,000-15,000",
        duration: "3-4 days",
        highlights: ["Luxury safari", "Premium resorts", "Wildlife photography"],
        description: "Luxury wildlife experience with premium accommodation and guided tours.",
        link: "/places/betla-national-park"
      },
      {
        name: "Palamau Tiger Reserve",
        cost: "₹12,000-18,000",
        duration: "3-5 days",
        highlights: ["Tiger safari", "Luxury camps", "Professional guides"],
        description: "Premium tiger reserve experience with luxury accommodation.",
        link: "/places/palamau-tiger-reserve"
      },
      {
        name: "Complete Jharkhand Tour",
        cost: "₹15,000-25,000",
        duration: "7-10 days",
        highlights: ["Multiple destinations", "Luxury hotels", "Private transport"],
        description: "Comprehensive Jharkhand experience covering major attractions.",
        link: "/places"
      }
    ]
  }
};

const CONVERSATION_FLOW = {
  GREETING: 'greeting',
  BUDGET_INPUT: 'budget_input',
  RECOMMENDATIONS: 'recommendations',
  PLACE_DETAILS: 'place_details'
};

export default function BudgetChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! 👋 I\'m your travel budget assistant for Jharkhand! Tell me your budget and I\'ll suggest the perfect places to visit.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentFlow, setCurrentFlow] = useState(CONVERSATION_FLOW.GREETING);
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

  const getBudgetCategory = (amount) => {
    if (amount <= 3000) return 'low';
    if (amount <= 8000) return 'medium';
    return 'high';
  };

  const extractBudgetFromText = (text) => {
    // Extract numbers from text
    const numbers = text.match(/\d+/g);
    if (numbers) {
      const amount = parseInt(numbers[0]);
      if (amount > 0) return amount;
    }
    return null;
  };

  const handleBudgetInput = (text) => {
    const budget = extractBudgetFromText(text);
    
    if (!budget) {
      simulateTyping([
        {
          text: "I couldn't understand your budget. Please enter a number like '5000' or 'Rs 5000' or '5k'. What's your travel budget? 💰"
        }
      ]);
      return;
    }

    const category = getBudgetCategory(budget);
    const recommendations = BUDGET_RECOMMENDATIONS[category];

    setCurrentFlow(CONVERSATION_FLOW.RECOMMENDATIONS);

    const responses = [
      {
        text: `Great! With a budget of ₹${budget.toLocaleString()}, you fall into our ${category === 'low' ? 'Budget-Friendly' : category === 'medium' ? 'Comfortable' : 'Premium'} category (${recommendations.range}).`
      },
      {
        text: "Here are my top recommendations for you:",
        data: { type: 'recommendations', budget, category, places: recommendations.places }
      },
      {
        text: "Click on any place above to learn more, or ask me about specific destinations! You can also tell me your interests (like 'nature', 'adventure', 'temples') for more personalized suggestions. 🎯"
      }
    ];

    simulateTyping(responses);
  };

  const handleGeneralQuery = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('money')) {
      simulateTyping([
        {
          text: "I'd love to help you with budget planning! What's your travel budget? You can say something like '5000 rupees' or just '5k'. 💰"
        }
      ]);
      setCurrentFlow(CONVERSATION_FLOW.BUDGET_INPUT);
      return;
    }

    if (lowerText.includes('nature') || lowerText.includes('wildlife') || lowerText.includes('forest')) {
      simulateTyping([
        {
          text: "🌿 Great choice! Jharkhand has amazing nature spots. What's your budget for this trip? Based on that, I can suggest the best wildlife sanctuaries and natural places."
        }
      ]);
      setCurrentFlow(CONVERSATION_FLOW.BUDGET_INPUT);
      return;
    }

    if (lowerText.includes('temple') || lowerText.includes('spiritual') || lowerText.includes('religious')) {
      simulateTyping([
        {
          text: "🙏 Wonderful! Jharkhand has beautiful temples and spiritual places. Tell me your budget and I'll recommend the best spiritual destinations."
        }
      ]);
      setCurrentFlow(CONVERSATION_FLOW.BUDGET_INPUT);
      return;
    }

    if (lowerText.includes('adventure') || lowerText.includes('trekking') || lowerText.includes('safari')) {
      simulateTyping([
        {
          text: "🏔️ Exciting! Adventure awaits in Jharkhand. What's your budget? I'll suggest the best adventure activities and places based on your budget."
        }
      ]);
      setCurrentFlow(CONVERSATION_FLOW.BUDGET_INPUT);
      return;
    }

    // Default response
    simulateTyping([
      {
        text: "I'm here to help you plan your Jharkhand trip based on your budget! 🎯"
      },
      {
        text: "You can:\n• Tell me your budget (like '5000 rupees')\n• Ask about specific places\n• Mention your interests (nature, temples, adventure)\n\nWhat would you like to know? 😊"
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText);
    const userInput = inputText.trim();
    setInputText('');

    // Determine response based on current flow
    switch (currentFlow) {
      case CONVERSATION_FLOW.GREETING:
      case CONVERSATION_FLOW.PLACE_DETAILS:
        if (extractBudgetFromText(userInput)) {
          handleBudgetInput(userInput);
        } else {
          handleGeneralQuery(userInput);
        }
        break;
      
      case CONVERSATION_FLOW.BUDGET_INPUT:
        handleBudgetInput(userInput);
        break;
      
      case CONVERSATION_FLOW.RECOMMENDATIONS:
        handleGeneralQuery(userInput);
        break;
      
      default:
        handleGeneralQuery(userInput);
    }
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
      className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200 mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-emerald-800 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {place.name}
        </h4>
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
          {place.cost}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{place.description}</p>
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-600">{place.duration}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {place.highlights.slice(0, 2).map((highlight, idx) => (
          <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            {highlight}
          </span>
        ))}
        {place.highlights.length > 2 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            +{place.highlights.length - 2} more
          </span>
        )}
      </div>
      <Link href={place.link}>
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-1">
          <Star className="w-3 h-3" />
          View Details
        </button>
      </Link>
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
        <DollarSign className="w-6 h-6" />
        <span className="hidden sm:inline font-medium">Budget Helper</span>
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
                    <h3 className="font-semibold">Budget Travel Assistant</h3>
                    <p className="text-xs opacity-90">Find perfect places within your budget</p>
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
                            
                            {/* Render place recommendations */}
                            {message.data?.type === 'recommendations' && (
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
                    placeholder="Type your budget or question..."
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
                  Try: &quot;5000 rupees&quot; or &quot;I like nature&quot; or &quot;temples&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}