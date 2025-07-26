'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { StickyNote } from 'lucide-react'
import 'swiper/css/bundle'
import { useEffect } from 'react'
import { stats } from '../data'
export default function Slider() {
    const [ready,setReady]=useState(false);
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
useEffect(()=>{
setReady(true)
},[])
  return (
  
    <div className="relative  max-w-6xl mx-auto w-full ">
        {ready ? <Swiper
      
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
            768:{
                slidesPerView:2
            }
            
        }}
        
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        className="bg-[#189DAC] rounded-xl w-full  "
      >
        {stats.map((datum,index)=>{
            const Icon=datum.icon
            return (<SwiperSlide key={index}>
                  <div className={` text-center w-full   text-white ${datum.bg} flex flex-col gap-1 justify-center rounded-4xl `}>
                    <div className={`${datum.bg} w-full flex flex-col justify-center gap-2 px-4 py-8`}><span className='mx-auto'><Icon/></span>
                    <h2 className='text-2xl lg:text-6xl font-extrabold'>{datum.value}</h2>
                    <span className='text-md lg:text-lg font-semibold'>{datum.title}</span></div>
                    
                    <p className='flex flex-row justify-center gap-2  text-md lg:text-lg font-semibold bg-stone-50 text-stone-900 w-full text-center px-10 py-8 rounded-b-none  '><span><StickyNote/></span><span>{datum.note}</span></p>
                  </div>
            </SwiperSlide>)
        })}
       
      </Swiper>:null }
     

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ArrowLeft className="text-pink-500" />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        <ArrowRight className="text-pink-500" />
      </button>
    </div>
  )
}
