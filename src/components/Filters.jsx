import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Filters = ({ region, setRegion }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Filter by Region</InputLabel>
      <Select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        label="Filter by Region"
      >
        <MenuItem value="">All Regions</MenuItem>
        {regions.map(region => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filters;
