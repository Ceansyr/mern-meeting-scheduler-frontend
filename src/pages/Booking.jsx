import React, { useState, useEffect, useCallback } from "react";
import "../styles/Event.css";
import Sidebar from "../components/Sidebar";
import BookingTabs from "../components/booking/BookingTabs";
import BookingList from "../components/booking/BookingList";
import { getCurrentUser } from "../api/userApi";
import { getAllEvents, toggleEventStatus } from "../api/eventApi";

function Booking() {
  const [allEvents, setAllEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const processEvents = useCallback((data) => {
    const now = new Date();
    return data.map((evt) => {
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
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
      
      const eventsData = await getAllEvents();
      const updatedEvents = processEvents(eventsData);
      
      const hasChanges = updatedEvents.some(
        (updatedEvent, index) => updatedEvent.status !== eventsData[index].status
      );

      if (hasChanges) {
        let updateTimeout;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(async () => {
          try {
            await toggleEventStatus(updatedEvents);
          } catch (err) {
            console.error("Error updating event statuses:", err);
          }
        }, 500);
      }

      setAllEvents(updatedEvents);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred while fetching data.");
    }
  }, [processEvents]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getFilteredEvents = useCallback(() => {
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
  }, [activeTab, allEvents]);

  const filteredEvents = getFilteredEvents();

  return (
    <div className="page-events-container">
      <Sidebar activePage="booking" currentUser={currentUser} />

      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Booking</h2>
          <p>See upcoming and past events booked through your event type links.</p>
        </header>

        {error && <p className="page-events-error">{error}</p>}

        <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <BookingList events={filteredEvents} activeTab={activeTab} />
      </main>
    </div>
  );
}

export default Booking;
