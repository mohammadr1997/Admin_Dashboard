'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react';
import {ChevronDown, RefreshCcw } from 'lucide-react'
import { useState } from 'react';
import SideBar  from '../myComponents/SideBar';
import { menuItem } from '../data';
import SiteCard from '../myComponents/SiteCard';





 

export default function Page() {
  const [viewMode,setViewMode]=useState<string>('grid')
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
  <button
    onClick={() => window.location.reload()}
    className="bg-black/10 w-48 lg:w-72 backdrop-blur-lg border border-blue-100 rounded-3xl cursor-pointer  text-white font-bold flex flex-row items-center justify-center gap-2 text-lg md:text-xl"
  >
    Refresh <RefreshCcw className="w-4 h-4" />
  </button>

  <Select value={viewMode} onValueChange={setViewMode}>
    <SelectTrigger className="bg-black/10 w-48 lg:w-72 backdrop-blur-lg border border-blue-100 rounded-3xl cursor-pointer p-4 text-white font-bold flex flex-row items-center justify-center gap-2 text-lg md:text-xl box-border">
      <SelectValue className="text-lg md:text-xl font-bold" placeholder="Select View" />
    </SelectTrigger>
    <SelectContent className="bg-black/30 text-white rounded-xl">
      <SelectItem className="cursor-pointer" value="grid">Grid View</SelectItem>
      <SelectItem className="cursor-pointer" value="list">List View</SelectItem>
    </SelectContent>
  </Select>
</div>


       
        <div className={`mt-6  ${viewMode=='grid'?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8':'flex flex-col gap-4'}`}>
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
