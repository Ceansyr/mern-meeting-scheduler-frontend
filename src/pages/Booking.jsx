import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

function Booking() {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          setCurrentUser(user); 
        }
        await fetchAllEvents();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

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
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchAllEvents = async () => {
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
      
      const now = new Date();
      const updatedEvents = data.map((evt) => {
        if (!evt.date || isNaN(new Date(evt.date).getTime())) {
          console.warn(`Invalid or missing date for event: ${evt._id}`);
          evt.status = "invalid";
          return evt;
        }
  
        const eventStartTime = new Date(`${evt.date}T${evt.time || "00:00"}`).getTime();
  
        if (eventStartTime < now.getTime()) {
          evt.status = "past";
        } else if (evt.status !== "canceled" && evt.status !== "pending") {
          evt.status = "upcoming";
        }
  
        return evt;
      });

      const hasChanges = updatedEvents.some(
        (updatedEvent, index) =>
          updatedEvent.status !== data[index].status
      );
  
      if (hasChanges) {
        await updateEventStatuses(updatedEvents);
      }
  
      setAllEvents(updatedEvents);

    } catch (err) {
      setError(err.message);
    }
  };

  let updateTimeout;
  const updateEventStatuses = async (events) => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        await fetch(`${import.meta.env.VITE_API_URL}/events/update-statuses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ events }),
        });
      } catch (err) {
        console.error("Error updating event statuses:", err);
      }
    }, 500);
  };

  const getFilteredEvents = () => {
    switch (activeTab) {
      case "upcoming":
        return allEvents.filter((evt) => evt.status === "upcoming");
      case "pending":
        return allEvents.filter((evt) => evt.status === "pending");
      case "canceled":
        return allEvents.filter((evt) => evt.status === "canceled");
      case "past":
        return allEvents.filter((evt) => evt.status === "past");
      default:
        return [];
    }
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="page-events-container">
        <aside className="page-events-sidebar">
            <div className="page-events-logo"></div>
            <nav className="page-events-nav">
              <ul>
                <li onClick={() => navigate("/events")}>
                  <FontAwesomeIcon icon={faLink} /> Events
                </li>
                <li className="active" onClick={() => navigate("/booking")}>
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
          <h2>Booking</h2>
          <p>See upcoming and past events booked through your event type links.</p>
        </header>

        {error && <p className="page-events-error">{error}</p>}

        <div className="booking-tabs">
          <button
            className={activeTab === "upcoming" ? "booking-tab active" : "booking-tab"}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={activeTab === "pending" ? "booking-tab active" : "booking-tab"}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={activeTab === "canceled" ? "booking-tab active" : "booking-tab"}
            onClick={() => setActiveTab("canceled")}
          >
            Canceled
          </button>
          <button
            className={activeTab === "past" ? "booking-tab active" : "booking-tab"}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>

        <div className="booking-list">
          {filteredEvents.length === 0 ? (
            <p>No {activeTab} events found.</p>
          ) : (
            filteredEvents.map((evt) => (
              <div key={evt._id} className="booking-row">
                <div className="booking-row-time">
                  <p>{new Date(evt.date).toDateString() || "Friday, 28 Feb"}</p>
                  <p>{evt.time || "1:30 pm - 2:30 pm"}</p>
                </div>
                <div className="booking-row-info">
                  <h3>{evt.title || "Meeting-2"}</h3>
                  <p>{evt.description || "You and team 2"}</p>
                </div>
                <div className="booking-row-status">
                  <span className="booking-status-label">
                    {evt.status === "upcoming" ? "Accepted" : evt.status}
                  </span>
                </div>
                <div className="booking-row-participants">
                  <span>{evt.participants?.length || 0} people</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Booking;
