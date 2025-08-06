'use client';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {
  return (
    <Stack
      sx={{
        width: '100%',
        marginTop: {
          xs: '-100px',
          lg: '-125px',
        },
      }}
      spacing={2}
    >
      <Alert
        sx={{
          fontSize: {
            xs: '14px',
            sm: '16px',
            md: '18px',
            lg: '24px',
          },
          color: '#ef4444',

          backgroundColor: '#ffffff',
          borderRadius: '25px',
          padding: '5px 15px',
          textAlign: 'center',
        }}
        className="-mt-26 "
        severity="error"
      >
        check your connection !
      </Alert>
    </Stack>
  );
}
