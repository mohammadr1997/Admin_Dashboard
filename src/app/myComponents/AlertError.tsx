'use client';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {
  return (

    <p className='text-center -mt-22 lg:-mt-32 mx-auto text-red-400 text-md lg:text-xl font-semibold'> check your newtwork connection !</p>
    // <Stack
    //   sx={{
    //     width: '100%',
    //     marginTop: {
    //       xs: '-100px',
    //       lg: '-125px',
    //     },
    //   }}
    //   spacing={2}
    // >
    //   <Alert
    //     sx={{
    //       fontSize: {
    //         xs: '14px',
    //         sm: '16px',
    //         md: '18px',
    //         lg: '24px',
    //       },
    //       color: '#ef4444',

          
    //       borderRadius: '25px',
    //       padding: '5px 15px',
    //       textAlign: 'center',
    //     }}
    //     className="-mt-26 text-center mx-auto "
    //     severity="error"
    //   >
    //    check your network and try again !
    //   </Alert>
    // </Stack>
  );
}
