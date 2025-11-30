// Components/Games/GamesSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  BheemLaddooRun, 
  ShinchanPuzzle, 
  SamosaFactory, 
  LittleSinghamChase 
} from './GameComponents';

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState(null);

  const cartoonGames = [
    {
      id: 1,
      title: "Bheem Laddoo Run",
      description: "Run through Dholakpur collecting laddoos while avoiding obstacles!",
      category: "adventure",
      players: "Single Player",
      difficulty: "Easy",
      ageGroup: "5-10 years",
      playTime: "5-10 mins",
      image: "/games/bheem-run.jpg",
      color: "#FF6B35",
      features: ["Obstacle Avoidance", "Laddoo Collection", "Power-ups"],
      character: "Chhota Bheem",
      instructions: "Use arrow keys to move and spacebar to jump"
    },
    {
      id: 2,
      title: "Shinchan Puzzle Challenge",
      description: "Match Shinchan's funny faces in this exciting puzzle game!",
      category: "puzzle",
      players: "Multiplayer",
      difficulty: "Medium",
      ageGroup: "6-12 years",
      playTime: "10-15 mins",
      image: "/games/shinchan-puzzle.jpg",
      color: "#FFD93D",
      features: ["Memory Match", "Time Challenge", "Multiplayer"],
      character: "Shinchan",
      instructions: "Click on cards to find matching pairs"
    },
    {
      id: 3,
      title: "Motu Patlu Samosa Factory",
      description: "Help Motu and Patlu run their samosa factory efficiently!",
      category: "strategy",
      players: "Single Player",
      difficulty: "Medium",
      ageGroup: "7-12 years",
      playTime: "15-20 mins",
      image: "/games/samosa-factory.jpg",
      color: "#4ECDC4",
      features: ["Time Management", "Resource Allocation", "Upgrades"],
      character: "Motu Patlu",
      instructions: "Manage ingredients and serve customers quickly"
    },
    {
      id: 4,
      title: "Little Singham Crime Chase",
      description: "Help Little Singham catch thieves in Mirchi Nagar!",
      category: "action",
      players: "Single Player",
      difficulty: "Hard",
      ageGroup: "8-14 years",
      playTime: "10-15 mins",
      image: "/games/singham-chase.jpg",
      color: "#EF233C",
      features: ["Fast-paced Action", "Quick Reflexes", "Boss Battles"],
      character: "Little Singham",
      instructions: "Use arrow keys to chase and catch criminals"
    },
    {
      id: 5,
      title: "Krishna Butter Race",
      description: "Steal butter while avoiding Yashoda Maiya!",
      category: "adventure",
      players: "Multiplayer",
      difficulty: "Easy",
      ageGroup: "4-8 years",
      playTime: "5-8 mins",
      image: "/games/krishna-butter.jpg",
      color: "#74B3CE",
      features: ["Stealth Gameplay", "Collection", "Avoidance"],
      character: "Krishna",
      instructions: "Sneak around to collect butter without getting caught"
    },
    {
      id: 6,
      title: "Roll No. 21 Super Quiz",
      description: "Test your knowledge with Kid Krrish's school challenges!",
      category: "educational",
      players: "Multiplayer",
      difficulty: "Medium",
      ageGroup: "9-14 years",
      playTime: "12-18 mins",
      image: "/games/super-quiz.jpg",
      color: "#9D4EDD",
      features: ["Trivia Questions", "School Subjects", "Power-ups"],
      character: "Roll No. 21",
      instructions: "Answer questions correctly to earn superpowers"
    }
  ];

  const categories = [
    { id: "all", name: "All Games", icon: "🎮", count: cartoonGames.length },
    { id: "adventure", name: "Adventure", icon: "🗺️", count: cartoonGames.filter(g => g.category === "adventure").length },
    { id: "puzzle", name: "Puzzle", icon: "🧩", count: cartoonGames.filter(g => g.category === "puzzle").length },
    { id: "action", name: "Action", icon: "💥", count: cartoonGames.filter(g => g.category === "action").length },
    { id: "strategy", name: "Strategy", icon: "♟️", count: cartoonGames.filter(g => g.category === "strategy").length },
    { id: "educational", name: "Educational", icon: "📚", count: cartoonGames.filter(g => g.category === "educational").length }
  ];

  const [filter, setFilter] = useState("all");

  const filteredGames = filter === "all" 
    ? cartoonGames 
    : cartoonGames.filter(game => game.category === filter);

  return (
    <section id="games" className="games-section py-5 position-relative overflow-hidden">
      {/* Animated Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`game-bg-${i}`}
            className="position-absolute"
            style={{
              fontSize: `${Math.random() * 2 + 1}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            {["🎯", "🏆", "⭐", "🎪", "🎲", "🕹️"][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
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
            🎮 Fun <span className="text-primary">Cartoon Games</span>
          </motion.h2>
          <motion.p 
            className="lead text-muted fs-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Play exciting games featuring your favorite cartoon characters!
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="row justify-content-center mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-12">
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
                  <span className="badge bg-dark ms-2">{category.count}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          className="row g-4 justify-content-center"
          layout
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="col-md-6 col-lg-4"
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
                className="game-card rounded-4 overflow-hidden shadow-lg position-relative border-0"
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                }}
                onClick={() => setActiveGame(game)}
                style={{
                  background: `linear-gradient(135deg, ${game.color}15, #ffffff)`,
                  border: `3px solid ${game.color}30`,
                  cursor: "pointer",
                  height: "380px",
                  backdropFilter: "blur(10px)"
                }}
              >
                {/* Game Header */}
                <div 
                  className="game-header position-relative w-100 h-40 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${game.color}40, ${game.color}80)`
                  }}
                >
                  <motion.div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ fontSize: "4rem" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {game.character === "Chhota Bheem" && "💪"}
                    {game.character === "Shinchan" && "😜"}
                    {game.character === "Motu Patlu" && "🥟"}
                    {game.character === "Little Singham" && "🚓"}
                    {game.character === "Krishna" && "🦚"}
                    {game.character === "Roll No. 21" && "👽"}
                  </motion.div>
                  
                  {/* Category Badge */}
                  <motion.div
                    className="position-absolute top-3 start-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span 
                      className="badge rounded-pill px-3 py-2 text-white fw-bold"
                      style={{ 
                        backgroundColor: game.color,
                        fontSize: "0.7rem"
                      }}
                    >
                      {game.category.toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Difficulty Badge */}
                  <motion.div
                    className="position-absolute top-3 end-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span 
                      className="badge rounded-pill px-2 py-1 bg-dark text-white"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {game.difficulty}
                    </span>
                  </motion.div>
                </div>

                {/* Game Info */}
                <div className="p-4 position-relative">
                  <motion.h5 
                    className="fw-bold mb-2"
                    style={{ color: game.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {game.title}
                  </motion.h5>
                  <p className="text-muted mb-2 small">{game.character}</p>
                  <p className="small text-dark mb-3">{game.description}</p>
                  
                  {/* Game Stats */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                      <i className="bi bi-people me-1"></i>
                      {game.players}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {game.playTime}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-person me-1"></i>
                      {game.ageGroup}
                    </small>
                  </div>

                  {/* Features */}
                  <div className="d-flex flex-wrap gap-1">
                    {game.features.slice(0, 2).map((feature, idx) => (
                      <motion.span
                        key={idx}
                        className="badge rounded-pill px-2 py-1"
                        style={{ 
                          backgroundColor: game.color,
                          fontSize: "0.65rem",
                          color: "white"
                        }}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                    {game.features.length > 2 && (
                      <motion.span 
                        className="badge bg-secondary rounded-pill px-2 py-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        +{game.features.length - 2}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Play Button */}
                <motion.div
                  className="position-absolute bottom-3 start-3 ms-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <span 
                    className="badge rounded-pill px-3 py-2 text-white fw-bold"
                    style={{ 
                      backgroundColor: game.color,
                      fontSize: "0.8rem"
                    }}
                  >
                    <i className="bi bi-play-fill me-1"></i>
                    PLAY NOW
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
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
              🎮
            </motion.div>
            <h4 className="text-muted mt-3">No games found!</h4>
            <p className="text-muted">Try selecting a different category.</p>
          </motion.div>
        )}
      </div>

      {/* Game Detail Modal */}
      {activeGame && (
        <GameModal 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}
    </section>
  );
};

const GameModal = ({ game, onClose }) => {
  const renderGame = () => {
    switch (game.id) {
      case 1:
        return <BheemLaddooRun onClose={onClose} />;
      case 2:
        return <ShinchanPuzzle onClose={onClose} />;
      case 3:
        return <SamosaFactory onClose={onClose} />;
      case 4:
        return <LittleSinghamChase onClose={onClose} />;
      // Add cases for other games...
      default:
        return (
          <div className="text-center p-5">
            <h3>Game Coming Soon!</h3>
            <p>This game is under development.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ 
        zIndex: 9999, 
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(5px)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content rounded-4 overflow-hidden shadow-lg border-0 bg-white"
        style={{
          maxWidth: '95%',
          width: '900px',
          maxHeight: '95vh',
          overflowY: 'auto'
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

        {/* Game Content */}
        <div className="p-3">
          {renderGame()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GamesSection;