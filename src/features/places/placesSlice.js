import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Backend API URL
const API_URL = 'http://localhost:8080/api/favorites';

// Async thunk for fetching places from backend
export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
    return response.json();
  }
);

// Async thunk for saving place to backend
export const savePlace = createAsyncThunk(
  'places/savePlace',
  async (place) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        placeId: place.place_id
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to save place');
    }
    return response.json();
  }
);

// Async thunk for deleting place from backend
export const deletePlace = createAsyncThunk(
  'places/deletePlace',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete place');
    }
    return id;
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    items: [],
    selectedPlace: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    addToHistory: (state, action) => {
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Places
      .addCase(fetchPlaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.content; // For paginated response
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Save Place
      .addCase(savePlace.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Delete Place
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { setSelectedPlace, addToHistory } = placesSlice.actions;
export default placesSlice.reducer;