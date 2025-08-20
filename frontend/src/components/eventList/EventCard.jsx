// src/components/eventList/EventCard.jsx

import React from 'react';

function EventCard({ event }) {
  // Function to format the status into a CSS class
  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="event-card">
      <div className="card-header">
        <h3>{event.eventTitle}</h3>
        <span className={`status-badge ${getStatusClass(event.status)}`}>
          {event.status}
        </span>
      </div>

      <div className="card-body">
        <p><strong>Type:</strong> {event.eventType}</p>
        <p><strong>Initiator:</strong> {event.initiator}</p>
        <p><strong>Severity:</strong> {event.severity}</p>
      </div>

      <div className="card-footer">
        Created on: {new Date(event.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default EventCard;