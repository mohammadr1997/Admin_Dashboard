'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams=useSearchParams()

    const title=searchParams.get('title')
    const src=searchParams.get('src')
    const desc=searchParams.get('description')
    const content=searchParams.get('content')

    console.log('content',content)
  return (
    <section className=' bg-[#189DAC]  dark:bg-[#0f4b5c] w-full h-screen grid grid-cols-1 gap-3 lg:gap-5 '>
        
             <div className='flex justify-center  '> <h2 className='text-center text-md mt-10 p-2 lg:text-2xl font-bold'>{title}</h2></div>
        <div className='w-[92%] mx-auto flex justify-center'>
            <img   onError={(e) => {
    e.currentTarget.src = "/images/latest-news.jpg";
  }} className='w-full h-[250px] object-contain mx-auto' src={src} alt="latest news" />
        </div>
        <div className='flex justify-center w-full p-2'>
            <p className='mx-auto mb-2 text-md lg:text-lg p-2 text-center'>{desc}</p>
           
        </div>
        
       

    </section>
  )
}
