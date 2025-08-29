'use client';
import * as React from 'react';

interface alertProps{
number:number
}
export default function BasicAlerts({number}:alertProps) {
  return (

    <p className={` ${number===25? '-mt-4 lg:-mt-[6rem] ':'-mt-18 lg:-mt-22'} text-center   mx-auto text-red-400 text-md lg:text-2xl font-semibold`}> check your newtwork connection !</p>
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
