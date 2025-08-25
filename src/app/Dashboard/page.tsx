'use client';
import React from 'react';
import SideBar from '../myComponents/SideBar';
import Slider from '../myComponents/Slider';
import Statistics from '../myComponents/Statistics';
import LatestNews from '../myComponents/LatestNews';
import { useState,useEffect } from 'react';
import UserCard from '../myComponents/UserCards';
import { Context } from '../myComponents/Contextprovider';
import { useContext } from 'react';
import NotificationBell from '../myComponents/NotificationBell';

export default function Page() {
  const context=useContext(Context)
  const notificationsEnabled=context?.notificationsEnabled
    const setNotificationsEnabled=context?.setNotificationsEnabled
 
   useEffect(() => {
       if(!notificationsEnabled || !setNotificationsEnabled) return
     const stored = localStorage.getItem('notificationsEnabled');
     if (stored !== null) {
       setNotificationsEnabled(JSON.parse(stored));
     }
   }, [notificationsEnabled]);
  return (
    <section className="  overflow-x-hidden  grid grid-cols-1 lg:flex lg:flex-row lg:flex-nowrap  w-full text-white ">
      <SideBar />

      <div className="mt-0   bg-[#189DAC] min-h-[100vh] dark:bg-[#0f4b5c] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center flex flex-col    ">
        
        <div className="flex w-full flex-col lg:flex-row gap-4  lg:justify-evenly text-black justify-center  relative  mt-4 h-28 font-bold mx-auto ">
          <div className='lg:w-3/4   mx-auto flex justify-center'>
            <h2 className=" text-center lg:text-left flex flex-col gap-3">
            <span className=" text-lg  lg:text-3xl text-white text-center ">
              Dashboard
            </span>
            <p className="text-white text-md lg:text-2xl ">
              Hi Mohammad we help you prioritize your activity and tasks
            </p>
          </h2>
          </div>
          
          <div className="lg:w-1/4 hidden lg:flex  text-white flex-row flex-nowrap gap-3 justify-center px-2 ">
            <UserCard/>
            <div className='mt-6'> <NotificationBell enabled={notificationsEnabled}/></div>
           
          </div>
        </div>
        <div>
          <Slider />
        </div>
        <div className="mt-10">
          
          <hr className="border-t-1 border-stone-100 w-8/9 mx-auto" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
            <div className="flex flex-col gap-4 ">
              <h3 className="text-lg lg:text-xl text-left  px-5 py-2 font-extrabold text-white">
                <LatestNews number={10} title="Latest News" />
              </h3>
            </div>
            <div>
              <Statistics />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
