import axios from 'axios';

// ==================================================================
// CORRECTED CODE
// ==================================================================

// The API_URL should only be the base address of your backend server.
const API_URL = 'http://localhost:8000';

// This function now builds its full path correctly: http://localhost:8000/events
const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

// This function also builds its full path correctly: http://localhost:8000/events
const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// This function now builds its full path correctly: http://localhost:8000/ai/ask
export const askAI = async (prompt) => {
  const response = await axios.post(`${API_URL}/ai/ask`, { prompt });
  return response.data;
};

// The service object remains the same.
const eventService = {
  createEvent,
  fetchEvents,
  askAI,
};

export default eventService;