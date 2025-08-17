'use client';

import React from 'react';
import {ChevronDown, RefreshCcw } from 'lucide-react'

import SideBar  from '../myComponents/SideBar';
import { menuItem } from '../data';
import SiteCard from '../myComponents/SiteCard';


import { Button } from '../../components/ui/button';


 

export default function Page() {
  return (
    <section className="relative overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full">
  
      <SideBar />

 
      <div className="flex flex-col gap-6 p-10 bg-[#189DAC] text-white md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full">
        
      
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Sitemap</h1>
          <p className="text-md lg:text-xl text-gray-100">
            Hi Mohammad, quickly access and navigate your content structure
          </p>
        </div>

     
        <div className="flex gap-4">
          <button className=" bg-black/10 w-48 lg:w-72 backdrop-blur-lg border-1  border-blue-100 rounded-3xl cursor-pointer px-6 py-2 md:justify-evenly  text-white font-bold flex flex-row gap-1 md:gap-3  ">
           <span className='text-3xl'></span>Refresh Sitemap<span> <RefreshCcw/></span>
          </button>
          <button className="bg-black/10 w-48 lg:w-72  backdrop-blur-lg border-1  border-blue-100 rounded-3xl cursor-pointer flex flex-row md:justify-evenly gap-1 md:gap-3   px-6 py-2  text-white font-bold">
            <span>View Mode</span><span><ChevronDown /></span> 
          </button>
        </div>

       
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItem[0].mainItem.map((route, key) => (
            <SiteCard key={key} route={route} iconBg="bg-teal-600" />
          ))}
          {menuItem[0].restItem.map((route, key) => (
            <SiteCard key={key} route={route} iconBg="bg-teal-400" />
          ))}
        </div>
      </div>
    </section>
  );
}
