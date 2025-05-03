import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search countries..."
      value={value}
      onChange={onChange}
      sx={{ mb: 3 }}
    />
  );
};

export default SearchBar;
