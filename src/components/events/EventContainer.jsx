import React from "react";
import EventsHeader from "./EventHeader";
import EventsList from "./EventList";

function EventsContainer({ events, error, onToggle, onEdit, onCopyLink, onDelete }) {
  return (
    <main className="page-events-main">
      <EventsHeader />
      
      {error && <p className="page-events-error">{error}</p>}
      
      <EventsList
        events={events}
        onToggle={onToggle}
        onEdit={onEdit}
        onCopyLink={onCopyLink}
        onDelete={onDelete}
      />
    </main>
  );
}

export default EventsContainer;