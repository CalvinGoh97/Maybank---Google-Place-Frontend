import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const placesAPI = {
  // Get all favorite places
  getFavorites: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/favorites`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch favorite places');
    }
  },

  // Save a new favorite place
  saveFavorite: async (place) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/favorites`, {
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        placeId: place.place_id,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to save favorite place');
    }
  },

  // Delete a favorite place
  deleteFavorite: async (placeId) => {
    try {
      await axios.delete(`${API_BASE_URL}/favorites/${placeId}`);
      return placeId;
    } catch (error) {
      throw new Error('Failed to delete favorite place');
    }
  },

  // Update a favorite place
  updateFavorite: async (placeId, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/favorites/${placeId}`, updates);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update favorite place');
    }
  }
}; 