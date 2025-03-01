import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './features/places/placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer
  }
});