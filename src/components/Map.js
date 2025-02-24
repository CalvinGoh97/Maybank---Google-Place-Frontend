import React, { useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useMapsContext } from '../context/MapsContext';
import { Box, CircularProgress } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useMapsContext();
  const selectedPlace = useSelector(state => state.places.selectedPlace);
  const [map, setMap] = React.useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <Box>Error loading maps</Box>;
  }

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  const center = selectedPlace ? {
    lat: selectedPlace.latitude,
    lng: selectedPlace.longitude
  } : defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {selectedPlace && (
        <Marker
          position={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude
          }}
        />
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);