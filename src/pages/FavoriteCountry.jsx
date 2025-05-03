import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import CountryCard from '../components/CountryCard';
import { useNavigate } from 'react-router-dom';

const FavoriteCountry = () => {
  const { favorites } = useAuth();
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 2 }}>Back to Home</Button>
      <Typography variant="h4" gutterBottom>
        Favorite Countries
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">No favorite countries added yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((country) => (
            <Grid key={country.cca3} sx={{ flex: '1 1 calc(33.333% - 16px)', margin: '8px' }}>
              <CountryCard country={country} showRemoveButton={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoriteCountry;