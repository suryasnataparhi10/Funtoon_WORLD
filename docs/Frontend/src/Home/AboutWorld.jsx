import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {   XCircle, 
  PlayFill, 
  StarFill, 
  PeopleFill, 
  ClockFill, 
  CalendarFill  } from "react-bootstrap-icons";
import "./Home.css";

const islands = [
  { 
    name: "Adventure Island", 
    desc: "Where exciting journeys begin 🗺️", 
    color: "#FF6B6B",
    icon: "🏝️",
    features: ["Treasure Caves", "Pirate Ships", "Secret Maps"],
    // Expanded content for modal
    fullDescription: "Embark on thrilling quests across mysterious islands filled with hidden treasures and ancient secrets. Join our brave explorers as they navigate through dangerous waters and discover lost civilizations!",
    characters: ["Captain Bheem", "Pirate Raju", "Explorer Chutki"],
    episodes: 24,
    duration: "15-20 mins",
    rating: 4.8,
    ageGroup: "6-12 years",
    popularEpisodes: [
      "The Golden Temple Mystery",
      "Pirate's Treasure Hunt",
      "Volcano Escape"
    ],
    trailer: "#"
  },
  { 
    name: "Magic Forest", 
    desc: "Enchanted creatures await 🌳", 
    color: "#6BCB77",
    icon: "🦄",
    features: ["Talking Trees", "Fairy Gardens", "Magic Springs"],
    fullDescription: "Step into a world where magic flows through every leaf and stream. Meet mystical creatures and learn the secrets of the ancient forest while helping our heroes protect this enchanted realm!",
    characters: ["Fairy Princess", "Wise Old Tree", "Magic Unicorn"],
    episodes: 18,
    duration: "12-18 mins",
    rating: 4.7,
    ageGroup: "4-10 years",
    popularEpisodes: [
      "The Crystal Flower",
      "Dragon Friendship",
      "Rainbow Bridge"
    ],
    trailer: "#"
  },
  { 
    name: "Space Zone", 
    desc: "Blast off to cosmic fun 🚀", 
    color: "#4D96FF",
    icon: "👽",
    features: ["Planet Hopping", "Alien Friends", "Star Racing"],
    fullDescription: "Launch into an intergalactic adventure across distant galaxies! Meet friendly aliens, explore strange new worlds, and solve cosmic mysteries in this out-of-this-world experience!",
    characters: ["Astro Ninja", "Friendly Alien Zog", "Robot Buddy"],
    episodes: 32,
    duration: "20-25 mins",
    rating: 4.9,
    ageGroup: "8-14 years",
    popularEpisodes: [
      "Black Hole Escape",
      "Alien Friendship Day",
      "Robot Revolution"
    ],
    trailer: "#"
  },
  { 
    name: "Funny Farm", 
    desc: "Animal adventures galore 🐮", 
    color: "#FFD93D",
    icon: "🐷",
    features: ["Silly Animals", "Barnyard Games", "Tractor Rides"],
    fullDescription: "Get ready for non-stop laughter and fun on the craziest farm ever! Join our hilarious animal friends as they turn everyday farm life into extraordinary adventures full of joy and comedy!",
    characters: ["Farmer Motu", "Chef Patlu", "Dancing Cow"],
    episodes: 28,
    duration: "10-15 mins",
    rating: 4.6,
    ageGroup: "3-8 years",
    popularEpisodes: [
      "The Great Vegetable Race",
      "Barnyard Olympics",
      "Harvest Festival"
    ],
    trailer: "#"
  },
];

