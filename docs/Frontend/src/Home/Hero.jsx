import React, { useEffect, useState } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import hero from "../assets/cartoon-hero-bg.jpg"; 
import "./Home.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState({});  // you can also do useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroBanner = async () => {
      try {
        const res = await api.get("/hero-banner");
        if (res.data.totalHeroBanners > 0) {
          const activeBanner = res.data.heroBanners.find(b => b.isActive);
          setHeroData(activeBanner);
        }
      } catch (error) {
        console.error("Error fetching hero banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroBanner();
  }, []);


  if (loading) return null;

  return (
    <section
      className="hero-section position-relative d-flex align-items-center text-light"
      style={{
        // backgroundImage: `url(${heroData?. imageUrl || hero})`,
        backgroundImage: `url(http://localhost:5000/${heroData?.imageUrl || "assets/cartoon-hero-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Cartoon-style overlay */}
      <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="container position-relative py-5" style={{ zIndex: 2 }}>
        <div className="row align-items-center justify-content-between py-5">
          <div className="col-lg-7 text-center text-lg-start fade-in-up">
            <h1 className="display-3 fw-bold mb-3 cartoon-title">
              {/* Welcome to <span className="text-gradient">ToonWorld!</span> */}
              {heroData?. title || "Welcome to ToonWorld!"}
            </h1>
            <p className="lead mb-4 text-light opacity-90 fw-semibold">
              {heroData?. subtitle || "Watch all your favorite cartoon heroes like Chhota Bheem, Ninja Hattori, Doraemon, Shinchan & Oggy and the Cockroaches — all in one magical world! 🎉"}
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <a
                href={heroData?. watchUrl || "#"}
                className="btn btn-toon-primary btn-lg px-4 rounded-pill d-flex align-items-center justify-content-center"
              >
                Watch Now <ArrowRight className="ms-2" />
              </a>
              <button
    onClick={() => navigate('/cartoons')}
    className="btn btn-toon-outline btn-lg px-4 rounded-pill"
  >
    Meet the Toons
  </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
