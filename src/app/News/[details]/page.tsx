'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
export default function Page() {
  const searchParams=useSearchParams()
  const title=searchParams.get('title')
  const content=searchParams.get('content')
  const image=searchParams.get('image')
  const publishedAt=searchParams.get('publishedAt')
    const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
 
  return (
    <section className='w-full grid grid-cols-1  gap-8 justify-center min-h-[100vh] p-4  bg-[#189DAC] dark:bg-[#0f4b5c]'>

<h2 className='text-center text-lg lg:text-2xl dark:text-white font-bold text-black'>{title}</h2>

<div className='w-full text-center flex justify-center   lg:mt-0'>
  <img  onError={(e) => {
    e.currentTarget.src = '/images/latest-news.jpg';
  }} src={image} alt={title || 'latest news'} className='w-full h-64 lg:w-[70vw] lg:h-[85vh] object-contain mx-auto ' />
</div>
<p className='text-md lg:text-xl text-center'>{content}</p>
<p className='text-sm lg:text-md text-center text-md lg:text-xl dark:text-white'>{formattedDate(publishedAt)}</p>

    </section>
  )
}
