import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex ', justifyContent:'center', margin:'0 auto' }}>
      <CircularProgress size={80}  color={'inherit'}/>
    </Box>
  );
}