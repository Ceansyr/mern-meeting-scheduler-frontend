import React from "react";
import BookingRow from "./BookingRow";

function BookingList({ events, activeTab }) {
  return (
    <div className="booking-list">
      {events.length === 0 ? (
        <p>No {activeTab} events found.</p>
      ) : (
        events.map((evt) => (
          <BookingRow key={evt._id} event={evt} />
        ))
      )}
    </div>
  );
}

export default BookingList;