import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
return (
    <div className="landing-page">
        <header className="landing-header">
            <div className="landing-logo">
            </div>
            <nav className="landing-nav-links">
                <button 
                    className="landing-btn-primary" 
                    onClick={() => window.location.href = "/signup"}
                >
                    Sign Up free
                </button>
            </nav>
        </header>

        <section className="landing-hero-section">
            <div className="landing-hero-content">
                <h1>CNNCT – Easy <br /> Scheduling Ahead</h1>
                <div className="landing-hero-buttons">
                    <button 
                        className="landing-btn-primary" 
                        onClick={() => window.location.href = "/signup"}
                    >
                        Sign Up free
                    </button>
                </div>
                <div className="landing-hero-image">
                </div>
                <div>
                    <h2>Simplified scheduling for you and your team. </h2>
                    <p>CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.</p>
                </div>
                
                
            </div>
            
        </section>

        {/* Features Section */}
        <section className="landing-features-section">
            <div className="landing-feature">
                <img src="feature-placeholder.png" alt="Feature 1" />
                <h3>Stay Organized</h3>
                <p>
                    Keep track of your events, tasks, and meetings in one place. Easily manage multiple calendars without any confusion.
                </p>
            </div>
            <div className="landing-feature">
                <img src="feature-placeholder.png" alt="Feature 2" />
                <h3>Real-Time Collaboration</h3>
                <p>
                    Invite team members or clients to view and edit schedules in real time. Reduce back-and-forth emails and speed up planning.
                </p>
            </div>
            <div className="landing-feature">
                <img src="feature-placeholder.png" alt="Feature 3" />
                <h3>Conflict Detection</h3>
                <p>
                    Automatic alerts when scheduling overlaps occur. No more double bookings or missed appointments.
                </p>
            </div>
        </section>

        {/* Customer Testimonials */}
        <section className="landing-testimonials-section">
            <h2>Here’s what our customer has to say</h2>
            <div className="landing-testimonial">
                <p className="landing-testimonial-text">
                    “Amazing tool! Saved me hours of back-and-forth emails every week. My team loves how easy it is to schedule meetings now.”
                </p>
                <p className="landing-testimonial-author">— Alex, Team Lead</p>
            </div>
            <div className="landing-testimonial">
                <p className="landing-testimonial-text">
                    “Great product. We integrated it with our existing apps seamlessly. Highly recommend for busy professionals.”
                </p>
                <p className="landing-testimonial-author">— Jordan, Product Manager</p>
            </div>
        </section>

        {/* Integrations */}
        <section className="landing-integrations-section">
            <h2>All Link Apps and Integrations</h2>
            <div className="landing-integration-logos">
                <img src="logo-placeholder.png" alt="Integration 1" />
                <img src="logo-placeholder.png" alt="Integration 2" />
                <img src="logo-placeholder.png" alt="Integration 3" />
                <img src="logo-placeholder.png" alt="Integration 4" />
                <img src="logo-placeholder.png" alt="Integration 5" />
            </div>
        </section>

        {/* Footer Call-to-Action */}
        <footer className="landing-footer-cta">
            <h3>Ready to take control of your schedule?</h3>
            <button 
                className="landing-btn-primary" 
                onClick={() => window.location.href = "/signup"}
            >
                Get Started
            </button>
        </footer>
    </div>
);
}

export default LandingPage;
