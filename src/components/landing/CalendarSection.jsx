import React from "react";

function CalendarSection() {
  return (
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
  );
}

export default CalendarSection;