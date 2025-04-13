import React from "react";
import EventCard from "./EventCard";

function EventsList({ events, onToggle, onEdit, onCopyLink, onDelete }) {
  return (
    <div className="page-events-cards">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onToggle={onToggle}
          onEdit={onEdit}
          onCopyLink={onCopyLink}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default EventsList;