import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarDay, faClock, faGear } from "@fortawesome/free-solid-svg-icons";

function CreateEventPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

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

  const [formData, setFormData] = useState({
    topic: "",
    hostName: "Guest",
    description: "",
    date: "",
    time: "",
    amPm: "PM",
    timeZone: "",
    duration: " ",
    bannerImage: "",
    backgroundColor: "",
    eventLink: "",
    password: "",
    participants: "",
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const isLightColor = (color) => {
    const hexToRgb = (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const rgb = hexToRgb(color);
    if (!rgb) return false;

    const brightness = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    return brightness > 200;
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    alert("Form canceled.");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.topic || !formData.date || !formData.time) {
      setError("Please fill in the required fields: topic, Date, and Time.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedFormData = { ...formData };

    const payload = {
      title: updatedFormData.topic,
      description: updatedFormData.description,
      date: updatedFormData.date,
      time: `${updatedFormData.time} ${updatedFormData.amPm} (${updatedFormData.timeZone})`,
      bannerImage: updatedFormData.bannerImage,
      backgroundColor: updatedFormData.backgroundColor,
      hostName: currentUser?.username || "Guest",
      duration: updatedFormData.duration,
      eventLink: updatedFormData.eventLink,
      password: updatedFormData.password,
      participants: updatedFormData.participants
        ? updatedFormData.participants.split(",").map((p) => p.trim())
        : [],
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      navigate("/events");
    } catch (err) {
      setError(err.message || "An error occurred during event creation.");
    }
  };

  return (
    <div className="page-events-container">
      <aside className="page-events-sidebar">
        <div className="page-events-logo"></div>
        <nav className="page-events-nav">
          <ul>
            <li onClick={() => navigate("/events")}>
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

        <div className="add-event-container">
          <h2 className="add-event-title">Add Event</h2>
          {error && <p className="add-event-error">{error}</p>}
          <div className="line"></div>

          <form
            className="add-event-form"
            onSubmit={step === 1 ? handleNext : handleSubmit}
          >
            {step === 1 && (
              <>
                <div className="add-event-top-row">
                  <div className="add-event-field label-input">
                    <label>
                      Event Topic <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="topic"
                      placeholder="Set a conference topic before it starts"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="add-event-field label-input">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="add-event-field label-input">
                    <label>Host name</label>
                    <input
                      type="text"
                      name="hostName"
                      value={currentUser?.username || "Guest"}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="add-event-field label-input">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="line"></div>

                <div className="add-event-bottom-row">
                  <div className="add-event-date-time label-input">
                    <label>
                      Date and time <span>*</span>
                    </label>
                    <div className="add-event-datetime-group">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="small"
                        type="text"
                        name="time"
                        placeholder="02:30"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      <select
                        className="small"
                        name="amPm"
                        value={formData.amPm}
                        onChange={handleChange}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                      <select
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                      >
                        <option value="UTC+5:00 Delhi">UTC +5:00 Delhi</option>
                        <option value="UTC+5:30">UTC+5:30</option>
                        <option value="UTC+1:00">UTC+1:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="add-event-duration label-input">
                    <label>Set duration</label>
                    <select
                      className="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      onBlur={handleChange}
                    >
                      <option value="0.5">30 minutes</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                    </select>
                  </div>
                </div>

                <div className="add-event-buttons">
                  <button
                    type="button"
                    className="add-event-cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="add-event-save">
                    Save
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="page-create-event-step step-two-container">
                <div className="step-two-banner-section">
                  <label className="step-two-label">Banner</label>
                  <div
                    className="step-two-banner"
                    style={{
                      backgroundColor: formData.backgroundColor || "#f0f0f0",
                    }}
                  >
                    <div className="step-two-banner-avatar"></div>
                    <span
                      style={{
                        color: isLightColor(
                          formData.backgroundColor || "#f0f0f0"
                        )
                          ? "#333"
                          : "#fff",
                      }}
                      className="step-two-banner-title"
                    >
                      {formData.topic || "Team A Meeting-1"}
                    </span>
                  </div>
                </div>

                <div className="step-two-color-section">
                  <label className="step-two-label">
                    Custom Background Color
                  </label>
                  <div className="step-two-color-swatches">
                    <div
                      className="swatch"
                      style={{ backgroundColor: "#ff6600" }}
                      onClick={() =>
                        setFormData({ ...formData, backgroundColor: "#ff6600" })
                      }
                    ></div>
                    <div
                      className="swatch"
                      style={{ backgroundColor: "#000000" }}
                      onClick={() =>
                        setFormData({ ...formData, backgroundColor: "#000000" })
                      }
                    ></div>
                    <div
                      className="swatch"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #ccc",
                      }}
                      onClick={() =>
                        setFormData({ ...formData, backgroundColor: "#ffffff" })
                      }
                    ></div>
                  </div>
                  <input
                    type="text"
                    className="step-two-hex-input"
                    placeholder="#000000"
                    value={formData.backgroundColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        backgroundColor: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="line"></div>

                <div className="step-two-field label-input">
                  <label className="step-two-label">
                    Add link <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="eventLink"
                    placeholder="Enter URL Here"
                    value={formData.eventLink}
                    onChange={handleChange}
                  />
                </div>

                <div className="step-two-field label-input">
                  <label className="step-two-label">Add Emails</label>
                  <input
                    type="text"
                    name="participants"
                    placeholder="Add member Emails"
                    value={formData.participants}
                    onChange={handleChange}
                  />
                </div>

                <div className="step-two-actions">
                  <button
                    type="button"
                    className="step-two-cancel-btn"
                    onClick={() => setStep(1)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="step-two-save-btn">
                    Save
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEventPage;
