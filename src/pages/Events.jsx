import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (eventId) => {
    handleDelete(eventId);
    navigate(`/create-event`);
  };

  const handleCopyLink = (eventId) => {
    try {
      const event = events.find((evt) => evt._id === eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      if (!event.eventLink) {
        throw new Error("No link found for this event");
      }

      navigator.clipboard.writeText(event.eventLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link:", err);
          setError("Failed to copy link");
        });
    } catch (err) {
      setError(err.message);
    }
  };

  const formatTimeRange = (startTime, duration) => {
    try {
      const time = startTime.split(" ");
      const [hours, minutes] = time[0].split(":").map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);

      const durationInMinutes = parseDuration(duration);
      const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);

      const startFormatted = startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const endFormatted = endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return `${startFormatted} to ${endFormatted}`;
    } catch (err) {
      console.error("Error formatting time range:", err);
      return "Invalid time range";
    }
  };

  const parseDuration = (duration) => {
    try {
      if (!duration) {
        return 60;
      }
      return parseInt(duration) * 60;
    } catch (err) {
      console.error("Error parsing duration:", err);
      return 0;
    }
  };

  return (
    <div className="page-events-container">
      <aside className="page-events-sidebar">
        <div className="page-events-logo"></div>
        <nav className="page-events-nav">
          <ul>
            <li className="active" onClick={() => navigate("/events")}>
              <FontAwesomeIcon icon={faLink} /> Events
            </li>
            <li onClick={() => navigate("/booking")}>
              <FontAwesomeIcon icon={faCalendarDay} /> Booking
            </li>
            <li onClick={() => navigate("/availability")}>
              <FontAwesomeIcon icon={faClock} /> Availability
            </li>
            <li onClick={() => navigate("/settings")}>
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

      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Events</h2>
          <p>Create events to share for people to book on your calendar.</p>
        </header>

        {error && <p className="page-events-error">{error}</p>}

        <div className="page-events-cards">
          {events.map((evt) => (
            <div key={evt._id} className={`meeting-card ${evt.isActive ? "" : "toggled"}`}>
              {evt.hasConflict && (
                <div className="meeting-card-conflict">
                  <span>Conflict of timing</span>
                </div>
              )}

              <div className="meeting-card-header">
                <h3 className="meeting-card-title">{evt.title || "Meeting"}</h3>
                <button
                  className="meeting-card-edit-btn"
                  onClick={() => handleEdit(evt._id)}
                >
                  <div className="edit icon"> </div>
                </button>
              </div>

              <p className="meeting-card-date">
                {new Date(evt.date).toDateString()}
              </p>
              <p className="meeting-card-time">
                {formatTimeRange(evt.time, evt.duration)}
              </p>
              <p className="meeting-card-meta">
                {evt.duration || "1hr"}, {"Group meeting"}
              </p>

              <div className="meeting-card-footer">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={evt.isActive}
                    onChange={() => handleToggle(evt._id, evt.isActive)}
                  />
                  <span className="slider round"></span>
                </label>

                <div className="meeting-card-actions">
                  <button
                    className="meeting-card-icon-btn"
                    onClick={() => handleCopyLink(evt._id)}
                  >
                    <div className="copy icon"> </div>
                  </button>
                  <button
                    className="meeting-card-icon-btn"
                    onClick={() => handleDelete(evt._id)}
                  >
                    <div className="delete icon"> </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default EventsPage;
