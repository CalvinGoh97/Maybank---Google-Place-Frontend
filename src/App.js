import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import PlaceSearch from './components/PlaceSearch';
import SearchHistory from './components/SearchHistory';
import Map from './components/Map';

function App() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlaceSearch />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '500px' }}>
            <Map />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <SearchHistory />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;