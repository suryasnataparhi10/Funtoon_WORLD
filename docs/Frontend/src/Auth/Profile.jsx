// Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    dob: "",
    age: "",
    image: ""
  });

  // Enhanced cartoon-themed static profile data
  const cartoonProfileData = {
    name: "Toony McFunface",
    dob: "1998-07-22",
    age: 25,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face&bg=linear-gradient(45deg,#ff6b6b,#4ecdc4,#45b7d1,#96ceb4,#ffeaa7,#fdcb6e)",
    username: "toony_adventurer",
    email: "toony@funtoonworld.com",
    favoriteCharacter: "Sparky the Dragon",
    memberSince: "2022",
    cartoonLevel: "Master Cartoonist",
    achievements: ["Character Creator", "Episode Explorer", "Game Champion", "Shop Spender"],
    bio: "Professional cartoon enthusiast with a passion for classic animation and modern digital art. Always ready for the next animated adventure!",
    specialties: ["Character Design", "Storyboarding", "Voice Acting", "Digital Art"]
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setProfile({
        ...cartoonProfileData,
        email: user.email || cartoonProfileData.email,
        username: user.username || cartoonProfileData.username
      });
      setEditForm({
        name: cartoonProfileData.name,
        dob: cartoonProfileData.dob,
        age: cartoonProfileData.age,
        image: cartoonProfileData.image
      });
    } else {
      setProfile(cartoonProfileData);
      setEditForm({
        name: cartoonProfileData.name,
        dob: cartoonProfileData.dob,
        age: cartoonProfileData.age,
        image: cartoonProfileData.image
      });
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    let updatedAge = editForm.age;
    if (editForm.dob !== profile.dob) {
      const birthDate = new Date(editForm.dob);
      const today = new Date();
      updatedAge = today.getFullYear() - birthDate.getFullYear();
    }

    const updatedProfile = {
      ...profile,
      name: editForm.name,
      dob: editForm.dob,
      age: updatedAge,
      image: editForm.image
    };

    setProfile(updatedProfile);
    setIsEditing(false);
    console.log("Profile updated:", updatedProfile);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      dob: profile.dob,
      age: profile.age,
      image: profile.image
    });
    setIsEditing(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (!profile) {
    return (
      <div className="mt-5 pt-5" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh',
        fontFamily: '"Comic Sans MS", "Segoe UI", cursive, sans-serif'
      }}>
        <div className="text-center pt-5">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>🎨</span>
          </motion.div>
          <motion.p 
            className="text-white mt-3 fw-bold display-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading your cartoon profile...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0" style={{ 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      minHeight: '100vh',
      fontFamily: '"Comic Sans MS", "Segoe UI", cursive, sans-serif'
    }}>
      {/* Enhanced Animated Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 2}rem`,
              opacity: 0.1 + Math.random() * 0.2
            }}
          >
            {['✨', '🎭', '🎨', '🌟', '⚡', '🎪', '🦄', '🌈'][i]}
          </motion.div>
        ))}
      </div>

      <div className="py-5" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="row justify-content-center"
        >
          <div className="col-xl-8 col-lg-10 col-md-12">
            {/* Enhanced Main Profile Card */}
            <motion.div
              variants={itemVariants}
              className="card shadow-lg border-0 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                border: '12px solid transparent',
                borderRadius: '35px',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5),
                  0 0 0 4px rgba(255, 230, 109, 0.3),
                  0 0 30px rgba(255, 107, 107, 0.2)
                `
              }}
            >
              {/* Enhanced Header */}
              <div className="card-header py-5 text-white text-center position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                borderBottom: '8px solid rgba(255, 255, 255, 0.3)'
              }}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }}></div>
                
                <motion.h1 
                  className="card-title mb-3 fw-bold display-4"
                  style={{ 
                    textShadow: '4px 4px 0 rgba(0,0,0,0.1), 8px 8px 0 rgba(0,0,0,0.05)',
                    background: 'linear-gradient(45deg, #ffe66d, #ffd93d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🎨 Cartoon Profile Studio 🎪
                </motion.h1>
                
                <motion.p 
                  className="mb-0 fs-5 opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Welcome to your animated adventure!
                </motion.p>
              </div>

              <div className="card-body p-5">
                {/* Enhanced Profile Image Section */}
                <motion.div 
                  className="text-center mb-5"
                  variants={itemVariants}
                >
                  <motion.div
                    className="position-relative d-inline-block"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div style={{
                      padding: '15px',
                      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                      borderRadius: '50%',
                      display: 'inline-block',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                      position: 'relative'
                    }}>
                      <motion.img
                        src={profile.image}
                        alt="Cartoon Profile"
                        className="rounded-circle shadow"
                        style={{
                          width: '160px',
                          height: '160px',
                          objectFit: 'cover',
                          border: '8px solid #ffe66d',
                          background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)'
                        }}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Floating badges */}
                      <motion.div
                        className="position-absolute top-0 start-100 translate-middle"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          delay: 0.5
                        }}
                        style={{ 
                          fontSize: '2rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                      >
                        ⭐
                      </motion.div>
                      
                      <motion.div
                        className="position-absolute bottom-0 end-0 translate-middle"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, -360]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: 1
                        }}
                        style={{ 
                          fontSize: '1.5rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                      >
                        🎭
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          style={{
                            borderRadius: '25px',
                            border: '3px solid #4ecdc4',
                            fontFamily: '"Comic Sans MS", cursive',
                            padding: '12px 20px',
                            background: 'rgba(255,255,255,0.9)'
                          }}
                          name="image"
                          value={editForm.image}
                          onChange={handleInputChange}
                          placeholder="🎭 Enter your cartoon image URL..."
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Profile Information */}
                <motion.div 
                  className="row g-4"
                  variants={containerVariants}
                >
                  {/* Name Field */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <label className="form-label fw-bold fs-5" style={{ color: '#667eea' }}>
                      🦸 Full Name
                    </label>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.input
                          key="edit-name"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          type="text"
                          className="form-control form-control-lg"
                          style={{
                            borderRadius: '20px',
                            border: '3px solid #ffe66d',
                            fontFamily: '"Comic Sans MS", cursive',
                            fontSize: '1.1rem',
                            padding: '15px 20px',
                            background: 'rgba(255, 230, 109, 0.1)'
                          }}
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <motion.div
                          key="view-name"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="p-4 rounded-3"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))',
                            border: '3px solid rgba(255, 107, 107, 0.3)',
                            backdropFilter: 'blur(10px)'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: '#ff6b6b'
                          }}
                        >
                          <p className="mb-0 fw-bold fs-5" style={{ color: '#2d3436' }}>
                            {profile.name}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Bio Section */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <label className="form-label fw-bold fs-5" style={{ color: '#f093fb' }}>
                      📖 Bio
                    </label>
                    <div className="p-4 rounded-3" style={{
                      background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                      border: '3px dashed rgba(240, 147, 251, 0.5)'
                    }}>
                      <p className="mb-0" style={{ color: '#2d3436', lineHeight: '1.6' }}>
                        {profile.bio}
                      </p>
                    </div>
                  </motion.div>

                  {/* Two Column Layout for Details */}
                  <div className="col-md-6">
                    <motion.div variants={itemVariants}>
                      <label className="form-label fw-bold fs-5" style={{ color: '#4ecdc4' }}>
                        🎂 Date of Birth
                      </label>
                      <AnimatePresence mode="wait">
                        {isEditing ? (
                          <motion.input
                            key="edit-dob"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            type="date"
                            className="form-control form-control-lg"
                            style={{
                              borderRadius: '20px',
                              border: '3px solid #96ceb4',
                              fontFamily: '"Comic Sans MS", cursive',
                              padding: '15px 20px',
                              background: 'rgba(150, 206, 180, 0.1)'
                            }}
                            name="dob"
                            value={editForm.dob}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <motion.div
                            key="view-dob"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="p-4 rounded-3 text-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(77, 208, 225, 0.1), rgba(212, 252, 121, 0.1))',
                              border: '3px solid rgba(77, 208, 225, 0.3)'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <p className="mb-0 fw-bold fs-6" style={{ color: '#2d3436' }}>
                              {new Date(profile.dob).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="col-md-6">
                    <motion.div variants={itemVariants}>
                      <label className="form-label fw-bold fs-5" style={{ color: '#45b7d1' }}>
                        🎪 Age
                      </label>
                      <motion.div 
                        className="p-4 rounded-3 text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 214, 255, 0.2), rgba(231, 198, 255, 0.2))',
                          border: '3px solid rgba(69, 183, 209, 0.5)',
                          backdropFilter: 'blur(10px)'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -1, 1, 0]
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="mb-0 fw-bold display-6" style={{ 
                          color: '#2d3436',
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {profile.age}
                        </p>
                        <small className="text-muted">years young! 🎈</small>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Specialties Section */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <label className="form-label fw-bold fs-5" style={{ color: '#ff9e00' }}>
                      🎨 Specialties
                    </label>
                    <div className="row g-2">
                      {profile.specialties.map((specialty, index) => (
                        <motion.div 
                          key={specialty}
                          className="col-auto"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              background: 'linear-gradient(135deg, #ffd93d, #ff9e00)',
                              color: '#2d3436',
                              fontSize: '0.9rem',
                              border: '2px solid rgba(255,255,255,0.3)'
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {specialty}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div 
                  className="mt-5 pt-3"
                  variants={itemVariants}
                >
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="edit-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="d-grid gap-3 d-md-flex justify-content-md-end"
                      >
                        <motion.button
                          className="btn btn-lg me-md-3 fw-bold px-4 py-3"
                          onClick={handleCancel}
                          style={{
                            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                            border: 'none',
                            borderRadius: '25px',
                            color: 'white',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 12px 25px rgba(255, 107, 107, 0.4)',
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ❌ Cancel
                        </motion.button>
                        <motion.button
                          className="btn btn-lg fw-bold px-4 py-3"
                          onClick={handleSave}
                          style={{
                            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                            border: 'none',
                            borderRadius: '25px',
                            color: 'white',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(78, 205, 196, 0.3)'
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 12px 25px rgba(78, 205, 196, 0.4)',
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          💾 Save Changes
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="view-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="d-grid gap-3"
                      >
                        <motion.button
                          className="btn btn-lg fw-bold py-3"
                          onClick={handleEditToggle}
                          style={{
                            background: 'linear-gradient(135deg, #ffe66d, #fdcb6e)',
                            border: 'none',
                            borderRadius: '25px',
                            color: '#2d3436',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(253, 203, 110, 0.3)'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: '0 12px 25px rgba(253, 203, 110, 0.4)',
                            y: -2
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          ✏️ Edit My Cartoon Profile
                        </motion.button>
                        <motion.button
                          className="btn btn-lg fw-bold py-3"
                          onClick={() => navigate('/')}
                          style={{
                            background: 'linear-gradient(135deg, rgba(168, 237, 234, 0.8), rgba(254, 214, 227, 0.8))',
                            border: '3px solid rgba(253, 121, 168, 0.5)',
                            borderRadius: '25px',
                            color: '#2d3436',
                            fontSize: '1.1rem',
                            backdropFilter: 'blur(10px)'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: '#fd79a8',
                            y: -2
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          🏠 Back to FunToon World
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Enhanced Cartoon Stats Footer */}
              <motion.div 
                className="card-footer py-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
                  borderTop: '6px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="row text-center text-white">
                  {[
                    { count: 12, label: 'Characters', emoji: '🦸' },
                    { count: 45, label: 'Episodes', emoji: '🎬' },
                    { count: 7, label: 'Games', emoji: '🎮' },
                    { count: 23, label: 'Items', emoji: '🛍️' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="col-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <motion.div 
                        className="fw-bold display-6 mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.2 
                        }}
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                      >
                        {stat.count}
                      </motion.div>
                      <small className="opacity-90" style={{ fontSize: '0.9rem' }}>
                        {stat.emoji} {stat.label}
                      </small>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;