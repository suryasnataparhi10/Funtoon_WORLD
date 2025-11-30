import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// In both Advertisement.js and EpisodesPage.js
import { indianCartoons, fallbackImages } from '../Home/data';

const EpisodesPage = () => {
  const { cartoonTitle } = useParams();
  const navigate = useNavigate();

  // Find the cartoon data based on the title parameter
  const cartoon = indianCartoons.find(
    (c) => c.title.toLowerCase().replace(/\s+/g, '-') === cartoonTitle
  );

  if (!cartoon) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Cartoon not found!</h2>
      </div>
    );
  }

  // Mock episodes data - you can replace this with actual data
  const episodes = [
    { id: 1, title: "Episode 1: The Beginning", duration: "10:30" },
    { id: 2, title: "Episode 2: New Adventures", duration: "11:15" },
    { id: 3, title: "Episode 3: The Challenge", duration: "10:45" },
    { id: 4, title: "Episode 4: Victory", duration: "12:20" },
    { id: 5, title: "Episode 5: Special Mission", duration: "11:50" },
  ];

  return (
    <div 
      className="min-vh-100 text-white"
      style={{
        background: cartoon.color,
        fontFamily: "'Comic Neue', cursive, 'Baloo 2', sans-serif",
        paddingTop: "80px"
      }}
    >
      <div className="container">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="btn btn-light mb-4 fw-bold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            borderRadius: "20px",
            padding: "10px 20px"
          }}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Cartoons
        </motion.button>

        {/* Cartoon Header */}
        <motion.div 
          className="row align-items-center mb-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="col-md-4 text-center">
            <motion.img
              src={cartoon.img}
              alt={cartoon.title}
              className="img-fluid rounded-4 shadow-lg"
              style={{
                border: "5px solid white",
                maxHeight: "300px"
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="col-md-8">
            <motion.h1 
              className="display-4 fw-bold mb-3"
              style={{ textShadow: "2px 2px 0 #000" }}
            >
              {cartoon.title} {cartoon.character}
            </motion.h1>
            <motion.p 
              className="fs-4 mb-4"
              style={{ textShadow: "1px 1px 0 #000" }}
            >
              {cartoon.description}
            </motion.p>
            <motion.div
              className="d-flex gap-3 align-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="btn btn-warning btn-lg fw-bold px-4 py-2">
                <i className="bi bi-play-circle-fill me-2"></i>
                Play All
              </button>
              <button className="btn btn-outline-light btn-lg fw-bold px-4 py-2">
                <i className="bi bi-heart me-2"></i>
                Add to Favorites
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Episodes List */}
        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="col-12">
            <h2 className="mb-4" style={{ textShadow: "1px 1px 0 #000" }}>
              📺 Episodes
            </h2>
            <div className="row g-3">
              {episodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  className="col-md-6 col-lg-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div 
                    className="p-3 rounded-3 d-flex justify-content-between align-items-center"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.3)"
                    }}
                  >
                    <div>
                      <h5 className="fw-bold mb-1">{episode.title}</h5>
                      <small className="text-light">Duration: {episode.duration}</small>
                    </div>
                    <button className="btn btn-success btn-sm">
                      <i className="bi bi-play-fill"></i>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EpisodesPage;