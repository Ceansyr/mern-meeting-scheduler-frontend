import React from "react";
import TestimonialCard from "./TestimonialCard";

function TestimonialSection({ testimonialsData }) {
  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <div className="testimonial-header-content">
          <h2 className="testimonial-title">
            Here's what our <span className="highlight">customer</span> has to say
          </h2>
          <button className="customer-button">Read customer stories</button>
        </div>
        <div className="testimonial-summary">
          <div className="star"></div>
          <p className="testimonial-summary-text">[short description goes in here] lorem ipsum is a placeholder text to demonstrate.</p>
        </div>
      </div>
      <div className="testimonial-container">
        {testimonialsData.map((item, index) => (
          <TestimonialCard 
            key={item.id} 
            testimonial={item} 
            isDark={index === 0 || index === testimonialsData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;