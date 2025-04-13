import React from "react";

function TestimonialCard({ testimonial, isDark }) {
  return (
    <div className={`testimonial-card ${isDark ? "dark" : ""}`}>
      <h3 className="testimonial-card-title">{testimonial.title}</h3>
      <p className="testimonial-card-text">{testimonial.text}</p>
      <div className="testimonial-user">
        <div className="avatar"></div>
        <div className="testimonial-user-info" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <strong className="testimonial-user-name">{testimonial.author}</strong>
          <p className="testimonial-user-position">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;