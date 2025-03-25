import React, { useEffect, useState } from "react";
import "../styles/Event.css";

/**
 * Sample event data shape (from backend):
 * {
 *   _id: "123",
 *   title: "Meeting",
 *   date: "2025-03-28",
 *   time: "10:00 AM",
 *   status: "upcoming", // can be "upcoming", "pending", "canceled"
 *   isActive: true
 * }
 */

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetchEvents();
    fetchUserDetails();
  }, []);

  // Fetch all events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreate = () => {
    // Open a modal or navigate to a create meeting page
    alert("Open create meeting form");
  };

  // Toggle event activation
  const handleToggle = async (eventId, currentState) => {
    try {
      // Determine the new state by toggling the current state
      const newState = !currentState;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/toggle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: newState }), // Send the new state to the backend
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle event");
      }

      // Refresh events after toggling
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      // Refresh events after deletion
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit event (placeholder)
  const handleEdit = (eventId) => {

    alert(`Edit event with ID: ${eventId}`);
  };

  const categorizedEvents = {
    upcoming: events.filter((evt) => evt.status === "upcoming"),
    pending: events.filter((evt) => evt.status === "pending"),
    canceled: events.filter((evt) => evt.status === "canceled"),
  };

  return (
    <div className="page-events-container">
        <aside className="page-events-sidebar">
          <div className="page-events-logo">
            <img src="logo-placeholder.png" alt="CNNCT Logo" />
            <span>CNNCT</span>
          </div>
          <nav className="page-events-nav">
            <ul>
          <li className="active">Events</li>
          <li>Booking</li>
          <li>Availability</li>
          <li>Settings</li>
            </ul>
          </nav>
          <button className="page-events-create-btn" onClick={handleCreate}>+ Create</button>
          <div className="page-events-user">
            <img src="user-avatar.png" alt="User Avatar" />
            <p>{userDetails.name}</p>
          </div>
        </aside>

        {/* Main Content */}
      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Events</h2>
          <p>Create events to share for people to book on your calendar.</p>
        </header>

        {error && <p className="page-events-error">{error}</p>}

        <div className="page-events-cards">
          <h3>Upcoming Meetings</h3>
          {categorizedEvents.upcoming.map((evt) => (
            <div key={evt._id} className="page-events-card">
              <h3>{evt.title}</h3>
              <p>
                {new Date(evt.date).toDateString()} <br />
                {evt.time}
              </p>
              <div className="page-events-card-status">
                <span>{evt.status}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={evt.isActive}
                    onChange={() => handleToggle(evt._id, evt.isActive)} // Pass current state
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="page-events-card-actions">
                <button onClick={() => handleEdit(evt._id)}>✏️</button>
                <button onClick={() => handleDelete(evt._id)}>🗑️</button>
              </div>
            </div>
          ))}

          <h3>Pending Meetings</h3>
          {categorizedEvents.pending.map((evt) => (
            <div key={evt._id} className="page-events-card">
              {/* Same structure as above */}
            </div>
          ))}

          <h3>Canceled Meetings</h3>
          {categorizedEvents.canceled.map((evt) => (
            <div key={evt._id} className="page-events-card">
              {/* Same structure as above */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default EventsPage;
