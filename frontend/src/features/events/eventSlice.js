import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './eventService';

// Async Thunks (No changes here)
export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, thunkAPI) => {
    try {
      return await eventService.createEvent(eventData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await eventService.fetchEvents();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    // This function is essential for our bug fix and is correct
    resetEventsState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for creating an event (No changes here)
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true; // isSuccess is important here to trigger the alert
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Cases for fetching events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      // ==================================================================
      // THIS IS THE CORRECTED PART
      // ==================================================================
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        // The isSuccess flag is not needed for a simple fetch operation.
        // Its primary use is for tracking create/update/delete actions.
        state.events = action.payload;
      })
      // ==================================================================
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.events = [];
      });
  },
});

export const { resetEventsState } = eventSlice.actions;
export default eventSlice.reducer;