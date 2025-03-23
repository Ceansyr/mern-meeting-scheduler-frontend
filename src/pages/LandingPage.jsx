import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
    const testimonialsData = [
    {
        id: 1,
        title: "Amazing tool! Saved me months",
        text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
        author: "John Master",
        position: "Director, Spark.com",
    },
    {
        id: 2,
        title: "Amazing tool! Saved me months",
        text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
        author: "John Master",
        position: "Director, Spark.com",
    },
    {
        id: 3,
        title: "Amazing tool! Saved me months",
        text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
        author: "John Master",
        position: "Director, Spark.com",
    },
    {
        id: 4,
        title: "Amazing tool! Saved me months",
        text: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
        author: "John Master",
        position: "Director, Spark.com",
    },
    ];

    const integrationsData = [
        { id: 1, title: "Audiomack", description: "Add an Audiomack player to your Linktree" },
        { id: 2, title: "Bandsintown", description: "Drive ticket sales by listing your shows" },
        { id: 3, title: "Bonfire", description: "Design and sell your custom merch" },
        { id: 4, title: "Books", description: "Promote books on your Linktree" },
        { id: 5, title: "Buy Me a Gift", description: "Let visitors support you with a gift" },
        { id: 6, title: "Cameo", description: "Make impossible fan connections possible" },
        { id: 7, title: "Clubhouse", description: "Join the conversation in real time" },
        { id: 8, title: "Community", description: "Build an SMS subscriber list" },
        { id: 9, title: "Contact Details", description: "Easily share downloadable contact details" },
    ];

    const footerLinks = [
        { id: 1, label: "About CNNCT" },
        { id: 2, label: "Careers" },
        { id: 3, label: "Terms and Conditions" },
        { id: 4, label: "Blog" },
        { id: 5, label: "Getting Started" },
        { id: 6, label: "Privacy Policy" },
        { id: 7, label: "Press" },
        { id: 8, label: "Features and How-Tos" },
        { id: 9, label: "Cookie Notice" },
        { id: 10, label: "Social Good" },
        { id: 11, label: "FAQ" },
        { id: 12, label: "Trust Center" },
        { id: 13, label: "Contact" },
        { id: 14, label: "Report a Violation" }
    ];
    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="landing-logo"></div>
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

            <section className="calendar-section">
                <div className="calendar-content">
                    <h2 className="calendar-title">
                        Stay Organized with Your <br /> <strong>Calendar & Meetings</strong>
                    </h2>
                    <p className="calendar-subtitle">Seamless Event Scheduling</p>
                    <ul className="calendar-features">
                        <li className="calendar-feature-item">View all your upcoming meetings and appointments in one place.</li>
                        <li className="calendar-feature-item">Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts.</li>
                        <li className="calendar-feature-item">
                            Customize event types: one-on-ones, team meetings, group sessions, and webinars.
                        </li>
                    </ul>
                </div>

                <div className="calendar-image">
                    <div className="calendar-image-two"></div>
                    <div className="calendar-image-one"></div>
                </div>
            </section>

            <section className="testimonial-section">
                <div className="testimonial-header">
                    <div className="testimonial-header-content">
                        <h2 className="testimonial-title">
                            Here’s what our <span className="highlight">customer</span> has to say
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
                        <div
                            key={item.id}
                            className={`testimonial-card ${
                                index === 0 || index === testimonialsData.length - 1 ? "dark" : ""
                            }`}
                        >
                            <h3 className="testimonial-card-title">{item.title}</h3>
                            <p className="testimonial-card-text">{item.text}</p>
                            <div className="testimonial-user">
                                <div className="avatar"></div>
                                <div className="testimonial-user-info" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <strong className="testimonial-user-name">{item.author}</strong>
                                    <p className="testimonial-user-position">{item.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-integrations-section">
                <h2 className="page-integrations-title">All Link Apps and Integrations</h2>
                <div className="page-integrations-cards">
                    {integrationsData.map((item) => (
                        <div 
                            key={item.id} 
                            className={`page-integration-card integration-${item.id}`}
                        >
                            <div className="page-integration-icon"></div>
                            <div className="page-integration-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="page-footer">
                <div className="page-footer-box">
                    <div className="page-footer-top">
                        <div className="page-footer-login-signup">
                            <button className="page-btn-light" onClick={() => window.location.href = "/login"} >Log in</button>
                            <button className="page-btn-primary" onClick={() => window.location.href = "/signup"} >Sign up free</button>
                        </div>
                        <div className="page-footer-links">
                            {footerLinks.map((link) => (
                                <a key={link.id} href="#">{link.label}</a>
                            ))}
                        </div>
                    </div>
                    <div className="page-footer-bottom">
                        <p className="page-footer-disclaimer">
                            We acknowledge the Traditional Custodians of the land in various regions. This Wurundjeri people of the Kulin nation, and pay our respects to Elders past, present, and emerging.
                        </p>
                        <div className="page-footer-social">
                            <div className="social-icon social-icon-twitter"></div>
                            <div className="social-icon social-icon-youtube"></div>
                            <div className="social-icon social-icon-instagram"></div>
                            <div className="social-icon social-icon-tune"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
