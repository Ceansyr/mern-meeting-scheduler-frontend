import React from "react";
import "../styles/LandingPage.css";
import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import CalendarSection from "../components/landing/CalendarSection";
import TestimonialSection from "../components/landing/TestimonialSection";
import IntegrationsSection from "../components/landing/IntegrationsSection";
import Footer from "../components/landing/Footer";
import { testimonialsData, integrationsData, footerLinks } from "../data/landingPageData";

function LandingPage() {
    return (
        <div className="landing-page">
            <Header />
            <HeroSection />
            <CalendarSection />
            <TestimonialSection testimonialsData={testimonialsData} />
            <IntegrationsSection integrationsData={integrationsData} />
            <Footer footerLinks={footerLinks} />
        </div>
    );
}

export default LandingPage;
