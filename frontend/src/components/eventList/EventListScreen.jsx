// src/components/eventList/EventListScreen.jsx

// Add useState to the React import
import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, resetEventsState } from '../../features/events/eventSlice';
import EventCard from './EventCard';
import './EventList.css';
import { FaRobot } from 'react-icons/fa'; // Import an icon
import AIAssistant from '../ai/AIAssistant'; // Import the new component

function EventListScreen() {
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector((state) => state.events);

  // State to manage the AI modal visibility
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
    return () => {
      dispatch(resetEventsState());
    };
  }, [dispatch]);

  if (isLoading) return <h2>Loading Events...</h2>;
  if (isError) return <h2>Error: {message}</h2>;

  return (
    // Use React.Fragment to wrap multiple top-level elements
    <> 
      <div className="event-list-screen">
        {/* The existing list screen UI is untouched */}
        {events.length === 0 ? (
          <p>No events found. Start by creating a new event!</p>
        ) : (
          <div className="event-list-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* AI Assistant Components (New) */}
      <button className="ai-fab" onClick={() => setIsAIOpen(true)}>
        <FaRobot />
      </button>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  );
}

export default EventListScreen;