import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/eventSlice';
import wizardReducer from '../features/wizard/wizardSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
    wizard: wizardReducer,
  },
});