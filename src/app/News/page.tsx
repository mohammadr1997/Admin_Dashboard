import React from 'react';
import SideBar from '../myComponents/SideBar';
import LatestNews from '../myComponents/LatestNews';
export default function page() {
  return (
    <section className="text-white h-screen  dark:bg-[#0f4b5c] bg-[#189DAC] overflow-x-hidden">
      <SideBar />
      
      <div className="mt-0  font-bold text-lg lg:text-2xl  dark:bg-[#0f4b5c] bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center flex flex-col    ">
        <LatestNews title="News" number={25} />
      </div>
    </section>
  );
}
