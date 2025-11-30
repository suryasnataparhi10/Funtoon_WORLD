import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      y: -5,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.4,
        rotate: {
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    tap: { scale: 0.9 }
  };

  const linkVariants = {
    hover: {
      x: 10,
      color: "#ffd166",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      className="bg-dark text-light pt-5 pb-3 position-relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      ref={ref}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: `radial-gradient(circle at 20% 80%, rgba(255, 209, 102, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(106, 176, 76, 0.1) 0%, transparent 50%)`,
          zIndex: 0
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating Cartoon Elements */}
      <motion.div
        className="position-absolute"
        style={{
          top: "10%",
          left: "5%",
          fontSize: "1.5rem",
          zIndex: 1
        }}
        variants={floatingVariants}
        animate="floating"
      >
        🎨
      </motion.div>

      <motion.div
        className="position-absolute"
        style={{
          top: "20%",
          right: "8%",
          fontSize: "1.2rem",
          zIndex: 1
        }}
        variants={floatingVariants}
        animate="floating"
        transition={{ delay: 1 }}
      >
        🌟
      </motion.div>

      <motion.div
        className="position-absolute"
        style={{
          bottom: "30%",
          left: "10%",
          fontSize: "1.3rem",
          zIndex: 1
        }}
        variants={floatingVariants}
        animate="floating"
        transition={{ delay: 0.5 }}
      >
        🎭
      </motion.div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <motion.div 
          className="row text-center text-md-start"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          
          {/* Logo & About */}
          <motion.div className="col-md-4 mb-4" variants={itemVariants}>
            <motion.div
              className="d-flex align-items-center justify-content-center justify-content-md-start mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="me-2"
                style={{ fontSize: "2rem" }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🎨
              </motion.span>
              <h4 className="fw-bold text-warning mb-0">FunToon World</h4>
            </motion.div>
            <motion.p 
              style={{ fontSize: "0.9rem", color: "#ccc" }}
              variants={itemVariants}
            >
              Explore your favorite Indian cartoon characters, games, and adventures all in one place! 
            </motion.p>
            
            {/* Animated Character Line */}
            <motion.div
              className="d-none d-md-flex gap-2 mt-3"
              variants={itemVariants}
            >
              {["🦸", "👦", "🦧", "🐱", "🤖"].map((char, index) => (
                <motion.span
                  key={index}
                  style={{ fontSize: "1.5rem" }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="col-md-4 mb-4" variants={itemVariants}>
            <motion.h5 
              className="fw-bold text-warning mb-3"
              whileHover={{ scale: 1.05 }}
            >
              Quick Links
            </motion.h5>
            <ul className="list-unstyled">
              {[
                { name: "Home", icon: "🏠" },
                { name: "Characters", icon: "🦸" },
                { name: "Games", icon: "🎮" },
                { name: "About", icon: "📖" },
                { name: "Contact", icon: "📞" }
              ].map((link, index) => (
                <motion.li key={index} className="mb-2" variants={itemVariants}>
                  <motion.a 
                    href={`#${link.name.toLowerCase()}`}
                    className="text-light text-decoration-none d-flex align-items-center gap-2"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.icon}
                    </motion.span>
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="col-md-4 mb-4" variants={itemVariants}>
            <motion.h5 
              className="fw-bold text-warning mb-3"
              whileHover={{ scale: 1.05 }}
            >
              Follow Us
            </motion.h5>
            <motion.p 
              className="text-muted mb-3"
              variants={itemVariants}
            >
              Join our cartoon community!
            </motion.p>
            <motion.div 
              className="d-flex justify-content-center justify-content-md-start gap-3 fs-4 mt-2"
              variants={containerVariants}
            >
              {[
                { icon: "bi-facebook", color: "#1877F2", label: "Facebook" },
                { icon: "bi-instagram", color: "#E4405F", label: "Instagram" },
                { icon: "bi-twitter", color: "#1DA1F2", label: "Twitter" },
                { icon: "bi-youtube", color: "#FF0000", label: "YouTube" },
                { icon: "bi-tiktok", color: "#000000", label: "TikTok" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-light text-decoration-none position-relative"
                  variants={socialIconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  style={{ 
                    color: social.color,
                    filter: "brightness(1.2)"
                  }}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <i className={`bi ${social.icon}`}></i>
                  
                  {/* Hover Tooltip */}
                  <motion.span
                    className="position-absolute bottom-full left-50 translate-middle-x mb-2 px-2 py-1 rounded bg-dark text-white fs-6"
                    style={{ 
                      whiteSpace: "nowrap",
                      opacity: 0 
                    }}
                    whileHover={{ opacity: 1, y: -5 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div 
              className="mt-4"
              variants={itemVariants}
            >
              <motion.div
                className="d-flex gap-2"
                whileHover="hover"
              >
                <motion.input
                  type="email"
                  placeholder="Your email..."
                  className="form-control form-control-sm"
                  style={{ maxWidth: "200px" }}
                  whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px #ffd166" }}
                />
                <motion.button
                  className="btn btn-warning btn-sm fw-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={pulseVariants}
                  animate="pulse"
                >
                  Join!
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Animated Separator */}
        <motion.hr 
          className="border-secondary my-4"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Copyright */}
        <motion.div 
          className="text-center mt-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.small 
            style={{ color: "#aaa" }}
            whileHover={{ color: "#ffd166" }}
          >
            &copy; {new Date().getFullYear()} Cartoon Universe. All rights reserved.
          </motion.small>
          
          {/* Animated Legal Links */}
          <motion.div 
            className="d-flex justify-content-center gap-3 mt-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-muted text-decoration-none"
                style={{ fontSize: "0.8rem" }}
                whileHover={{ scale: 1.1, color: "#ffd166" }}
                variants={itemVariants}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;