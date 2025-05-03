import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert, Pagination } from '@mui/material';
import CountryCard from './CountryCard';
import { fetchAllCountries } from '../services/api';

const CountryList = ({ searchQuery, regionFilter }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const countriesPerPage = 20;

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Grid container spacing={3} alignItems="stretch">
        {currentCountries.map(country => (
          <Grid item xs={12} sm={6} md={4} key={country.cca3} sx={{ display: 'flex' }}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredCountries.length / countriesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default CountryList;
