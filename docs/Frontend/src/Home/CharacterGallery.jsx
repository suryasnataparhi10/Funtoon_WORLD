import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const CharacterGallery = () => {
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [filter, setFilter] = useState("all");
  const [charGalleryData, setCharGalleryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterGalleryData = async () => {
      try {
        const response = await api.get("/characterGallery");
        setCharGalleryData(response.data.characterGalleries || []);
        setLoading(false)
      } catch (error) {
        console.log("Error fetching character gallery data:", error);
      } finally {
        setLoading(false);      
      }
    }
    fetchCharacterGalleryData()
  } , [])

  const categories = [
    { id: "all", name: "All Characters", icon: "🦸", count: charGalleryData.length },
    { id: "hero", name: "Super Heroes", icon: "💪", count: charGalleryData.filter(c => c.category === "hero").length },
    { id: "comedy", name: "Funny Characters", icon: "😂", count: charGalleryData.filter(c => c.category === "comedy").length },
    { id: "mythology", name: "Mythological", icon: "🕉️", count: charGalleryData.filter(c => c.category === "mythology").length }
  ];

  const filteredData = filter === "all"
    ? charGalleryData
    : charGalleryData.filter(character => character.category === filter);

  return (
    <section className="character-gallery py-5 position-relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {/* Floating Cartoon Clouds */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="position-absolute"
            style={{
              fontSize: `${Math.random() * 3 + 2}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2,
              zIndex: 0
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ☁️
          </motion.div>
        ))}

        {/* Floating Cartoon Elements */}
        {["🎈", "⭐", "🎯", "🏀", "🎨", "🪁", "🎪", "🦄"].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="position-absolute"
            style={{
              fontSize: `${Math.random() * 2 + 1}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
              zIndex: 0
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Subtle Gradient Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 217, 61, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 60% 60%, rgba(157, 78, 221, 0.03) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248, 249, 250, 0.98) 100%)
            `,
            zIndex: 0
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="display-4 fw-bold mb-3 text-dark"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🦸 Meet Your Favorite <span className="text-primary">Characters!</span>
          </motion.h2>
          <motion.p 
            className="lead text-muted fs-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Click on characters to discover their superpowers and fun facts!
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="row justify-content-center mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-10">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`btn rounded-pill px-4 py-3 fw-bold shadow-sm ${
                    filter === category.id 
                      ? 'btn-primary text-white' 
                      : 'btn-outline-primary text-dark'
                  }`}
                  onClick={() => setFilter(category.id)}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderWidth: "2px",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <motion.span 
                    className="me-2"
                    animate={{ 
                      scale: filter === category.id ? [1, 1.2, 1] : 1,
                      rotate: filter === category.id ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {category.icon}
                  </motion.span>
                  {category.name} 
                  <motion.span 
                    className="badge bg-dark ms-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {category.count}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Character Grid */}
        <motion.div 
          className="row g-4 justify-content-center"
          layout
        >
          <AnimatePresence>
            {filteredData.map((character, index) => (
              <motion.div
                key={character.id}
                className="col-md-6 col-lg-4 col-xl-4"
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div
                  className="character-card rounded-4 overflow-hidden shadow-lg position-relative border-0"
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  onClick={() => setActiveCharacter(character)}
                  style={{
                    background: `linear-gradient(135deg, ${character.color}15, #ffffff)`,
                    border: `3px solid ${character.color}30`,
                    cursor: "pointer",
                    height: "420px",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  {/* Character Image */}
                  <div 
                    className="character-image position-relative w-100 h-50 overflow-hidden"
                    style={{
                      backgroundImage: `url(${api.imageBaseURL}/${character.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <motion.div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${character.color}20)`
                      }}
                      whileHover={{ opacity: 0.7 }}
                    />
                    
                    {/* Category Badge */}
                    <motion.div
                      className="position-absolute  start-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span 
                        className="badge rounded-pill px-3 py-2 text-white fw-bold"
                        style={{ 
                          backgroundColor: character.color,
                          fontSize: "0.7rem"
                        }}
                      >
                        {character.category.toUpperCase()}
                      </span>
                    </motion.div>
                  </div>

                  {/* Character Info */}
                  <div className="p-4 position-relative">
                    <motion.h4 
                      className="fw-bold mb-2"
                      style={{ color: character.color }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {character.characterName}
                    </motion.h4>
                    <p className="text-muted mb-2 small">{character.characterShow}</p>
                    <p className="small text-dark mb-3">{character.description}</p>
                    
                    {/* Powers */}
                    <div className="d-flex flex-wrap gap-1">
                      {character.powers.slice(0, 2).map((power, idx) => (
                        <motion.span
                          key={idx}
                          className="badge rounded-pill px-2 py-1"
                          style={{ 
                            backgroundColor: character.color,
                            fontSize: "0.65rem",
                            color: "white"
                          }}
                          whileHover={{ scale: 1.1 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          {power}
                        </motion.span>
                      ))}
                      {character.powers.length > 2 && (
                        <motion.span 
                          className="badge bg-secondary rounded-pill px-2 py-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          +{character.powers.length - 2}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Click Hint */}
                  <motion.div
                    className="position-absolute bottom-2 end-2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <small className="text-muted fw-bold">
                      👆 Click to explore!
                    </small>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {charGalleryData.length === 0 && (
          <motion.div
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              style={{ fontSize: "4rem" }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎭
            </motion.div>
            <h4 className="text-muted mt-3">No characters found!</h4>
            <p className="text-muted">Try selecting a different category.</p>
          </motion.div>
        )}
      </div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {activeCharacter && (
          <CharacterModal 
            character={activeCharacter} 
            onClose={() => setActiveCharacter(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Enhanced Modal Component
const CharacterModal = ({ character, onClose }) => {
  return (
    <motion.div
      className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ 
        zIndex: 9999, 
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(5px)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content rounded-4 overflow-hidden shadow-lg border-0"
        style={{
          maxWidth: "90%",
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: `linear-gradient(135deg, ${character.color}10, #ffffff)`,
          border: `4px solid ${character.color}40`,
          backdropFilter: "blur(10px)"
        }}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="btn btn-light position-absolute top-3 end-3 rounded-circle shadow"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: "40px",
            height: "40px",
            zIndex: 10
          }}
        >
          ✕
        </motion.button>

        <div className="p-4">
          <div className="row align-items-start">
            <div className="col-md-5 text-center">
              <motion.div
                className="rounded-4 overflow-hidden shadow-lg"
                style={{
                  backgroundImage: `url(${api.imageBaseURL}/${character.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                  border: `4px solid ${character.color}`
                }}
                whileHover={{ scale: 1.05 }}
              />
              
              <motion.h3 
                className="mt-3 fw-bold"
                style={{ color: character.color }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {character.characterName}
              </motion.h3>
              <p className="text-muted">{character.characterShow}</p>
            </div>
            
            <div className="col-md-7">
              <div className="ps-md-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h5 className="fw-bold text-dark">About</h5>
                  <p className="text-dark mb-3">{character.description}</p>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>First Appearance:</strong>
                      <br />
                      <span className="text-muted">{character.firstAppearance}</span>
                    </div>
                    <div className="col-6">
                      <strong>Voice:</strong>
                      <br />
                      <span className="text-muted">{character.voice}</span>
                    </div>
                  </div>

                  <h5 className="fw-bold text-dark mt-4">🎯 Fun Fact</h5>
                  <p className="text-dark mb-4">{character.funFact}</p>

                  <h5 className="fw-bold text-dark">Super Powers</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {character.powers.map((power, idx) => (
                      <motion.span
                        key={idx}
                        className="badge rounded-pill px-3 py-2 fw-bold"
                        style={{ 
                          backgroundColor: character.color,
                          color: "white",
                          fontSize: "0.8rem"
                        }}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        {power}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CharacterGallery;