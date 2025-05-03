import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, CircularProgress, Chip, Container, Button } from '@mui/material';
import { fetchCountryByCode } from '../services/api';

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const data = await fetchCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h3" gutterBottom>
        {country.name.common}
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <img 
            src={country.flags.png} 
            alt={`${country.name.common} flag`} 
            style={{ width: '100%', maxWidth: 400 }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Country Information
          </Typography>
          <Typography >
            <strong>Official Name:</strong> {country.name.official}<br />
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
            <strong>Population:</strong> {country.population.toLocaleString()}<br />
            <strong>Region:</strong> {country.region}<br />
            <strong>Subregion:</strong> {country.subregion || 'N/A'}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Languages
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.values(country.languages || {}).map(lang => (
              <Chip key={lang} label={lang} variant="outlined" />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CountryDetail;
