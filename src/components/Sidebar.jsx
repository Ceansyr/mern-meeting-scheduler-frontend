import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";
import "../styles/Event.css";

function Sidebar({ activePage, currentUser }) {
  const navigate = useNavigate();

  return (
    <aside className="page-events-sidebar">
      <div className="page-events-logo"></div>
      <nav className="page-events-nav">
        <ul>
          <li 
            className={activePage === "events" ? "active" : ""} 
            onClick={() => navigate("/events")}
          >
            <FontAwesomeIcon icon={faLink} /> Events
          </li>
          <li 
            className={activePage === "booking" ? "active" : ""} 
            onClick={() => navigate("/booking")}
          >
            <FontAwesomeIcon icon={faCalendarDay} /> Booking
          </li>
          <li 
            className={activePage === "availability" ? "active" : ""} 
            onClick={() => navigate("/availability")}
          >
            <FontAwesomeIcon icon={faClock} /> Availability
          </li>
          <li 
            className={activePage === "settings" ? "active" : ""} 
            onClick={() => navigate("/settings")}
          >
            <FontAwesomeIcon icon={faGear} /> Settings
          </li>
        </ul>
      </nav>
      <button
        className="page-events-create-btn"
        onClick={() => navigate("/create-event")}
      >
        + Create
      </button>
      <div className="page-events-user">
        <div className="user-avatar"></div>
        <p>{currentUser?.username || "Guest"}</p>
      </div>
    </aside>
  );
}

export default Sidebar;