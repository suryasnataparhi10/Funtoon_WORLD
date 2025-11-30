import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {fallbackImages } from './data';


const Advertisement = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [advertiseData, setAdvertiseData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const fetchAdvertiseData = async () => {
      try {
        const response = await api.get("/advertise");
        setAdvertiseData(response.data.advertise);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching advertise data:", error);
        setLoading(false);
      }
    }
    fetchAdvertiseData()
  } , []);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
    const getImageSrc = (cartoon) => {
    if(imageErrors[cartoon.id]) return fallbackImages[cartoon.id];
    const finalUrl =  `${api.imageBaseURL }/${cartoon.image}`;
      console.log("Image URL:", finalUrl);
    return finalUrl;
  };

  const handleWatchEpisodes = (cartoonTitle) => {
    const urlFriendlyTitle = cartoonTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/episodes/${urlFriendlyTitle}`);
  };
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Comic Neue', cursive, 'Baloo 2', sans-serif"
      }}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            // className="position-absolute"
            style={{
              width: "40px",
              height: "40px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="d-flex gap-3 w-100 px-5" style={{ maxWidth: "1400px" }}>
        {advertiseData.map((cartoon, index) => (
        <motion.div
        key={index}
        onMouseEnter={() => setActiveIndex(index)}
        className="position-relative rounded-5 overflow-hidden"
        animate={{
            flex: activeIndex === index ? 5 : 0.3,
        }}
        transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 80,
            damping: 12,
        }}
        whileHover={{
            y: -10,
            transition: { duration: 0.3 },
        }}
        style={{
            height: "550px",
            backgroundImage: `url(${getImageSrc(cartoon)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            boxShadow: `
            0 10px 40px rgba(0,0,0,0.6),
            inset 0 0 0 4px ${activeIndex === index ? '#ffd166' : 'transparent'}
            `,
            border: "3px solid #fff",
            filter: activeIndex === index ? "brightness(1.1)" : "brightness(0.8)",
        }}
        >
            <img 
              src={getImageSrc(cartoon)} 
              alt={cartoon.title}
              style={{ display: 'none' }}
              onError={() => handleImageError(cartoon.title)}
            />
            
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: activeIndex === index 
                  ? `linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))`
                  : `linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))`,
              }}
            ></div>

            <motion.div
              className="position-absolute top-0 end-0 m-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: activeIndex === index ? 1.2 : 0.8,
                rotate: 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "3rem",
                filter: "drop-shadow(2px 2px 0 #000)",
              }}
            >
              {cartoon.emoji}
            </motion.div>
            <motion.div
              className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0.7,
                y: activeIndex === index ? 0 : 20 
              }}
              transition={{ duration: 0.5 }}
            >
            <motion.div
            className={`d-flex ${activeIndex === index ? "align-items-center justify-content-start" : "flex-column align-items-center"} mb-2`}
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
            >
            <motion.div
                className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                style={{
                width: "50px",
                height: "50px",
                background: cartoon.color,
                fontSize: "1.5rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
                animate={{
                scale: activeIndex === index ? 1.1 : 1,
                }}
                transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                }}
            >
                {cartoon.emoji}
            </motion.div>

            <motion.h3
                className="fw-bold text-center"
                style={{
                textShadow: "2px 2px 0 #000",
                WebkitTextStroke: "1px #000",
                color: "#fff",
                margin: activeIndex === index ? "0 0 0 10px" : "0",
                }}
                animate={{
                opacity: activeIndex === index ? 1 : 0.9,
                y: activeIndex === index ? 0 : 5,
                }}
                transition={{ duration: 0.4 }}
            >
                {cartoon.name}
            </motion.h3>
            </motion.div>`

              {activeIndex === index && (
                <motion.p 
                  className="mb-0 fs-5 fw-semibold"
                  style={{
                    textShadow: "1px 1px 2px #000",
                    color: "#ffeb3b"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {cartoon.description}
                </motion.p>
              )}

                {activeIndex === index && (
    <motion.button
      className="btn btn-warning mt-3 fw-bold px-4 py-2"
      style={{
        borderRadius: "25px",
        boxShadow: "0 4px 15px rgba(255,193,7,0.4)",
        border: "2px solid #fff"
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "#ffca28"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }}
      onClick={() => handleWatchEpisodes(cartoon.name)} // Add this line
    >
      <i className="bi bi-play-fill me-2"></i>
      Watch Episodes
    </motion.button>
  )}
            </motion.div>

            {activeIndex === index && (
              <motion.div
                className="position-absolute bottom-0 start-0 h-1 bg-warning"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                style={{ boxShadow: "0 0 10px #ffeb3b" }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <motion.div
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="mb-1 fw-bold" style={{ textShadow: "1px 1px 2px #000" }}>
            Made with ❤️ for Indian Cartoon Lovers
          </p>
          <div className="d-flex justify-content-center gap-3">
            {["📺", "🎭", "😂", "🦸", "🎨"].map((emoji, idx) => (
              <motion.span
                key={idx}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: idx * 0.2 
                }}
                style={{ fontSize: "1.5rem" }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Advertisement;