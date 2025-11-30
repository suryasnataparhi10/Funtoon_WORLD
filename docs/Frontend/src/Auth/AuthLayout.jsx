import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import "./auth.css";

const AuthLayout = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleSwitch = (tab) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  return (
    <div className="auth-layout-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="row shadow rounded-4 overflow-hidden justify-content-center login-box w-75">
        {/* ===== Left Vertical Nav Panel ===== */}
        <div className="col-md-1 bg-white border-0 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="nav-buttons d-flex flex-column align-items-center gap-4">
            <button
              className={`auth-nav-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleSwitch("login")}
            >
              <i className="bi bi-box-arrow-in-right fs-4"></i>
              <span className="small d-block mt-1">Sign In</span>
            </button>

            <button
              className={`auth-nav-btn ${
                activeTab === "register" ? "active" : ""
              }`}
              onClick={() => handleSwitch("register")}
            >
              <i className="bi bi-person-plus fs-4"></i>
              <span className="small d-block mt-1">Sign Up</span>
            </button>
          </div>
        </div>

        {/* ===== Main Form Section ===== */}
        <div className="col-md-11 p-0 bg-white position-relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-100"
              >
                <Login onSwitch={() => handleSwitch("register")} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-100"
              >
                <Register onSwitch={() => handleSwitch("login")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
