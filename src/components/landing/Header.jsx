import React from "react";

function Header() {
  return (
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
  );
}

export default Header;