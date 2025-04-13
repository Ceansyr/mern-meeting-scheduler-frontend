import React from "react";

function BookingTabs({ activeTab, onTabChange }) {
  return (
    <div className="booking-tabs">
      <button
        className={activeTab === "upcoming" ? "booking-tab active" : "booking-tab"}
        onClick={() => onTabChange("upcoming")}
      >
        Upcoming
      </button>
      <button
        className={activeTab === "pending" ? "booking-tab active" : "booking-tab"}
        onClick={() => onTabChange("pending")}
      >
        Pending
      </button>
      <button
        className={activeTab === "canceled" ? "booking-tab active" : "booking-tab"}
        onClick={() => onTabChange("canceled")}
      >
        Canceled
      </button>
      <button
        className={activeTab === "past" ? "booking-tab active" : "booking-tab"}
        onClick={() => onTabChange("past")}
      >
        Past
      </button>
    </div>
  );
}

export default BookingTabs;