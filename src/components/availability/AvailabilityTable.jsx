import React from "react";
import DayAvailability from "./DayAvailability";

function AvailabilityTable({ 
  availabilityData, 
  onDayToggle, 
  onAddSlot, 
  onSlotChange, 
  onRemoveSlot 
}) {
  return (
    <table className="availability-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Available Hours</th>
        </tr>
      </thead>
      <tbody>
        {availabilityData.availability.map((day, index) => (
          <DayAvailability
            key={day.day}
            day={day}
            index={index}
            onToggle={onDayToggle}
            onAddSlot={onAddSlot}
            onSlotChange={onSlotChange}
            onRemoveSlot={onRemoveSlot}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AvailabilityTable;