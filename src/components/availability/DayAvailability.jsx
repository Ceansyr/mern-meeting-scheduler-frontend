import React from "react";
import TimeSlot from "./TimeSlot";

function DayAvailability({ day, index, onToggle, onAddSlot, onSlotChange, onRemoveSlot }) {
  return (
    <tr>
      <td>
        <div className="day-toggle">
          <input
            type="checkbox"
            id={`day-${index}`}
            checked={!day.unavailable}
            onChange={() => onToggle(index)}
          />
          <label htmlFor={`day-${index}`}>{day.day}</label>
        </div>
      </td>
      <td>
        {day.unavailable ? (
          <span className="unavailable-label">Unavailable</span>
        ) : (
          <div className="time-slots-container">
            {day.slots.map((slot, slotIndex) => (
              <TimeSlot
                key={slotIndex}
                slot={slot}
                index={slotIndex}
                onChange={(slotIndex, value) => onSlotChange(index, slotIndex, value)}
                onRemove={(slotIndex) => onRemoveSlot(index, slotIndex)}
              />
            ))}
            <button
              type="button"
              className="add-slot-btn"
              onClick={() => onAddSlot(index)}
            >
              + Add Time Slot
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default DayAvailability;