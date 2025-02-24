import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const favoriteService = {
  savePlace: async (place) => {
    return axios.post(`${API_BASE_URL}/favorites`, {
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      placeId: place.place_id,
    });
  },
}; 