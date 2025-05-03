import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CountryCard = ({ country }) => {
  const { user, addFavorite } = useAuth();

  const handleAddToFavorites = () => {
    addFavorite(country);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={country.flags.png}
        alt={`${country.name.common} flag`}
        sx={{ height: 140, objectFit: 'contain', width: '100%' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Population:</strong> {country.population.toLocaleString()}<br />
          <strong>Region:</strong> {country.region}<br />
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
        {user && (
          <IconButton onClick={handleAddToFavorites} color="primary">
            <FavoriteIcon />
          </IconButton>
        )}
        <Button component={Link} to={`/country/${country.cca3}`} variant="contained">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
