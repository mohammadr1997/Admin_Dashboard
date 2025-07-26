'use client'
import React from 'react'

import UploadButton from '../myComponents/uploadButton'
import SideBar from '../myComponents/SideBar'

export default function page() {
  return (
    <section className='  overflow-x-hidden  grid grid-cols-1 lg:flex lg:flex-row lg:flex-nowrap  w-full text-white '>
<SideBar/>
    <div className=' text-white  font-bold  gap-4 lg:justify-between p-10 lg:flex-row lg:flex-nowrap lg:gap-14 mt-4   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center flex flex-col justify-around '>
      <div className=''>  <div><h1 className=' text-xl lg:text-4xl'>Galley</h1>
        <p className='text-md lg:text-xl'>Hi Mohammad manage and Publish your content visuial</p>
        </div>
        <div className='mx-auto md:mx-0'><UploadButton/></div></div>
       
       
    </div>
    
    </section>
  )
}
