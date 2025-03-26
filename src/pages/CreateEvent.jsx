import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";

function CreateEventPage() {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    bannerImage: "",
    backgroundColor: "",
    eventLink: "",
    password: "",
    participants: "", // comma-separated string, later parsed to an array
  });
  // Step management: step 1 for basic info, step 2 for customization
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate and proceed to next step
  const handleNext = (e) => {
    e.preventDefault();
    // Basic validation for Step 1: Title, Date, Time are required
    if (!formData.title || !formData.date || !formData.time) {
      setError("Please fill in the required fields: Title, Date, and Time.");
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
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      bannerImage: formData.bannerImage,
      backgroundColor: formData.backgroundColor,
      eventLink: formData.eventLink,
      password: formData.password,
      participants: formData.participants ? formData.participants.split(",").map((p) => p.trim()) : [],
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    <div className="page-create-event-container">
      <h1 className="page-create-event-title">Create New Event</h1>
      {error && <p className="page-create-event-error">{error}</p>}
      <form className="page-create-event-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
        {step === 1 && (
          <div className="page-create-event-step">
            <div className="page-create-event-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="page-create-event-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="page-create-event-group-inline">
              <div className="page-create-event-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="page-create-event-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="page-create-event-btn-next">
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="page-create-event-step">
            <div className="page-create-event-group">
              <label htmlFor="bannerImage">Banner Image URL</label>
              <input
                type="text"
                id="bannerImage"
                name="bannerImage"
                placeholder="Enter image URL"
                value={formData.bannerImage}
                onChange={handleChange}
              />
            </div>
            <div className="page-create-event-group">
              <label htmlFor="backgroundColor">Background Color</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
              />
            </div>
            <div className="page-create-event-group">
              <label htmlFor="eventLink">Meeting Link</label>
              <input
                type="text"
                id="eventLink"
                name="eventLink"
                placeholder="e.g., https://meet.google.com/..."
                value={formData.eventLink}
                onChange={handleChange}
              />
            </div>
            <div className="page-create-event-group">
              <label htmlFor="password">Event Password (optional)</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter event password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="page-create-event-group">
              <label htmlFor="participants">Participants (comma-separated emails)</label>
              <input
                type="text"
                id="participants"
                name="participants"
                placeholder="email1@example.com, email2@example.com"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>
            <div className="page-create-event-actions">
              <button type="button" className="page-create-event-btn-back" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="page-create-event-btn-submit">
                Create Event
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateEventPage;
