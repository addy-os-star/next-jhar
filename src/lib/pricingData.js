// Pricing data for Jharkhand tourist destinations
// Prices are in INR per person and are estimations including accommodation, local transport, food, and entry fees

export const PLACE_PRICING = {
  // Major Cities
  "Ranchi": {
    budget: { min: 1500, max: 2500, category: "Budget" },
    moderate: { min: 2500, max: 4500, category: "Moderate" },
    luxury: { min: 4500, max: 8000, category: "Luxury" },
    description: "Capital city with waterfalls and urban attractions",
    duration: "2-3 days",
    included: ["Accommodation", "Local transport", "Meals", "Sightseeing"]
  },
  "Jamshedpur": {
    budget: { min: 2000, max: 3000, category: "Budget" },
    moderate: { min: 3000, max: 5000, category: "Moderate" },
    luxury: { min: 5000, max: 9000, category: "Luxury" },
    description: "Steel city with parks and lakes",
    duration: "2-3 days",
    included: ["Accommodation", "Local transport", "Meals", "Park entries"]
  },
  "Dhanbad": {
    budget: { min: 1200, max: 2000, category: "Budget" },
    moderate: { min: 2000, max: 3500, category: "Moderate" },
    luxury: { min: 3500, max: 6000, category: "Luxury" },
    description: "Coal capital with mining heritage",
    duration: "1-2 days",
    included: ["Accommodation", "Local transport", "Meals", "Heritage tours"]
  },
  "Deoghar": {
    budget: { min: 1000, max: 1800, category: "Budget" },
    moderate: { min: 1800, max: 3000, category: "Moderate" },
    luxury: { min: 3000, max: 5000, category: "Luxury" },
    description: "Sacred pilgrimage destination",
    duration: "1-2 days",
    included: ["Accommodation", "Local transport", "Meals", "Temple visits"]
  },

  // National Parks & Wildlife
  "Betla National Park": {
    budget: { min: 3000, max: 4500, category: "Budget" },
    moderate: { min: 4500, max: 7000, category: "Moderate" },
    luxury: { min: 7000, max: 12000, category: "Luxury" },
    description: "Premier wildlife sanctuary with tigers and elephants",
    duration: "2-3 days",
    included: ["Forest accommodation", "Safari permits", "Meals", "Guide services"]
  },
  "Palamau Tiger Reserve": {
    budget: { min: 3500, max: 5000, category: "Budget" },
    moderate: { min: 5000, max: 8000, category: "Moderate" },
    luxury: { min: 8000, max: 15000, category: "Luxury" },
    description: "Tiger reserve with diverse wildlife",
    duration: "2-3 days",
    included: ["Forest lodging", "Safari permits", "Meals", "Guide services"]
  },
  "Dalma Wildlife Sanctuary": {
    budget: { min: 2000, max: 3000, category: "Budget" },
    moderate: { min: 3000, max: 5000, category: "Moderate" },
    luxury: { min: 5000, max: 8000, category: "Luxury" },
    description: "Elephant sanctuary near Jamshedpur",
    duration: "1-2 days",
    included: ["Accommodation", "Safari permits", "Meals", "Transport"]
  },

  // Hill Stations
  "Netarhat": {
    budget: { min: 2000, max: 3000, category: "Budget" },
    moderate: { min: 3000, max: 5000, category: "Moderate" },
    luxury: { min: 5000, max: 8500, category: "Luxury" },
    description: "Queen of Chotanagpur with sunrise/sunset views",
    duration: "2-3 days",
    included: ["Hill station accommodation", "Local transport", "Meals", "Viewpoint visits"]
  },
  "Hazaribagh": {
    budget: { min: 1800, max: 2800, category: "Budget" },
    moderate: { min: 2800, max: 4500, category: "Moderate" },
    luxury: { min: 4500, max: 7500, category: "Luxury" },
    description: "Hill station with wildlife sanctuary",
    duration: "2-3 days",
    included: ["Accommodation", "Local transport", "Meals", "Sanctuary entry"]
  },

  // Waterfalls
  "Hundru Falls": {
    budget: { min: 800, max: 1200, category: "Budget" },
    moderate: { min: 1200, max: 2000, category: "Moderate" },
    luxury: { min: 2000, max: 3500, category: "Luxury" },
    description: "320-feet spectacular waterfall",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Local guide", "Refreshments"]
  },
  "Dassam Falls": {
    budget: { min: 700, max: 1100, category: "Budget" },
    moderate: { min: 1100, max: 1800, category: "Moderate" },
    luxury: { min: 1800, max: 3000, category: "Luxury" },
    description: "Beautiful waterfall with natural pools",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Local guide", "Refreshments"]
  },
  "Jonha Falls": {
    budget: { min: 900, max: 1300, category: "Budget" },
    moderate: { min: 1300, max: 2200, category: "Moderate" },
    luxury: { min: 2200, max: 3800, category: "Luxury" },
    description: "Scenic waterfall with trekking opportunities",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Trekking guide", "Refreshments"]
  },
  "Lodh Falls": {
    budget: { min: 1200, max: 1800, category: "Budget" },
    moderate: { min: 1800, max: 3000, category: "Moderate" },
    luxury: { min: 3000, max: 5000, category: "Luxury" },
    description: "143m high waterfall near Netarhat",
    duration: "Full day",
    included: ["Transport", "Entry fees", "Guide", "Meals"]
  },
  "Usri Falls": {
    budget: { min: 1000, max: 1500, category: "Budget" },
    moderate: { min: 1500, max: 2500, category: "Moderate" },
    luxury: { min: 2500, max: 4000, category: "Luxury" },
    description: "Beautiful waterfall in lush greenery",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },
  "Hirni Falls": {
    budget: { min: 1100, max: 1600, category: "Budget" },
    moderate: { min: 1600, max: 2700, category: "Moderate" },
    luxury: { min: 2700, max: 4200, category: "Luxury" },
    description: "Hidden gem with crystal clear water",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Adventure guide", "Refreshments"]
  },
  "Panch Gagh Falls": {
    budget: { min: 1000, max: 1500, category: "Budget" },
    moderate: { min: 1500, max: 2500, category: "Moderate" },
    luxury: { min: 2500, max: 4000, category: "Luxury" },
    description: "Five-stream waterfall complex",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },

  // Religious Sites
  "Rajrappa Temple": {
    budget: { min: 800, max: 1200, category: "Budget" },
    moderate: { min: 1200, max: 2000, category: "Moderate" },
    luxury: { min: 2000, max: 3500, category: "Luxury" },
    description: "Sacred temple at river confluence",
    duration: "Half day",
    included: ["Transport", "Temple donations", "Local guide", "Prasad"]
  },
  "Maluti Temples": {
    budget: { min: 1200, max: 1800, category: "Budget" },
    moderate: { min: 1800, max: 3000, category: "Moderate" },
    luxury: { min: 3000, max: 5000, category: "Luxury" },
    description: "Ancient terracotta temple complex",
    duration: "Full day",
    included: ["Transport", "Entry fees", "Heritage guide", "Meals"]
  },
  "Jagannath Temple Ranchi": {
    budget: { min: 500, max: 800, category: "Budget" },
    moderate: { min: 800, max: 1300, category: "Moderate" },
    luxury: { min: 1300, max: 2200, category: "Luxury" },
    description: "Sacred temple in Ranchi",
    duration: "Half day",
    included: ["Transport", "Temple donations", "Local guide", "Prasad"]
  },

  // Heritage & Cultural
  "Dumka": {
    budget: { min: 1500, max: 2200, category: "Budget" },
    moderate: { min: 2200, max: 3500, category: "Moderate" },
    luxury: { min: 3500, max: 5500, category: "Luxury" },
    description: "Cultural heritage of Santhal Pargana",
    duration: "1-2 days",
    included: ["Accommodation", "Cultural tours", "Meals", "Local transport"]
  },
  "Mayurbhanj Palace": {
    budget: { min: 800, max: 1200, category: "Budget" },
    moderate: { min: 1200, max: 2000, category: "Moderate" },
    luxury: { min: 2000, max: 3500, category: "Luxury" },
    description: "Royal heritage palace",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Heritage guide", "Refreshments"]
  },

  // Lakes & Dams
  "Dimna Lake": {
    budget: { min: 800, max: 1200, category: "Budget" },
    moderate: { min: 1200, max: 2000, category: "Moderate" },
    luxury: { min: 2000, max: 3500, category: "Luxury" },
    description: "Scenic lake with boating facilities",
    duration: "Half day",
    included: ["Transport", "Boating charges", "Entry fees", "Refreshments"]
  },
  "Maithon Dam": {
    budget: { min: 900, max: 1400, category: "Budget" },
    moderate: { min: 1400, max: 2300, category: "Moderate" },
    luxury: { min: 2300, max: 3800, category: "Luxury" },
    description: "Large dam with water sports",
    duration: "Half day",
    included: ["Transport", "Water sports", "Entry fees", "Refreshments"]
  },
  "Kanke Dam": {
    budget: { min: 700, max: 1100, category: "Budget" },
    moderate: { min: 1100, max: 1800, category: "Moderate" },
    luxury: { min: 1800, max: 3000, category: "Luxury" },
    description: "Scenic dam near Ranchi",
    duration: "Half day",
    included: ["Transport", "Boating", "Entry fees", "Refreshments"]
  },
  "Topchanchi Lake": {
    budget: { min: 900, max: 1400, category: "Budget" },
    moderate: { min: 1400, max: 2300, category: "Moderate" },
    luxury: { min: 2300, max: 3800, category: "Luxury" },
    description: "Beautiful lake surrounded by hills",
    duration: "Half day",
    included: ["Transport", "Boating", "Entry fees", "Refreshments"]
  },
  "Ranchi Lake": {
    budget: { min: 500, max: 800, category: "Budget" },
    moderate: { min: 800, max: 1300, category: "Moderate" },
    luxury: { min: 1300, max: 2200, category: "Luxury" },
    description: "Urban lake in Ranchi city",
    duration: "Half day",
    included: ["Transport", "Boating", "Entry fees", "Refreshments"]
  },

  // Parks & Gardens
  "Jubilee Park": {
    budget: { min: 600, max: 1000, category: "Budget" },
    moderate: { min: 1000, max: 1600, category: "Moderate" },
    luxury: { min: 1600, max: 2700, category: "Luxury" },
    description: "Large urban park with zoo and gardens",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Zoo visit", "Refreshments"]
  },
  "Rock Garden Ranchi": {
    budget: { min: 400, max: 700, category: "Budget" },
    moderate: { min: 700, max: 1200, category: "Moderate" },
    luxury: { min: 1200, max: 2000, category: "Luxury" },
    description: "Beautiful rock garden in Ranchi",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },

  // Hill Destinations
  "Parasnath Hill": {
    budget: { min: 2000, max: 3000, category: "Budget" },
    moderate: { min: 3000, max: 5000, category: "Moderate" },
    luxury: { min: 5000, max: 8000, category: "Luxury" },
    description: "Sacred Jain pilgrimage site",
    duration: "1-2 days",
    included: ["Accommodation", "Temple visits", "Meals", "Local guide"]
  },
  "Ghatshila": {
    budget: { min: 1500, max: 2300, category: "Budget" },
    moderate: { min: 2300, max: 3800, category: "Moderate" },
    luxury: { min: 3800, max: 6000, category: "Luxury" },
    description: "Scenic hill town with natural beauty",
    duration: "1-2 days",
    included: ["Accommodation", "Nature tours", "Meals", "Local transport"]
  },

  // Others
  "McCluskieganj": {
    budget: { min: 1200, max: 1800, category: "Budget" },
    moderate: { min: 1800, max: 3000, category: "Moderate" },
    luxury: { min: 3000, max: 5000, category: "Luxury" },
    description: "Anglo-Indian heritage town",
    duration: "1-2 days",
    included: ["Accommodation", "Heritage tours", "Meals", "Local transport"]
  },
  "Bokaro": {
    budget: { min: 1500, max: 2300, category: "Budget" },
    moderate: { min: 2300, max: 3800, category: "Moderate" },
    luxury: { min: 3800, max: 6000, category: "Luxury" },
    description: "Steel city with modern amenities",
    duration: "1-2 days",
    included: ["Accommodation", "City tours", "Meals", "Local transport"]
  },
  "Giridih": {
    budget: { min: 1200, max: 1800, category: "Budget" },
    moderate: { min: 1800, max: 3000, category: "Moderate" },
    luxury: { min: 3000, max: 5000, category: "Luxury" },
    description: "District headquarters with natural beauty",
    duration: "1-2 days",
    included: ["Accommodation", "Sightseeing", "Meals", "Local transport"]
  },

  // Zoos & Museums
  "Jamshedpur Zoological Park": {
    budget: { min: 600, max: 1000, category: "Budget" },
    moderate: { min: 1000, max: 1600, category: "Moderate" },
    luxury: { min: 1600, max: 2700, category: "Luxury" },
    description: "Well-maintained zoo in Jamshedpur",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },
  "Tata Steel Zoological Park": {
    budget: { min: 700, max: 1100, category: "Budget" },
    moderate: { min: 1100, max: 1800, category: "Moderate" },
    luxury: { min: 1800, max: 3000, category: "Luxury" },
    description: "Educational zoo with diverse wildlife",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Educational tours", "Refreshments"]
  },
  "Birsa Zoological Park": {
    budget: { min: 500, max: 800, category: "Budget" },
    moderate: { min: 800, max: 1300, category: "Moderate" },
    luxury: { min: 1300, max: 2200, category: "Luxury" },
    description: "Zoo in Ranchi with local wildlife",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },

  // Temples
  "Sun Temple Ranchi": {
    budget: { min: 400, max: 700, category: "Budget" },
    moderate: { min: 700, max: 1200, category: "Moderate" },
    luxury: { min: 1200, max: 2000, category: "Luxury" },
    description: "Beautiful sun temple in Ranchi",
    duration: "Half day",
    included: ["Transport", "Temple visit", "Guide", "Prasad"]
  },
  "Tapkeshwar Temple": {
    budget: { min: 500, max: 800, category: "Budget" },
    moderate: { min: 800, max: 1300, category: "Moderate" },
    luxury: { min: 1300, max: 2200, category: "Luxury" },
    description: "Ancient cave temple",
    duration: "Half day",
    included: ["Transport", "Temple visit", "Guide", "Prasad"]
  },

  // Additional Places
  "Tagore Hill": {
    budget: { min: 400, max: 700, category: "Budget" },
    moderate: { min: 700, max: 1200, category: "Moderate" },
    luxury: { min: 1200, max: 2000, category: "Luxury" },
    description: "Historic hill with Tagore connection",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Refreshments"]
  },
  "Birsa Munda Museum": {
    budget: { min: 500, max: 800, category: "Budget" },
    moderate: { min: 800, max: 1300, category: "Moderate" },
    luxury: { min: 1300, max: 2200, category: "Luxury" },
    description: "Museum dedicated to tribal hero",
    duration: "Half day",
    included: ["Transport", "Entry fees", "Guide", "Educational materials"]
  }
};

