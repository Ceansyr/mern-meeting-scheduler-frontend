import React, { useState, useEffect, useCallback } from "react";
import { getAvailability, saveAvailability } from "../api/availabilityApi";
import { useCurrentUser } from "../utils/authUtils";
import "../styles/Event.css";
import Sidebar from "../components/Sidebar";
import AvailabilityTable from "../components/availability/AvailabilityTable";

export default function Availability() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser, loading } = useCurrentUser();

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

  const fetchAvailabilityData = useCallback(async () => {
    try {
      if (!currentUser || !currentUser.id) {
        setError("User information not available. Please log in again.");
        return;
      }

      const data = await getAvailability(currentUser.id);
      const transformedData = transformBackendData(data);
      setAvailabilityData(transformedData);
    } catch (err) {
      console.error("Error fetching availability data:", err);
      setError(err.message || "An error occurred while fetching data.");
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loading && currentUser) {
      fetchAvailabilityData();
    }
  }, [currentUser, loading, fetchAvailabilityData]);

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
      setSuccess("");
      const payload = prepareBackendPayload();
      await saveAvailability(payload);
      setSuccess("Availability settings saved successfully!");
    } catch (err) {
      console.error("Error saving availability:", err);
      setError(err.message || "Failed to save availability settings.");
    }
  };

  return (
    <div className="page-events-container">
      <Sidebar activePage="availability" currentUser={currentUser} />
      
      <main className="page-events-main">
        <header className="page-events-header">
          <h2>Availability Settings</h2>
          <p>Set your regular availability for meetings and events.</p>
        </header>

        {error && <p className="availability-error">{error}</p>}
        {success && <p className="availability-success">{success}</p>}

        <div className="availability-editor">
          <div className="availability-editor-header">
            <label htmlFor="timezone">Time Zone:</label>
            <select
              id="timezone"
              value={availabilityData.timeZone}
              onChange={(e) =>
                setAvailabilityData((prev) => ({
                  ...prev,
                  timeZone: e.target.value,
                }))
              }
            >
              <option value="UTC+5:30">India (GMT+5:30)</option>
              <option value="UTC">GMT (UTC+0)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC-8">Pacific Time (UTC-8)</option>
            </select>
          </div>

          <AvailabilityTable
            availabilityData={availabilityData}
            onDayToggle={handleDayToggle}
            onAddSlot={handleAddSlot}
            onSlotChange={handleSlotChange}
            onRemoveSlot={handleRemoveSlot}
          />

          <button
            className="availability-save-btn"
            onClick={handleSave}
          >
            Save Availability
          </button>
        </div>
      </main>
    </div>
  );
}
