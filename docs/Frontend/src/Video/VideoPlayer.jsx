// Components/Video/VideoPlayer.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const VideoPlayer = () => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedCartoon, setSelectedCartoon] = useState("Chhota Bheem");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const cartoonEpisodes = {
    "Chhota Bheem": [
      {
        id: 1,
        title: "The Golden Temple Mystery",
        description: "Bheem and friends explore a mysterious golden temple hidden in the Himalayas",
        duration: "15:30",
        thumbnail: "/episodes/bheem1.jpg",
        videoUrl: "#",
        views: "2.5M",
        likes: "125K",
        uploadDate: "2024-01-15",
        characters: ["Bheem", "Chutki", "Raju", "Jaggu"],
        rating: 4.8
      },
      {
        id: 2,
        title: "Laddoo Challenge",
        description: "Bheem participates in a laddoo eating competition in Dholakpur",
        duration: "14:45",
        thumbnail: "/episodes/bheem2.jpg", 
        videoUrl: "#",
        views: "1.8M",
        likes: "98K",
        uploadDate: "2024-01-08",
        characters: ["Bheem", "Kalia", "Dholu", "Bholu"],
        rating: 4.7
      }
    ],
    "Shinchan": [
      {
        id: 1,
        title: "School Adventure",
        description: "Shinchan creates chaos in his school with his funny antics",
        duration: "12:20",
        thumbnail: "/episodes/shinchan1.jpg",
        videoUrl: "#",
        views: "3.2M",
        likes: "180K",
        uploadDate: "2024-01-10",
        characters: ["Shinchan", "Misae", "Hiroshi", "Kazama"],
        rating: 4.9
      },
      {
        id: 2, 
        title: "Family Fun Day",
        description: "Shinchan's family goes on a hilarious picnic outing",
        duration: "13:15",
        thumbnail: "/episodes/shinchan2.jpg",
        videoUrl: "#",
        views: "2.7M",
        likes: "145K",
        uploadDate: "2024-01-03",
        characters: ["Shinchan", "Misae", "Hiroshi", "Himawari"],
        rating: 4.8
      }
    ],
    "Motu Patlu": [
      {
        id: 1,
        title: "Samosa Factory",
        description: "Motu and Patlu start their own samosa business with funny results",
        duration: "16:10",
        thumbnail: "/episodes/motu1.jpg",
        videoUrl: "#",
        views: "2.1M",
        likes: "110K",
        uploadDate: "2024-01-12",
        characters: ["Motu", "Patlu", "John", "Number 1"],
        rating: 4.6
      }
    ]
  };

  const cartoons = Object.keys(cartoonEpisodes);

  const handlePlayEpisode = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setCurrentEpisode(null);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section id="watch-now" className="video-section py-5 bg-light position-relative">
      {/* Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`video-bg-${i}`}
            className="position-absolute"
            style={{
              fontSize: `${Math.random() * 2 + 1}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.05,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {["📺", "🎬", "🎥", "🎞️", "🍿"][i % 5]}
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
            📺 Watch <span className="text-primary">Cartoon Episodes</span>
          </motion.h2>
          <motion.p 
            className="lead text-muted fs-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enjoy full episodes of your favorite cartoons anytime, anywhere!
          </motion.p>
        </motion.div>

        {/* Cartoon Selection */}
        <motion.div 
          className="row justify-content-center mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="col-lg-10">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {cartoons.map((cartoon) => (
                <motion.button
                  key={cartoon}
                  className={`btn rounded-pill px-4 py-3 fw-bold shadow-sm ${
                    selectedCartoon === cartoon 
                      ? 'btn-primary text-white' 
                      : 'btn-outline-primary text-dark'
                  }`}
                  onClick={() => setSelectedCartoon(cartoon)}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cartoon === "Chhota Bheem" && "💪"}
                  {cartoon === "Shinchan" && "😜"}
                  {cartoon === "Motu Patlu" && "🥟"}
                  {cartoon}
                  <span className="badge bg-dark ms-2">
                    {cartoonEpisodes[cartoon].length}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Episodes Grid */}
        <motion.div 
          className="row g-4"
          layout
        >
          {cartoonEpisodes[selectedCartoon].map((episode, index) => (
            <motion.div
              key={episode.id}
              className="col-md-6 col-lg-4"
              layout
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                className="episode-card rounded-4 overflow-hidden shadow-lg position-relative border-0 bg-white"
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
              >
                {/* Thumbnail */}
                <div 
                  className="episode-thumbnail position-relative overflow-hidden"
                  style={{ height: "200px", background: "#f8f9fa" }}
                >
                  <motion.div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ 
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: "4rem",
                      color: "white"
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    📺
                  </motion.div>
                  
                  {/* Duration Badge */}
                  <motion.div
                    className="position-absolute bottom-3 start-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2">
                      <i className="bi bi-clock me-1"></i>
                      {episode.duration}
                    </span>
                  </motion.div>

                  {/* Play Button Overlay */}
                  <motion.button
                    className="position-absolute top-50 start-50 translate-middle btn btn-primary rounded-circle"
                    style={{ 
                      width: "60px", 
                      height: "60px",
                      background: "rgba(255,255,255,0.9)",
                      border: "none"
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      background: "rgba(255,255,255,1)"
                    }}
                    onClick={() => handlePlayEpisode(episode)}
                  >
                    <i className="bi bi-play-fill text-primary fs-4"></i>
                  </motion.button>
                </div>

                {/* Episode Info */}
                <div className="p-4">
                  <motion.h5 
                    className="fw-bold mb-2 text-dark"
                    whileHover={{ color: "#0d6efd" }}
                  >
                    {episode.title}
                  </motion.h5>
                  <p className="text-muted small mb-3">{episode.description}</p>
                  
                  {/* Episode Stats */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                      <i className="bi bi-eye me-1"></i>
                      {episode.views}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-heart me-1"></i>
                      {episode.likes}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-star me-1"></i>
                      {episode.rating}
                    </small>
                  </div>

                  {/* Characters */}
                  <div className="d-flex flex-wrap gap-1">
                    {episode.characters.slice(0, 3).map((character, idx) => (
                      <motion.span
                        key={idx}
                        className="badge rounded-pill px-2 py-1 bg-light text-dark"
                        style={{ fontSize: "0.65rem" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {character}
                      </motion.span>
                    ))}
                    {episode.characters.length > 3 && (
                      <span className="badge bg-secondary rounded-pill px-2 py-1">
                        +{episode.characters.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="btn btn-outline-primary btn-lg px-5 py-3 fw-bold"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(13, 110, 253, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Load More Episodes
          </motion.button>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {isPlaying && currentEpisode && (
          <VideoModal 
            episode={currentEpisode}
            onClose={handleCloseVideo}
            videoRef={videoRef}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Video Modal Component
const VideoModal = ({ episode, onClose, videoRef }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      className="video-modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ 
        zIndex: 9999, 
        backgroundColor: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(10px)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="video-modal-content rounded-4 overflow-hidden shadow-lg bg-dark"
        style={{
          maxWidth: "90%",
          width: "1000px",
          maxHeight: "90vh",
          overflowY: "auto"
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

        {/* Video Player */}
        <div className="video-container position-relative">
          {/* Placeholder for actual video player */}
          <div 
            className="w-100 bg-black d-flex align-items-center justify-content-center"
            style={{ height: "500px" }}
          >
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                style={{ fontSize: "4rem" }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📺
              </motion.div>
              <h4 className="mt-3">Video Player Placeholder</h4>
              <p className="text-muted">In a real implementation, this would be a video player</p>
              <motion.button
                className="btn btn-primary btn-lg mt-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-play-fill me-2"></i>
                Play Episode
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4 text-white">
          <div className="row">
            <div className="col-md-8">
              <motion.h3 
                className="fw-bold mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {episode.title}
              </motion.h3>
              
              <motion.p 
                className="text-light mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {episode.description}
              </motion.p>

              {/* Episode Details */}
              <motion.div 
                className="row text-muted mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="col-4">
                  <strong>Duration:</strong>
                  <br />
                  {episode.duration}
                </div>
                <div className="col-4">
                  <strong>Views:</strong>
                  <br />
                  {episode.views}
                </div>
                <div className="col-4">
                  <strong>Rating:</strong>
                  <br />
                  ⭐ {episode.rating}/5
                </div>
              </motion.div>

              {/* Characters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h6 className="fw-bold mb-2">Characters in this episode:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {episode.characters.map((character, idx) => (
                    <motion.span
                      key={idx}
                      className="badge rounded-pill px-3 py-2 bg-primary bg-opacity-25 text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      {character}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="col-md-4">
              {/* Action Buttons */}
              <motion.div 
                className="d-flex flex-column gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'} w-100 py-3`}
                  onClick={() => setIsLiked(!isLiked)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                  {isLiked ? 'Liked' : 'Like'} ({episode.likes})
                </motion.button>

                <motion.button
                  className={`btn ${isSaved ? 'btn-warning' : 'btn-outline-warning'} w-100 py-3`}
                  onClick={() => setIsSaved(!isSaved)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
                  {isSaved ? 'Saved' : 'Save for Later'}
                </motion.button>

                <motion.button
                  className="btn btn-outline-light w-100 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-share me-2"></i>
                  Share Episode
                </motion.button>

                <motion.button
                  className="btn btn-outline-info w-100 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-download me-2"></i>
                  Download
                </motion.button>
              </motion.div>

              {/* Next Episode */}
              <motion.div 
                className="mt-4 p-3 bg-dark bg-opacity-50 rounded-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h6 className="fw-bold mb-2">Next Episode:</h6>
                <p className="small text-muted mb-2">Coming up next in the series</p>
                <motion.button
                  className="btn btn-outline-primary btn-sm w-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Play Next
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;