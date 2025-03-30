import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailability, saveAvailability } from "../api/availabilityApi"; 
import "../styles/Event.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Availability() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("availability");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [availabilityData, setAvailabilityData] = useState({
    timeZone: "UTC+5:30",
    availability: [
      { day: "Sunday", slots: [], unavailable: false },
      { day: "Monday", slots: [], unavailable: false },
      { day: "Tuesday", slots: [], unavailable: false },
      { day: "Wednesday", slots: [], unavailable: false },
      { day: "Thursday", slots: [], unavailable: false },
      { day: "Friday", slots: [], unavailable: false },
      { day: "Saturday", slots: [], unavailable: false },
    ],
  });

  useEffect(() => {
      fetchData();
  });

  const fetchData = async () => {
    try {
      if (availabilityData.availability.length > 0) {
        return;
      }
      const user = await fetchCurrentUser();
      if (!user || !user.id) {
        setError("Failed to fetch user information. Please log in again.");
        console.error("Invalid user object:", user);
        return;
      }

      const data = await getAvailability(user.id);
      const transformedData = transformBackendData(data);
      setAvailabilityData(transformedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred while fetching data.");
    }
  };

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

  const transformBackendData = (data) => {
    const { timeZone, availability } = data;
    const updatedDays = availability.map((d) => ({
      day: d.day,
      slots: d.slots.map((slot) => `${slot.startTime} - ${slot.endTime}`),
      unavailable: d.slots.length === 0,
    }));
    return { timeZone, availability: updatedDays };
  };

  const prepareBackendPayload = () => {
    const { timeZone, availability } = availabilityData;
    const transformedAvailability = availability.map((d) => ({
      day: d.day,
      slots: d.unavailable
        ? []
        : d.slots
            .map((s) => {
              const [startTime, endTime] = s.split("-").map((t) => t.trim());
              if (!startTime || !endTime) {
                console.warn(`Incomplete slot detected for ${d.day}: ${s}`);
                return null;
              }
              return { startTime, endTime };
            })
            .filter(Boolean),
    }));
    return { timeZone, availability: transformedAvailability };
  };

  const handleDayToggle = (index) => {
    setAvailabilityData((prev) => {
      const updatedAvailability = [...prev.availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        unavailable: !updatedAvailability[index].unavailable,
        slots: !updatedAvailability[index].unavailable ? [] : updatedAvailability[index].slots,
      };
      return { ...prev, availability: updatedAvailability };
    });
  };

  const handleAddSlot = (dayIndex) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots.push("");
      return updated;
    });
  };

  const handleSlotChange = (dayIndex, slotIndex, value) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots[slotIndex] = value;
      return updated;
    });
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots.splice(slotIndex, 1);
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      setError("");
      const invalidSlots = availabilityData.availability.some((d) =>
        d.slots.some((s) => {
          const [startTime, endTime] = s.split("-").map((t) => t.trim());
          return !startTime || !endTime;
        })
      );
      if (invalidSlots) {
        setError("Please ensure all time slots have both start and end times.");
        return;
      }
      const payload = prepareBackendPayload();
      await saveAvailability(payload);
      alert("Availability saved successfully!");
    } catch (err) {
      if (err.message.includes("validation failed")) {
        setError("Please ensure all time slots have both start and end times.");
      } else {
        setError(err.message || "An error occurred while saving availability.");
      }
    }
  };

  const renderAvailabilityEditor = () => {
    return (
      <div className="availability-editor-container">
        <div className="availability-editor-header">
          <p>Configure times when you are available for bookings:</p>
        </div>
        {error && <p className="availability-error">{error}</p>}

        <table className="availability-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Unavailable</th>
              <th>Time Slots</th>
            </tr>
          </thead>
          <tbody>
            {availabilityData.availability.map((d, i) => (
              <tr key={d.day}>
                <td>{d.day}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.unavailable}
                    onChange={() => handleDayToggle(i)}
                  />
                </td>
                <td>
                  {d.unavailable ? (
                    <span className="unavailable-label">Unavailable</span>
                  ) : (
                    <div className="time-slots-container">
                      {d.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="time-slot-row">
                          <input
                            type="text"
                            value={slot}
                            onChange={(e) =>
                              handleSlotChange(i, slotIndex, e.target.value)
                            }
                          />
                          <button
                            className="remove-slot-btn"
                            onClick={() => handleRemoveSlot(i, slotIndex)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        className="add-slot-btn"
                        onClick={() => handleAddSlot(i)}
                      >
                        + Add Slot
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="availability-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    );
  };

  const renderCalendar = () => {
    return (
      <div className="availability-calendar-container">
        <div className="availability-calendar-header">
          <div className="calendar-switchers">
            <button className="calendar-view-btn active">Week</button>
            <button className="calendar-view-btn">Month</button>
          </div>
          <div className="calendar-timezone">
            {availabilityData.timeZone || "Indian Time Standard"}
          </div>
        </div>
        <div className="availability-calendar-grid">
          <div className="calendar-grid-header">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-grid-body">
            {availabilityData.availability.map((day, dayIndex) => (
              <div key={dayIndex} className="calendar-row">
                {day.unavailable ? (
                  <div className="calendar-cell unavailable">Unavailable</div>
                ) : (
                  <div className="calendar-cell">
                    {day.slots.length > 0 ? (
                      day.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="calendar-slot">
                          {slot}
                        </div>
                      ))
                    ) : (
                      <div className="calendar-slot empty">No Slots</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-events-container">
      <aside className="page-events-sidebar">
        <div className="page-events-logo">
        </div>
        <nav className="page-events-nav">
          <ul>
                <li onClick={() => navigate("/events")}>
                  <FontAwesomeIcon icon={faLink} /> Events
                </li>
                <li onClick={() => navigate("/booking")}>
                  <FontAwesomeIcon icon={faCalendarDay} /> Booking
                </li>
                <li className="active" onClick={() => navigate("/availability")}>
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
          <h2>Availability</h2>
          <p>Configure times when you are available for bookings.</p>
        </header>

        <div className="availability-view-tabs">
          <button
            className={activeView === "availability" ? "availability-tab active" : "availability-tab"}
            onClick={() => setActiveView("availability")}
          >
            Availability
          </button>
          <button
            className={activeView === "calendar" ? "availability-tab active" : "availability-tab"}
            onClick={() => setActiveView("calendar")}
          >
            Calendar View
          </button>
        </div>

        {activeView === "availability" ? renderAvailabilityEditor() : renderCalendar()}
      </main>
    </div>
  );
}
