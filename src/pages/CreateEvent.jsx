import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";
import Sidebar from "../components/Sidebar";
import EventFormStep1 from "../components/events/EventFormStep1";
import EventFormStep2 from "../components/events/EventFormStep2";
import { getCurrentUser } from "../api/userApi";
import { createEvent } from "../api/eventApi";

function CreateEventPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
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

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

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

    const payload = {
      title: formData.topic,
      description: formData.description,
      date: formData.date,
      time: `${formData.time} ${formData.amPm} (${formData.timeZone})`,
      bannerImage: formData.bannerImage,
      backgroundColor: formData.backgroundColor,
      hostName: currentUser?.username || "Guest",
      duration: formData.duration,
      eventLink: formData.eventLink,
      password: formData.password,
      participants: formData.participants
        ? formData.participants.split(",").map((p) => p.trim())
        : [],
    };

    try {
      await createEvent(payload);
      navigate("/events");
    } catch (err) {
      setError(err.message || "An error occurred during event creation.");
    }
  };

  return (
    <div className="page-events-container">
      <Sidebar activePage="events" currentUser={currentUser} />

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
              <EventFormStep1 
                formData={formData}
                handleChange={handleChange}
                handleCancel={handleCancel}
                currentUser={currentUser}
              />
            )}

            {step === 2 && (
              <EventFormStep2
                formData={formData}
                setFormData={setFormData}
                isLightColor={isLightColor}
                setStep={setStep}
              />
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEventPage;
