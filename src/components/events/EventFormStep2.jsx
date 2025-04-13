import React from "react";

function EventFormStep2({ formData, setFormData, isLightColor, setStep }) {
  return (
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
          onChange={(e) => 
            setFormData({
              ...formData,
              eventLink: e.target.value,
            })
          }
        />
      </div>

      <div className="step-two-field label-input">
        <label className="step-two-label">Add Emails</label>
        <input
          type="text"
          name="participants"
          placeholder="Add member Emails"
          value={formData.participants}
          onChange={(e) => 
            setFormData({
              ...formData,
              participants: e.target.value,
            })
          }
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
  );
}

export default EventFormStep2;