'use client';
import React from 'react';

import Image from 'next/image';
import axios from 'axios';
import CircularIndeterminate from './loading';
import { useQuery } from '@tanstack/react-query';
import BasicAlerts from './AlertError';
import {useEffect } from 'react';
import UserCard from './UserCards';
import { Context } from './ContextProvider';
import { useContext } from 'react';
import NotificationBell from './NotificationBell';
import Link from 'next/link';
interface newsNumber {
  number: number;
  title: string;
}
interface NewsItem {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
}
export default function LatestNews({ number, title }: newsNumber) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const context=useContext(Context)
  const menuOpen=context?.menuOpen
   const notificationsEnabled=context?.notificationsEnabled
  const setNotificationsEnabled=context?.setNotificationsEnabled
  const truncateText = (description:string, numbersofWords: number) => {
    const desc = description.split(' ');
    if (desc.length > numbersofWords) {
      return desc.slice(0, numbersofWords).join(' ') + ' ' + '...';
    }
    return description;
  };
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  const fetchNews = async () => {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&max=${number}`,
    );
    return response.data.articles;
  };
  const { data, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ['LatestNews'],
    queryFn: fetchNews,
  });
  
  useEffect(() => {
    if(!notificationsEnabled || !setNotificationsEnabled) return
    const stored = localStorage.getItem('notificationsEnabled');
    if (stored !== null) {
      setNotificationsEnabled(JSON.parse(stored));
    }
  }, [notificationsEnabled]);
  return (
    <div className={`p-4 ${menuOpen ? '':''}`} >
      <div className='flex   mt-1 flex-row w-full flex-nowrap justify-between gap-2'>
      {number!==10 ?<> 
       <div className=' flex flex-col w-full lg:w-3/4'>
        <h3 className="text-lg lg:text-3xl font-bold">{title}</h3>
      <p className="text-white text-md lg:text-2xl mb-2 mt-2">Hi Mohammad stay updated with the latest news and insights tailored just for you</p></div>

       <div className='hidden lg:flex flex-row justify-end flex-nowrap gap-3  '><UserCard/>  <div className='mt-6'><NotificationBell enabled={notificationsEnabled}/></div>   </div> </>:null}   
      </div>
     
     
      {isLoading && (
        <div className=" mx-auto mt-14 lg:mt-22">
          <CircularIndeterminate />
        </div>
      )}
      {isError && (
        <div className="-mt-14 lg:-mt-18 flex flex-col gap-14 justify-center">
          <div className="mx-auto !mb-4 ">
            <Image
              alt="alert-pic"
              width={800}
              height={800}
              src="/images/alert.png"
            />
          </div>

          <BasicAlerts />
        </div>
      )}
        <div className={`-mt-14 lg:${number==25 ? '':'-mt-14'} flex flex-col gap-8 justify-center`}>
          <div className={` lg:${number==25?'-mt-18 -mb-14':''} mx-auto  `}>
            <Image
              alt="alert-pic"
              width={800}
              height={800}
              src="/images/alert.png"
            />
          </div>

          <BasicAlerts number={number} />
        </div>
      {data && (
        <div
          className={`${number > 10 ? '' : 'h-[30rem]'}  overflow-y-auto overflow-x-hidden !mt-7 pb-2`}
        >
          {data.map((news:NewsItem, index) => {
            return (
              <div key={index} className="grid grid-cols-2 gap-8  mt-4 mb-4   ">
                <div className="">
          
                <img
  className="w-44 h-44 md:w-52 md:h-52 object-contain"
  src={news.image || '/images/latest-news.jpg'}
  alt={news.title ? news.title.substring(0, 14) + '...' : 'news'}
  onError={(e) => {
    e.currentTarget.src = '/images/latest-news.jpg';
  }}
/>
                  
                </div>
                <div className="grid grid-cols-1 gap-2 px-3">
                  {number==25 ? <a className="text-md hidden lg:block lg:text-xl ">
                   <Link href={'/news/n'}>{truncateText(news.description, 14)}</Link> 
                  </a> : <p className="text-md hidden lg:block lg:text-xl ">
                    {truncateText(news.description, 14)}
                  </p> }
                 {number==25 ?  <a className="text-md mt-4 lg:hidden block lg:text-xl ">
                   <Link href={'/news/n'}>{truncateText(news.description, 6)}</Link> 
                  </a> : <p className="text-md mt-4 lg:hidden block lg:text-xl ">
                    {truncateText(news.description, 6)}
                  </p>}
                  
                  <p className="text-sm lg:text-lg  dark:text-white text-stone-900 font-bold">
                    {' '}
                    {formattedDate(news.publishedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
