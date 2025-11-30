// components/AI/CharacterRecommender.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const CharacterRecommender = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState('');

  const getRecommendations = async (preferences) => {
    try {
      const response = await fetch('/api/recommend-characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg my-8"
    >
      <h2 className="text-3xl font-bold text-white mb-4">
        AI Character Matchmaker
      </h2>
      <p className="text-white mb-4">
        Tell us your play style and we'll recommend the perfect character for you!
      </p>
      <div className="flex gap-4">
        <input
          type="text"
          value={userPreferences}
          onChange={(e) => setUserPreferences(e.target.value)}
          placeholder="e.g., I like stealth, magic, and long-range attacks..."
          className="flex-1 p-3 rounded-lg"
        />
        <button
          onClick={() => getRecommendations(userPreferences)}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
        >
          Find My Character
        </button>
      </div>
      
      {recommendations.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((char, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-bold text-lg">{char.name}</h3>
              <p className="text-gray-600">{char.reason}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CharacterRecommender;