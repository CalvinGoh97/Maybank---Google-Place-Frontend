import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const MapsContext = createContext(null);

const libraries = ['places'];

export function MapsProvider({ children }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    id: 'google-map-script',
    version: "weekly"
  });

  const onLoad = useCallback((autoC) => {
    setAutocomplete(autoC);
  }, []);

  const onPlaceSelected = useCallback(() => {
    if (autocomplete !== null) {
      return autocomplete.getPlace();
    }
    return null;
  }, [autocomplete]);

  const value = React.useMemo(() => ({
    isLoaded,
    loadError,
    onLoad,
    onPlaceSelected
  }), [isLoaded, loadError, onLoad, onPlaceSelected]);

  return (
    <MapsContext.Provider value={value}>
      {children}
    </MapsContext.Provider>
  );
}

export function useMapsContext() {
  const context = useContext(MapsContext);
  if (context === null) {
    throw new Error('useMapsContext must be used within a MapsProvider');
  }
  return context;
}