const AboutWorld = () => {
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIslandClick = (island) => {
    setSelectedIsland(island);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIsland(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const islandVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.1,
      y: -10,
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.4,
        rotate: {
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  const floatVariants = {
    floating: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <section className="about-world py-5 text-center position-relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold mb-3 display-4">🌎 Explore Our Cartoon World</h2>
          <motion.p 
            className="text-muted mb-5 fs-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Every island represents a fun adventure waiting to be discovered!
          </motion.p>
        </motion.div>

        <motion.div 
          className="d-flex flex-wrap justify-content-center gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {islands.map((island, index) => (
            <motion.div
              key={index}
              className="island-card position-relative p-4 rounded-4 shadow-lg"
              variants={islandVariants}
              whileHover="hover"
              onClick={() => handleIslandClick(island)}
              style={{
                background: `linear-gradient(135deg, ${island.color}30, ${island.color}80)`,
                border: `3px solid ${island.color}`,
                width: "280px",
                height: "280px",
                backdropFilter: "blur(10px)",
                cursor: "pointer"
              }}
            >
              {/* Floating Icon */}
              <motion.div
                className="mb-3"
                variants={floatVariants}
                animate="floating"
                style={{ fontSize: "3rem" }}
              >
                {island.icon}
              </motion.div>

              {/* Island Name */}
              <motion.h4 
                className="fw-bold mb-3"
                style={{ color: island.color }}
                whileHover={{ scale: 1.1 }}
              >
                {island.name}
              </motion.h4>

              {/* Description */}
              <motion.p 
                className="mb-4 fw-medium"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {island.desc}
              </motion.p>

              {/* Features List */}
              <motion.div 
                className="features-list"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {island.features.map((feature, featureIndex) => (
                  <motion.span
                    key={featureIndex}
                    className="badge rounded-pill bg-light text-dark me-1 mb-1"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ delay: featureIndex * 0.1 }}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                style={{
                  background: `radial-gradient(circle at center, ${island.color}20, transparent 70%)`,
                  opacity: 0,
                  zIndex: -1
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Click Hint */}
              <motion.div
                className="position-absolute bottom-2 start-50 translate-middle-x"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <small className="text-muted fw-bold">Click to explore!</small>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Background Decorative Elements */}
        <motion.div
          className="position-absolute"
          style={{
            top: "10%",
            left: "5%",
            fontSize: "2rem",
            zIndex: -1
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ☁️
        </motion.div>
        
        <motion.div
          className="position-absolute"
          style={{
            bottom: "10%",
            right: "5%",
            fontSize: "2rem",
            zIndex: -1
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🌈
        </motion.div>
      </section>

      {/* Modal for Island Details */}
      <AnimatePresence>
        {isModalOpen && selectedIsland && (
          <motion.div
            className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 9999,
              backdropFilter: "blur(5px)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content position-relative rounded-4 shadow-lg overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90%",
                width: "800px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: `linear-gradient(135deg, ${selectedIsland.color}20, #ffffff)`,
                border: `4px solid ${selectedIsland.color}`
              }}
            >
              {/* Close Button */}
              <motion.button
                className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle"
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "40px",
                  height: "40px",
                  zIndex: 10
                }}
              >
                <XCircle size={20} />
              </motion.button>

              {/* Modal Header */}
              <div className="modal-header p-4 text-center" style={{
                background: `linear-gradient(135deg, ${selectedIsland.color}40, transparent)`
              }}>
                <motion.div
                  className="mb-3"
                  style={{ fontSize: "4rem" }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {selectedIsland.icon}
                </motion.div>
                <h2 className="fw-bold display-5" style={{ color: selectedIsland.color }}>
                  {selectedIsland.name}
                </h2>
                <p className="lead mb-0">{selectedIsland.desc}</p>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4">
                {/* Description */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h4 className="fw-bold mb-3">About This World</h4>
                    <p className="fs-5">{selectedIsland.fullDescription}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="row mb-4">
                  <div className="col-md-3 col-6 text-center mb-3">
                    <div className="p-3 rounded-3" style={{ backgroundColor: `${selectedIsland.color}20` }}>
                       <PeopleFill size={24} />
                      <h5 className="fw-bold">{selectedIsland.episodes}+</h5>
                      <small className="text-muted">Episodes</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-3">
                    <div className="p-3 rounded-3" style={{ backgroundColor: `${selectedIsland.color}20` }}>
                      <ClockFill size={24} />
                      <h5 className="fw-bold">{selectedIsland.duration}</h5>
                      <small className="text-muted">Duration</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-3">
                    <div className="p-3 rounded-3" style={{ backgroundColor: `${selectedIsland.color}20` }}>
                      <StarFill size={24} />
                      <h5 className="fw-bold">{selectedIsland.rating}/5</h5>
                      <small className="text-muted">Rating</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 text-center mb-3">
                    <div className="p-3 rounded-3" style={{ backgroundColor: `${selectedIsland.color}20` }}>
                      <CalendarFill size={24} />
                      <h5 className="fw-bold">{selectedIsland.ageGroup}</h5>
                      <small className="text-muted">Age Group</small>
                    </div>
                  </div>
                </div>

                {/* Characters */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h4 className="fw-bold mb-3">Main Characters</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedIsland.characters.map((character, index) => (
                        <motion.span
                          key={index}
                          className="badge rounded-pill px-3 py-2"
                          style={{ 
                            backgroundColor: selectedIsland.color,
                            fontSize: "0.9rem"
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {character}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Popular Episodes */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h4 className="fw-bold mb-3">Popular Episodes</h4>
                    <div className="list-group">
                      {selectedIsland.popularEpisodes.map((episode, index) => (
                        <motion.div
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center"
                          whileHover={{ 
                            backgroundColor: `${selectedIsland.color}15`,
                            translateX: 10
                          }}
                          style={{ borderLeft: `4px solid ${selectedIsland.color}` }}
                        >
                          <span>{episode}</span>
                          <motion.button
                            className="btn btn-sm"
                            style={{ backgroundColor: selectedIsland.color }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <PlayFill size={16} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="row">
                  <div className="col-12">
                    <h4 className="fw-bold mb-3">Key Features</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedIsland.features.map((feature, index) => (
                        <motion.span
                          key={index}
                          className="badge rounded-pill bg-light text-dark px-3 py-2"
                          style={{ fontSize: "0.9rem", border: `2px solid ${selectedIsland.color}` }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer p-4" style={{
                background: `linear-gradient(135deg, transparent, ${selectedIsland.color}20)`
              }}>
                <div className="d-flex gap-3 justify-content-center w-100">
                  <motion.button
                    className="btn btn-lg px-4 py-2 fw-bold"
                    style={{ 
                      backgroundColor: selectedIsland.color,
                      color: "white"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayFill size={16} />
                    Watch Trailer
                  </motion.button>
                  <motion.button
                    className="btn btn-outline-secondary btn-lg px-4 py-2 fw-bold"
                    style={{ borderColor: selectedIsland.color, color: selectedIsland.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore All Episodes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutWorld;