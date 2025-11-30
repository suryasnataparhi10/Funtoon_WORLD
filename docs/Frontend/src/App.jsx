import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Auth/Navbar";
import HomeLayout from "./Home/HomeLayout";
import Footer from "./Auth/footer";
import EpisodesPage from "./Advertisement/EpisodesPage";
import CartoonsPage from "./Hero/CartoonsPage";
import Profile from "./Auth/Profile";

const App = () => {
  return (
    <Router basename="/Funtoon_WORLD">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/episodes/:cartoonTitle" element={<EpisodesPage />} />
        <Route path="/cartoons" element={<CartoonsPage />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;