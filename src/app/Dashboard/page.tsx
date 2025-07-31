'use client'
import React from 'react'
import SideBar from '../myComponents/SideBar'
import Slider from '../myComponents/Slider'
import Statistics from '../myComponents/Statistics'
import LatestNews from '../myComponents/LatestNews'
import { Avatar,AvatarFallback,AvatarImage } from '../Components/ui/Avatar'



export default function Page() {


  return (
    <section className='  overflow-x-hidden  grid grid-cols-1 lg:flex lg:flex-row lg:flex-nowrap  w-full text-white '>
      <SideBar/>
    
      <div className='mt-4   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center flex flex-col    '>
        <div className='flex w-full flex-col lg:flex-row gap-4  lg:justify-around text-black justify-center  relative  mt-4 h-24 font-bold mx-auto  '>
         
          <h2 className=' lg:absolute left-18 top-2 text-center lg:text-left flex flex-col gap-3'>
              <span className=' text-lg  lg:text-xl text-white text-center '>Dashboard</span>
              <p className='text-white text-md lg:text-lg'>Hi Mohammad we help you prioritize your activity and tasks</p>
          </h2>
          <div className=' hidden lg:flex mt-2 text-white flex-row gap-1 justify-center lg:absolute lg:right-14 top-2'>
            <div >
            <Avatar className='bg-amber-400 w-20 h-20 -mt-3 mx-1'>
          <AvatarImage  src="./images/manager.jpg" alt='pic'></AvatarImage>
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        </div>
       
          <div className='w-full'>
        <p className="text-sm font-medium ">Mohammad Rezaei</p>
        <p className="text-sm text-white">Manager</p>
      </div>
    
          </div>
           
        </div>
          <div><Slider/></div>
          <div className='mt-10'>
            <hr className='border-t-1 border-stone-100 w-8/9 mx-auto' />
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
              <div className='flex flex-col gap-4 '>
                <h3 className='text-lg lg:text-xl text-left  px-5 py-2 font-extrabold text-white'><LatestNews number={10} title='Latest News'/></h3>
              </div>
              <div>
              <Statistics/>
              </div>
            </div>
          </div>
          
      </div>
    </section>
  )
}
