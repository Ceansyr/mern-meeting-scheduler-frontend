import React from "react";
import { formatTimeRange } from "../../utils/dateUtils";

function EventCard({ event, onToggle, onEdit, onCopyLink, onDelete }) {
  return (
    <div className={`meeting-card ${event.isActive ? "" : "toggled"}`}>
      {event.hasConflict && (
        <div className="meeting-card-conflict">
          <span>Conflict of timing</span>
        </div>
      )}

      <div className="meeting-card-header">
        <h3 className="meeting-card-title">{event.title || "Meeting"}</h3>
        <button
          className="meeting-card-edit-btn"
          onClick={() => onEdit(event._id)}
        >
          <div className="edit icon"> </div>
        </button>
      </div>

      <p className="meeting-card-date">
        {new Date(event.date).toDateString()}
      </p>
      <p className="meeting-card-time">
        {formatTimeRange(event.time, event.duration)}
      </p>
      <p className="meeting-card-meta">
        {event.duration || "1hr"}, {"Group meeting"}
      </p>

      <div className="meeting-card-footer">
        <label className="switch">
          <input
            type="checkbox"
            checked={event.isActive}
            onChange={() => onToggle(event._id, event.isActive)}
          />
          <span className="slider round"></span>
        </label>

        <div className="meeting-card-actions">
          <button
            className="meeting-card-icon-btn"
            onClick={() => onCopyLink(event._id)}
          >
            <div className="copy icon"> </div>
          </button>
          <button
            className="meeting-card-icon-btn"
            onClick={() => onDelete(event._id)}
          >
            <div className="delete icon"> </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;