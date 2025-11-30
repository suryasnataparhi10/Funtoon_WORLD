// Home/HomeLayout.jsx (Updated)
import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import Advertisement from "./Advertisement";
import AboutWorld from "./AboutWorld";
import CharacterGallery from "./CharacterGallery";
import GamesSection from "../Games/GamesSection";
import VideoPlayer from "../Video/VideoPlayer";

const HomeLayout = () => {
  return (
    <section className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Hero />
      </motion.div>

      {/* Advertisement Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Advertisement />
      </motion.div>

      {/* About World Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <AboutWorld />
      </motion.div>

      {/* Character Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <CharacterGallery />
      </motion.div>

      {/* Games Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <GamesSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <VideoPlayer />
      </motion.div>
    </section>
  );
};

export default HomeLayout;