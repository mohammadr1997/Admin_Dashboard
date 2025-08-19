'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import { selectedImageType } from './Contextprovider';
import { Context } from './Contextprovider';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface titleType {
  title: string;
}
const days = ['today', 'last 7 days', 'last 30', 'year', 'all'];
const newest = ['newest', 'oldest'];

export function SelectDemo({ title }: titleType) {
  const context = useContext(Context);
  const selectedImgs = context?.selectedImages;
  const selectImagesByDateFilter=context?.selectedImageGalleryByDate
  const setSelectedImagesByDateFilter=context?.setSelectedImageGalleryByDate
  const dayVal=context?.dayValue
  const setDayVal=context?.setDayValue
  const setSelectedImgs = context?.setSelectedImages;
 
  const [sortValue, setSortValue] = useState<string>('');
  const { data, refetch } = useFetch();
  useEffect(() => {
    
    refetch();
    
    let updatedImgs;
    if (selectImagesByDateFilter && setSelectedImagesByDateFilter && data) {
        if(dayVal==='') return
         updatedImgs = data?.products.filter((img: any) => {
        const now = new Date();
        const secondsNow = now.getTime() / 1000;
        const imgDate = new Date(img.realDate);

        const secondsImg = imgDate.getTime() / 1000;
        const secondsSevenDays = 7 * 24 * 60 * 60;
        const secondsThirtyDays = 30 * 24 * 60 * 60;
        switch (dayVal) {
          case 'today':
            return (
              now.getFullYear() === imgDate.getFullYear() &&
              now.getMonth() === imgDate.getMonth() &&
              now.getDate() === imgDate.getDate()
            );
          case 'all':
            return true;
          case 'year':
            return now.getFullYear() === imgDate.getFullYear();
          case 'last 7 days':
            return (
              secondsNow - secondsImg <= secondsSevenDays &&
              now.getFullYear() === imgDate.getFullYear()
            );
          case 'last 30':
            return (
              secondsNow - secondsImg <= secondsThirtyDays &&
              now.getFullYear() === imgDate.getFullYear()
            );
          default:
            return true;
        }
      });
 
     
      
        setSelectedImagesByDateFilter(updatedImgs);
     
    }
    
  }, [dayVal,selectedImgs]);

  useEffect(() => {
    
    if (!selectedImgs || !setSelectedImgs || !setSelectedImagesByDateFilter || !selectImagesByDateFilter) return;
  const sortImages = (selectedImagesForSort: any, sort: string,dayValue:string) => {
      const sortImages = [...selectedImagesForSort];
      sortImages.sort((a: any, b: any) => {
        const aDate = new Date(a.realDate);
        const bDate = new Date(b.realDate);
        return sort === 'oldest'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      });
      if(dayVal===''){
         setSelectedImgs(sortImages);
      }else{
        setSelectedImagesByDateFilter(sortImages)
      }
     
    }
    if(dayVal===''){
       sortImages(selectedImgs, sortValue,dayVal);
    }else{
      sortImages(selectImagesByDateFilter,sortValue,'Defined')
    }
    
   
  }, [sortValue]);
  return (
    <div>
      {title === 'days' ? (
        <Select value={dayVal} onValueChange={setDayVal}>
          <SelectTrigger className=" cursor-pointer flex text-md md:text-lg  !text-white bg-black/10  w-full backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap">
            <SelectValue className="" placeholder="filter by days" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {days.map((item, key: number) => {
                return (
                  <SelectItem key={key} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className=" cursor-pointer flex !text-white text-md md:text-lg bg-black/10  w-full  backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap">
            <SelectValue placeholder="sort : Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {newest.map((item, key: number) => {
                return (
                  <SelectItem key={key} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
