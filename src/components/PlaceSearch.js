import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { TextField, Box, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { savePlace, setSelectedPlace } from '../features/places/placesSlice';
import { useMapsContext } from '../context/MapsContext';

const PlaceSearch = () => {
  const dispatch = useDispatch();
  const { isLoaded, loadError, onLoad, onPlaceSelected } = useMapsContext();

  const handlePlaceChanged = () => {
    const place = onPlaceSelected();
    if (place && place.geometry) {
      dispatch(setSelectedPlace({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      }));
      dispatch(savePlace(place));
    }
  };

  if (loadError) {
    return <Box>Error loading maps</Box>;
  }

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '20px auto' }}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={handlePlaceChanged}
      >
        <TextField
          fullWidth
          placeholder="Search for a place"
          variant="outlined"
        />
      </Autocomplete>
    </Box>
  );
};

export default PlaceSearch;