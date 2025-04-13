import React from "react";

function BookingRow({ event }) {
  return (
    <div className="booking-row">
      <div className="booking-row-time">
        <p>{new Date(event.date).toDateString() || "Friday, 28 Feb"}</p>
        <p>{event.time || "1:30 pm - 2:30 pm"}</p>
      </div>
      <div className="booking-row-info">
        <h3>{event.title || "Meeting-2"}</h3>
        <p>{event.description || "You and team 2"}</p>
      </div>
      <div className="booking-row-status">
        <span className="booking-status-label">
          {event.status === "upcoming" ? "Accepted" : event.status}
        </span>
      </div>
      <div className="booking-row-participants">
        <span>{event.participants?.length || 0} people</span>
      </div>
    </div>
  );
}

export default BookingRow;