// Function to get pricing for a destination
export const getPlacePricing = (placeName) => {
  return PLACE_PRICING[placeName] || null;
};

// Function to calculate total price based on guests and duration
export const calculateTotalPrice = (placeName, guests = 1, category = 'moderate') => {
  const pricing = getPlacePricing(placeName);
  if (!pricing) return null;

  const priceRange = pricing[category];
  if (!priceRange) return null;

  // Use average price for calculation
  const averagePrice = (priceRange.min + priceRange.max) / 2;
  const totalPrice = averagePrice * guests;

  return {
    pricePerPerson: averagePrice,
    totalPrice: totalPrice,
    guests: guests,
    category: priceRange.category,
    description: pricing.description,
    duration: pricing.duration,
    included: pricing.included,
    range: `₹${priceRange.min} - ₹${priceRange.max}`
  };
};

// Function to get price categories for a place
export const getPriceCategories = (placeName) => {
  const pricing = getPlacePricing(placeName);
  if (!pricing) return null;

  return {
    budget: {
      ...pricing.budget,
      range: `₹${pricing.budget.min} - ₹${pricing.budget.max}`
    },
    moderate: {
      ...pricing.moderate,
      range: `₹${pricing.moderate.min} - ₹${pricing.moderate.max}`
    },
    luxury: {
      ...pricing.luxury,
      range: `₹${pricing.luxury.min} - ₹${pricing.luxury.max}`
    },
    description: pricing.description,
    duration: pricing.duration,
    included: pricing.included
  };
};