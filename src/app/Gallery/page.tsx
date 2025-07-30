'use client'
import React, { useContext } from 'react'
import axios from 'axios'
import { Context } from '../myComponents/Contextprovider'
import { useState } from 'react'
import { selectedImageType } from '../myComponents/Contextprovider'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import UploadButton from '../myComponents/uploadButton'
import SideBar from '../myComponents/SideBar'

export default function Page() {
  const context=useContext(Context)
  const selectedImgs=context?.selectedImages
  const setSelectedImgs=context?.setSelectedImages
  const [allImages,setAllImages]=useState<selectedImageType[]>([])
  const getProducts=async()=>{
    const response= await axios.get('api/data')
    return response.data.data
  }
  const {data}=useQuery({
    queryKey:['products'],
    queryFn:getProducts
  })
  useEffect(()=>{
    if(data && setSelectedImgs){
    setSelectedImgs(data.products)
    }
  },[data])
  return (
    <section className='  overflow-x-hidden  grid grid-cols-1  lg:flex-nowrap  w-full text-white '>
<SideBar/>
    <div className=' text-white   font-bold  gap-4 lg:justify-between p-10  flex flex-col   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center  justify-around '>
      <div className=' flex flex-col lg:flex-row lg:flex-nowrap lg:justify-between relative justify-center w-full'>  <div><h1 className=' text-xl lg:text-4xl'>Galley</h1>
        <p className='text-md lg:text-xl'>Hi Mohammad manage and Publish your content visuial</p>
        </div>
        <div className='lg:absolute lg:right-4 mx-auto mt-6 lg:mt-0'><UploadButton/></div></div>
       
    <div className='flex flex-col justify-center gap-6 md:flex-row md:flex-nowrap md:justify-center lg:justify-end'>
      <div>1</div>
      <div>2</div>
      </div>    
    </div>
   
    </section>
  )
}
