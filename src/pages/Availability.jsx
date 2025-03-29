import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailability, saveAvailability } from "../api/availabilityApi"; 
import "../styles/Event.css"; // Reuse the same CSS from your events pages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Availability() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("availability");
  const [error, setError] = useState("");

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
    const fetchData = async () => {
      try {
        const user = await fetchCurrentUser();
        if (!user) return "";

        const data = await getAvailability(user.id);
        const transformedData = transformBackendData(data);
        setAvailabilityData(transformedData);
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
      setError("No token found. Please log in.");
      return "";
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
        throw new Error("Failed to fetch user data.");
      }

      const userData = await response.json();
      return userData;
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.message || "Failed to fetch user data.");
      return null;
    }
  };
  

  // Transform backend data to local state shape
  const transformBackendData = (data) => {
    // data = { userId, timeZone, availability: [{ day: "Monday", slots: [{startTime, endTime}, ...] }, ...] }
    const { timeZone, availability } = data;
    
    // Convert each day to { day, slots: ["10:00 AM - 4:00 PM", ...], unavailable: false }
    const updatedDays = availability.map((d) => ({
      day: d.day,
      slots: d.slots.map((slot) => `${slot.startTime} - ${slot.endTime}`),
      unavailable: d.slots.length === 0,
    }));
    
    return { timeZone, availability: updatedDays };
  };

  // Convert local state shape back to backend shape
  const prepareBackendPayload = () => {
    const { timeZone, availability } = availabilityData;

    const transformedAvailability = availability.map((d) => ({
      day: d.day,
      slots: d.unavailable
        ? []
        : d.slots.map((s) => {
            const [startTime, endTime] = s.split("-").map((t) => t.trim());
            return { startTime, endTime };
          }),
    }));

    return { timeZone, availability: transformedAvailability };
  };

  // Toggle day unavailable
  const handleDayToggle = (index) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[index] = {
        ...updated.availability[index],
        unavailable: !updated.availability[index].unavailable,
        slots: !updated.availability[index].unavailable ? [] : updated.availability[index].slots,
      };
      return updated;
    });
  };

  // Add a new slot
  const handleAddSlot = (dayIndex) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots.push("");
      return updated;
    });
  };

  // Change a specific slot
  const handleSlotChange = (dayIndex, slotIndex, value) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots[slotIndex] = value;
      return updated;
    });
  };

  // Remove a slot
  const handleRemoveSlot = (dayIndex, slotIndex) => {
    setAvailabilityData((prev) => {
      const updated = { ...prev };
      updated.availability[dayIndex].slots.splice(slotIndex, 1);
      return updated;
    });
  };

  // Save availability to backend
  const handleSave = async () => {
    try {
      setError("");
      const payload = prepareBackendPayload();
      await saveAvailability(payload);
      alert("Availability saved successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Renders the "Availability" editor
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

  // Renders the "Calendar View"
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
            {/* Example placeholder: 2 rows, each row has 7 cells */}
            <div className="calendar-row">
              <div className="calendar-cell"></div>
              <div className="calendar-cell meeting">10:00 AM Meeting</div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell meeting conflict">2:00 PM Meeting</div>
              <div className="calendar-cell"></div>
            </div>
            <div className="calendar-row">
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
              <div className="calendar-cell"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-events-container">
      {/* SIDEBAR */}
      <aside className="page-events-sidebar">
        <div className="page-events-logo">
          <img src="logo-placeholder.png" alt="CNNCT Logo" />
          <span>CNNCT</span>
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
        <div className="page-events-user">
          <img src="user-avatar.png" alt="User Avatar" />
          <p>Guest</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
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
