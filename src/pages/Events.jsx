import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch logged-in user info directly
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setCurrentUser(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch all events from the backend
  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchEvents();
  }, []);

  // Toggle event active state
  const handleToggle = async (eventId, currentState) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${eventId}/toggle`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isActive: !currentState }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle event");
      }
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit event (placeholder)
  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  // Categorize events by status
  const categorizedEvents = {
    upcoming: events.filter((evt) => evt.status === "upcoming"),
    pending: events.filter((evt) => evt.status === "pending"),
    canceled: events.filter((evt) => evt.status === "canceled"),
  };

  return (
    <div className="page-events-container">
      {/* Sidebar */}
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
        <button
          className="page-events-create-btn"
          onClick={() => navigate("/create-event")}
        >
          + Create
        </button>
        <div className="page-events-user">
          <img src="user-avatar.png" alt="User Avatar" />
          <p>{currentUser?.username || "Guest"}</p>
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
          {/* Upcoming Meetings */}
          <h3 className="page-events-category-title">Upcoming Meetings</h3>
          <div className="page-events-category-cards">
            {categorizedEvents.upcoming.map((evt) => (
              <div key={evt._id} className="page-events-card">
                <h3>{evt.title}</h3>
                <p>
                  {new Date(evt.date).toDateString()} <br /> {evt.time}
                </p>
                <div className="page-events-card-status">
                  <span>{evt.status}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={evt.isActive}
                      onChange={() => handleToggle(evt._id, evt.isActive)}
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
          </div>

          {/* Pending Meetings */}
          <h3 className="page-events-category-title">Pending Meetings</h3>
          <div className="page-events-category-cards">
            {categorizedEvents.pending.map((evt) => (
              <div key={evt._id} className="page-events-card">
                <h3>{evt.title}</h3>
                <p>
                  {new Date(evt.date).toDateString()} <br /> {evt.time}
                </p>
                <div className="page-events-card-status">
                  <span>{evt.status}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={evt.isActive}
                      onChange={() => handleToggle(evt._id, evt.isActive)}
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
          </div>

          {/* Canceled Meetings */}
          <h3 className="page-events-category-title">Canceled Meetings</h3>
          <div className="page-events-category-cards">
            {categorizedEvents.canceled.map((evt) => (
              <div key={evt._id} className="page-events-card">
                <h3>{evt.title}</h3>
                <p>
                  {new Date(evt.date).toDateString()} <br /> {evt.time}
                </p>
                <div className="page-events-card-status">
                  <span>{evt.status}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={evt.isActive}
                      onChange={() => handleToggle(evt._id, evt.isActive)}
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventsPage;
