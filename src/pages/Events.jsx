import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";
import Sidebar from "../components/Sidebar";
import EventsContainer from "../components/events/EventContainer";
import { useCurrentUser } from "../utils/authUtils";
import { fetchEvents, toggleEvent, deleteEvent } from "../utils/apiUtils";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleToggle = async (eventId, currentState) => {
    try {
      await toggleEvent(eventId, currentState);
      loadEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      loadEvents();
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

  return (
    <div className="page-events-container">
      <Sidebar activePage="events" currentUser={currentUser} />
      
      <EventsContainer
        events={events}
        error={error}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onCopyLink={handleCopyLink}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default EventsPage;
