import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState("login"); 

  const navItems = [
    { name: "Home", href: "#home", section: "home" },
    { name: "Characters", href: "#characters", section: "home" },
    { name: "Episodes", href: "#episodes", section: "episodes" },
    { name: "Games", href: "#games", section: "games" },
    { name: "Shop", href: "#shop", section: "shop" },
    { name: "About", href: "#about", section: "home" }
  ];

  const handleOpen = (type) => {
    setActiveModal(type);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <motion.nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <motion.button
            className="navbar-brand fw-bold bg-transparent border-0 fs-3 d-flex align-items-center"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            >
              🎨
            </motion.span>{" "}
            FunToon World
          </motion.button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <motion.span
              className="navbar-toggler-icon"
              whileTap={{ scale: 0.9 }}
            ></motion.span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fw-bold">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <motion.a
                    className="nav-link position-relative"
                    href={item.href}
                    whileHover={{ color: "#ffd700", y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{
                        height: "2px",
                        background: "#ffd700",
                        transform: "scaleX(0)",
                        transformOrigin: "left"
                      }}
                      whileHover={{ transform: "scaleX(1)" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}

              {/* ===== Profile Button ===== */}
              <li className="nav-item ms-3 d-flex align-items-center">
                <motion.button
                  className="btn btn-outline-light btn-sm me-2 d-flex align-items-center"
                  onClick={handleProfileClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  Profile
                </motion.button>
              </li>

              {/* ===== Auth Buttons ===== */}
              <li className="nav-item ms-2 d-flex align-items-center">
                <button
                  className="btn btn-outline-light btn-sm me-2"
                  onClick={() => handleOpen("login")}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-warning btn-sm text-dark fw-semibold"
                  onClick={() => handleOpen("register")}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* ===== Animated Modal ===== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop-custom d-flex justify-content-center align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose} // Close on background click
          >
            <motion.div
              className="modal-dialog-custom"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={handleClose}
              ></button>

              <div className="rounded-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeModal === "login" ? (
                    <motion.div
                      key="login"
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: -90, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Login onSwitch={() => setActiveModal("register")} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: -90, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Register onSwitch={() => setActiveModal("login")} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;