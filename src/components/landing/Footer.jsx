import React from "react";

function Footer({ footerLinks }) {
  return (
    <footer className="page-footer">
      <div className="page-footer-box">
        <div className="page-footer-top">
          <div className="page-footer-login-signup">
            <button className="page-btn-light" onClick={() => window.location.href = "/login"}>Log in</button>
            <button className="page-btn-primary" onClick={() => window.location.href = "/signup"}>Sign up free</button>
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
  );
}

export default Footer;