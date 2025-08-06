'use client';
import React, { useContext } from 'react';

import Image from 'next/image';
import { usePost } from '../myComponents/hooks/usePost';
import { Context } from '../myComponents/Contextprovider';
import { useState } from 'react';
import { selectedImageType } from '../myComponents/Contextprovider';

import { useEffect } from 'react';
import useFetch from '../myComponents/hooks/useFetch';
import UploadButton from '../myComponents/uploadButton';
import SideBar from '../myComponents/SideBar';
import { SelectDemo } from '../myComponents/Select';
import { Card, CardFooter } from '../Components/ui/Card';
import { CardDescription } from '../Components/ui/Card';
import { CardContent } from '../Components/ui/Card';

import Button from '@mui/material/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
export default function Page() {
  const { postData } = usePost();
  const context = useContext(Context);
  const selectedImgs = context?.selectedImages;
  const setSelectedImgs = context?.setSelectedImages;
  const dayValueInput=context?.dayValue
  const setDayvalueInput=context?.setDayValue
  const imagesByDateFilter=context?.selectedImageGalleryByDate
  const setImagesByDateFilter=context?.setSelectedImageGalleryByDate
  // const [allImages, setAllImages] = useState<selectedImageType[]>([]);
  const { data, refetch } = useFetch();

  useEffect(() => {
    if (data && setSelectedImgs) {
     
      setSelectedImgs(data.products);
    }
    console.log('dayValue',dayValueInput)
  }, [data]);
  useEffect(()=>{
    refetch();
  },[selectedImgs])

  useEffect(()=>{
    console.log('dayvalue',dayValueInput)
  },[dayValueInput])
  const handleDelete = (id: number) => {
    if (selectedImgs && selectedImgs.length > 0) {
      const newUpdatedImages = selectedImgs.filter((_, index) => id !== index);
      if (newUpdatedImages && setSelectedImgs) {
        setSelectedImgs(newUpdatedImages);
        postData(newUpdatedImages);
      }
    }
  };
  return (
    <section className="  overflow-x-hidden  grid grid-cols-1  lg:flex-nowrap  w-full text-white ">
      <SideBar />
      <div className=" text-white   font-bold  gap-4 lg:justify-between p-10  flex flex-col   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center  justify-around ">
        <div className=" flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          {' '}
          <div>
            <h1 className=" text-xl lg:text-4xl">Galley</h1>
            <p className="text-md lg:text-xl">
              Hi Mohammad manage and Publish your content visuial
            </p>
          </div>
          <div className="mx-auto mt-6 lg:mt-0">
            <UploadButton />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 md:flex-row md:flex-nowrap md:justify-center lg:justify-end">
          <div className="mx-auto lg:mx-0">
            <SelectDemo title="days" />
          </div>
          <div className="mx-auto lg:mx-0">
            <SelectDemo title="sort" />
          </div>
        </div>
      </div>
      <div className=" md:pl-[8px] lg:pl-[268px] md:pr-[18px] w-full  min-h-[33rem] bg-[#189DAC] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6  justify-center items-center gap-8">
    
        {dayValueInput && Array.isArray(dayValueInput==='all' ? selectedImgs : imagesByDateFilter) ? (dayValueInput==='all' ? selectedImgs : imagesByDateFilter)?.map((img, key: number) => {
              return (
                <Card
                  className="w-[300px]  overflow-hidden mx-auto rounded-3xl"
                  key={key}
                >
                  <CardContent className="w-[300px] overflow-hidden ">
                    <Image
                      className=" cursor-pointer transition-all duration-700 hover:scale-110 w-[300px] h-[300px] mx-auto p-0"
                      src={img.src}
                      alt={img.imageName}
                      width={600}
                      height={600}
                    />
                  </CardContent>
                  <CardDescription className="text-left p-4">
                    {img.imageName}
                  </CardDescription>
                  <CardFooter className="grid grid-cols-1">
                    <div className="grid grid-cols-2 gap-8 mb-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="!text-black !font-bold !text-md !lg:text-lg !px-4 !py-2 !rounded-2xl !border-1 !border-gray">
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle></DialogTitle>
                          <Image
                            className="w-[450px] mx-auto h-[450px]"
                            src={img.src}
                            alt={img.imageName}
                            width={600}
                            height={600}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button
                        onClick={() => handleDelete(key)}
                        className="!text-black !font-bold !text-md !lg:text-lg !px-4 !py-2 !rounded-2xl !border-1 !border-gray"
                      >
                        Delete
                      </Button>
                    </div>
                    <div>
                      <span className="text-left p-2 mt-4 mb-">{img.date}</span>
                    </div>
                  </CardFooter>
                </Card>
              );
            })
        :null  }
      </div>
    </section>
  );
}
