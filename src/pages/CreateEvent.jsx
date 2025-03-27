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

  // State for form data
  const [formData, setFormData] = useState({
    topic: "",
    hostName: "Guest",
    description: "",
    date: "",
    time: "",
    amPm: "PM",
    timeZone: "UTC+5:00 Delhi",
    duration: "1 hour",
    bannerImage: "",
    backgroundColor: "",
    eventLink: "",
    password: "",
    participants: "", // comma-separated string, later parsed to an array
  });

  // Step management: step 1 for basic info, step 2 for customization
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Navigate back or reset form
    alert("Form canceled.");
  };

  // Validate and proceed to next step
  const handleNext = (e) => {
    e.preventDefault();
    // Basic validation for Step 1: topic, Date, Time are required
    if (!formData.topic || !formData.date || !formData.time) {
      setError("Please fill in the required fields: topic, Date, and Time.");
      return;
    }
    setError("");
    setStep(2);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Prepare payload; convert participants to array if provided
    const payload = {
      topic: formData.topic,
      hostName: currentUser?.username || "Guest",
      description: formData.description,
      date: formData.date,
      time: `${formData.time} ${formData.amPm} (${formData.timeZone})`,
      duration: formData.duration,
      bannerImage: formData.bannerImage,
      backgroundColor: formData.backgroundColor,
      eventLink: formData.eventLink,
      password: formData.password,
      participants: formData.participants
        ? formData.participants.split(",").map((p) => p.trim())
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

      // On success, navigate back to Events Page
      navigate("/events");
    } catch (err) {
      setError(err.message || "An error occurred during event creation.");
    }
  };

  // Render the form according to the current step
  return (
    <div className="page-events-container">
      {/* Sidebar */}
      <aside className="page-events-sidebar">
        <div className="page-events-logo"></div>
        <nav className="page-events-nav">
          <ul>
            <li className="active">
              <FontAwesomeIcon icon={faLink} /> Events
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendarDay} /> Booking
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} /> Availability
            </li>
            <li>
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

      {/* Main Content */}
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

          <form className="add-event-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
            {/* Top Section */}
            <div className="add-event-top-row">
              {/* Event Topic */}
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
          
                {/* Password */}
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

              {/* Host Name */}
              <div className="add-event-field label-input">
                  <label>Host name</label>
                  <input
                      type="text"
                      name="hostName"
                      value={formData.hostName}
                      onChange={handleChange}
                    />
                </div>

                {/* Description */}
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

            {/* Bottom Section */}
            <div className="add-event-bottom-row">
              <div className="add-event-date-time label-input">
                <label>
                  Date and time <span>*</span>
                </label>
                <div className="add-event-datetime-group">
                  {/* Date */}
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  {/* Time */}
                  <input
                    className="small"
                    type="text"
                    name="time"
                    placeholder="02:30"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                  {/* AM/PM */}
                  <select
                    className="small"
                    name="amPm"
                    value={formData.amPm}
                    onChange={handleChange}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  {/* Timezone */}
                  <select
                    value={formData.timeZone}
                    onChange={handleChange}
                  >
                    <option value="UTC+5:00 Delhi">(UTC +5:00 Delhi)</option>
                    <option value="UTC+5:30">UTC+5:30</option>
                    <option value="UTC+1:00">UTC+1:00</option>
                    {/* Add more as needed */}
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
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  {/* Add more durations as needed */}
                </select>
              </div>
            </div>

            {/* Buttons */}
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
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEventPage;
