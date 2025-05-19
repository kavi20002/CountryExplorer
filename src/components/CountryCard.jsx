import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CountryCard = ({ country, showRemoveButton = false }) => {
  const { user, favorites, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();
  const isFav = Boolean(favorites.find(f => f.cca3 === country.cca3));

  const toggleFav = () => {
    if (isFav) removeFavorite(country);
    else addFavorite(country);

    // Navigate to the FavoriteCountry page
    navigate('/favorites');
  };

  return (
    <Card
      sx={{
        width: 300, // Fixed width for all cards
        height: 400, // Fixed height for all cards
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box', // Ensure padding/border is included in size
      }}
    >
      <CardMedia
        component="img"
        image={country.flags.png}
        alt={`${country.name.common} flag`}
        sx={{ height: 140, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography gutterBottom variant="h6" noWrap>
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Population:</strong> {country.population.toLocaleString()}<br />
          <strong>Region:</strong> {country.region}<br />
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
        <Button
          component={Link}
          to={`/country/${country.cca3}`}
          size="small"
          variant="contained"
        >
          Details
        </Button>

        {user && (
          showRemoveButton ? (
            <Button
              size="small"
              color="error"
              onClick={() => removeFavorite(country)}
            >
              Remove
            </Button>
          ) : (
            <IconButton onClick={toggleFav}>
              {isFav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          )
        )}
      </CardActions>
    </Card>
  );
};

export default CountryCard;