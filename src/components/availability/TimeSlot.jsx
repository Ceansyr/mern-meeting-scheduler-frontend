import React from "react";

function TimeSlot({ slot, index, onChange, onRemove }) {
  return (
    <div className="time-slot-row">
      <input
        type="text"
        value={slot}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder="9:00 AM - 5:00 PM"
      />
      <button
        type="button"
        className="remove-slot-btn"
        onClick={() => onRemove(index)}
      >
        ×
      </button>
    </div>
  );
}

export default TimeSlot;