import React from "react";

function HeroSection() {
  return (
    <section className="landing-hero-section">
      <div className="landing-hero-content">
        <h1 className="landing-hero-title">CNNCT – Easy <br /> Scheduling Ahead</h1>
        <div className="landing-hero-buttons">
          <button 
            className="landing-btn-primary" 
            onClick={() => window.location.href = "/signup"}
          >
            Sign Up free
          </button>
        </div>
        <div className="landing-hero-image"></div>
        <div className="landing-hero-description">
          <h2 className="landing-hero-subtitle">Simplified scheduling for you and your team. </h2>
          <p className="landing-hero-text">CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;