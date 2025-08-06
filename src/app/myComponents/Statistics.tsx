'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import React from 'react';
import Progress from './Progress';

export default function Statistics() {
  const getStats = async () => {
    const response = await axios.get('/api/data');
    return response.data.data.statistics;
  };
  const { data } = useQuery({
    queryKey: ['statistics'],
    queryFn: getStats,
  });
  console.log('stats', data);

  return (
    <div className=" flex justify-center  w-full  p-4 rounded-3xl">
      <div className="  m-5 bg-white w-full flex-col md:h-[18rem] lg:h-full    p-4 rounded-3xl">
        <h3 className="text-xl lg:text-3xl text-center font-bold text-black  mt-2 mb-2">
          Statistic Website
        </h3>
        <div className=" flex flex-col md:flex-row  md:flex-wrap gap-8 justify-center">
          {data &&
            data.map((status: any, key: number) => {
              const valueStatus = Object.values(status);
              const keystatus = Object.keys(status);
              return (
                <div
                  key={key}
                  className=" mt-6  h-28 w-28 md:w-32 md:h-32 lg:w-44 lg:h-44 mx-auto   "
                >
                  <Progress keyStatus={keystatus} target={+valueStatus} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
