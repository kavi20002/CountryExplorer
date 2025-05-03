import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CountryList from '../components/CountryList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        <SearchBar 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <Filters 
          region={regionFilter} 
          setRegion={setRegionFilter} 
        />
      </Box>
      <CountryList searchQuery={searchQuery} regionFilter={regionFilter} />
    </Container>
  );
};

export default Home;
