import React from "react";

function EventFormStep1({ formData, handleChange, handleCancel, currentUser }) {
  return (
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
  );
}

export default EventFormStep1;