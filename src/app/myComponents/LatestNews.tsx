'use client'
import React from 'react'
import { API_KEY } from '../data'
import Image from 'next/image'
import axios from 'axios'
import CircularIndeterminate from './loading'
import { useQuery } from '@tanstack/react-query'
import BasicAlerts from './AlertError'
interface newsNumber{
    number:number,
    title:string,
    
}
export default function LatestNews({number,title}:newsNumber) {
    const truncateText=(description,numbersofWords)=>{
            const desc=description.split(" ")
            if(desc.length > numbersofWords){
             
                return desc.slice(0,numbersofWords).join(" ")+ " "+"..."
            }
            return description
    }
    const formattedDate=(dateString:string)=>{
        const date=new Date(dateString)
    return date.toLocaleDateString('en-GB',{
        day:'2-digit',
        month:'short',
        year:'numeric'
    })
    }
    const fetchNews=async()=>{
        const response= await axios.get( `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&max=${number}`)
       return response.data.articles
    }
const {data,isLoading,isError,error}=useQuery({
    queryKey:['LatestNews'],
    queryFn:fetchNews
})
console.log('data',data)
  return (
    <div className=' p-4  '>
        <h3 className='text-lg lg:text-2xl font-bold'>{title}</h3>
        {isLoading && <div className=' mx-auto mt-14 lg:mt-22'><CircularIndeterminate/></div>}
        {isError && <div className='-mt-14 lg:-mt-22 flex flex-col gap-6 justify-center'>
            <div className='mx-auto '>
                <Image alt='alert-pic' width={800} height={800} src='/images/alert.png'/>
            </div>
            
            <BasicAlerts/></div>  } 
        {data && <div className={`${number>10 ? '': 'h-[30rem]'} overflow-y-auto overflow-x-hidden`}>
            {data.map((news,index)=>{
                return (<div key={index}
                className='grid grid-cols-2 gap-8  mt-4 mb-4   '>
                    <div className=''><img className='w-44 h-44 object-cover'  src={news.image} alt="pic" /> </div>
                    <div className='grid grid-cols-1 gap-2 px-3'>
                        <p className='text-md lg:text-xl '>{truncateText(news.description,18)}</p>
                        <p className='text-sm lg:text-lg text-stone-900 font-bold'> {formattedDate(news.publishedAt)}</p>
                    </div>
                </div>)
            })}
            </div>}
    </div>
  )
}
