'use client';
import React, { useContext } from 'react';
import useConvertBase64 from '../myComponents/hooks/useConvertBase64';
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

import {Button} from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import UserCard from '../myComponents/UserCards';

export default function Page() {
  const {compressAndConvertToBase64} =useConvertBase64()
  const { postData } = usePost();
  const [editImage,setEditImage]=useState<selectedImageType | null>(null)
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


  const handleDelete = (id: number) => {
    if (selectedImgs && selectedImgs.length > 0) {
      const newUpdatedImages = selectedImgs.filter((_, index) => id !== index);
      if (newUpdatedImages && setSelectedImgs) {
        setSelectedImgs(newUpdatedImages);
        postData(newUpdatedImages);
      }
    }
  };
  const handleSave=(e,image:selectedImageType)=>{
    e.preventDefault();
    if(!selectedImgs || !setSelectedImgs || !imagesByDateFilter || !setImagesByDateFilter) return

    if(dayValueInput===''){
     const updatedImgs= selectedImgs.map((img:selectedImageType)=>img.id===image.id ? image :img)
     setSelectedImgs(updatedImgs)
     postData(updatedImgs)
    }else{
        const updatedImgs= imagesByDateFilter.map((img:selectedImageType)=>img.realDate===image.realDate ? image :img)
     setImagesByDateFilter(updatedImgs)
     postData(updatedImgs)
    }
    setEditImage(null)
  }
  return (
    <section className="  overflow-x-hidden  grid grid-cols-1  lg:flex-nowrap  w-full text-white ">
      <SideBar />
      <div className=" text-white   font-bold  gap-4 lg:justify-between p-10  flex flex-col dark:bg-[#0f4b5c]   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center  justify-around ">
        <div className=" flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          {' '}
          <div>
            <h1 className=" text-xl lg:text-4xl">Galley</h1>
            <p className="text-md lg:text-xl">
              Hi Mohammad manage and Publish your content visuial
            </p>
          </div>
          <div className=" hidden lg:inline-block mx-auto mt-6 lg:mt-0">
            <UserCard/>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 md:flex-row md:flex-nowrap md:justify-center lg:justify-end  overflow-x-hidden lg:pl-[288px] md:pr-[8px] w-full  ">
           <div className="mx-auto mt-2 lg:mx-0 w-full">
            <UploadButton />
          </div>
          <div className="mx-auto mt-2 lg:mx-0 w-full">
            <SelectDemo title="days" />
          </div>
          <div className="mx-auto mt-2 lg:mx-0 w-full">
            <SelectDemo title="sort" />
          </div>
        </div>
      </div>
      <div className=" md:pl-[8px] lg:pl-[268px] md:pr-[18px] w-full  min-h-[33rem] dark:bg-[#0f4b5c] bg-[#189DAC] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6  justify-center items-center gap-8">
    
        {dayValueInput==='' && Array.isArray(dayValueInput==='' ? selectedImgs : imagesByDateFilter) ? (dayValueInput==='' ? selectedImgs : imagesByDateFilter)?.map((img, key: number) => {
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
                    <div className="grid grid-cols-3 items-center gap-4 mb-2">
                      <Dialog>
                        <DialogTrigger asChild>
                         
                            <Button  className="text-black dark:text-white !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer" variant='ghost'>
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
                    <Dialog open={!!editImage} onOpenChange={(isOpen) => {
  if (!isOpen) setEditImage(null);
}}>
  <DialogTrigger asChild>
    <Button
      onClick={() => setEditImage(img)}
      className="text-black dark:text-white !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
      variant="ghost"
    >
      Edit
    </Button>
  </DialogTrigger>

  {editImage && (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <form
        className="text-md lg:text-lg font-bold grid grid-cols-1 gap-6"
        onSubmit={(e) => handleSave(e, editImage)}
      >
        <div className="flex flex-row flex-nowrap w-full justify-around">
          <label className="mx-4 cursor-pointer mt-2" htmlFor="name">
            Image Name
          </label>
          <input
            required
            value={editImage.imageName}
            onChange={(e) =>
              setEditImage({
                ...editImage,
                imageName: e.target.value,
              })
            }
            placeholder={editImage.imageName}
            className="rounded-3xl p-3 border-1 border-gray w-1/2"
            type="text"
            id="name"
          />
        </div>

        <div className="flex flex-row flex-nowrap w-full justify-between">
          <label className="cursor-pointer mt-2" htmlFor="source">
            Upload New Image
          </label>
          <input
            required
            className="w-1/2 rounded-3xl p-3 border-1 border-gray"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const compressedSrc = await compressAndConvertToBase64(file);
              setEditImage({
                ...editImage,
                src: compressedSrc,
              });
            }}
            id="source"
            type="file"
          />
        </div>

        <button
          type="submit"
          className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </DialogContent>
  )}
</Dialog>
                      
                               <Button
                        onClick={() => handleDelete(key)}
                        className="text-black dark:text-white !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer" variant='ghost'
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
        :imagesByDateFilter?.map((img, key: number) => {
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
                    <div className="grid grid-cols-3 gap-6 mb-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button  className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer" variant='ghost'>
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
                      <Dialog open={!!editImage} onOpenChange={(isOpen) => {
  if (!isOpen) setEditImage(null);
}}>
  <DialogTrigger asChild>
    <Button
      onClick={() => setEditImage(img)}
      className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
      variant="ghost"
    >
      Edit
    </Button>
  </DialogTrigger>

  {editImage && (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <form
        className="text-md lg:text-lg font-bold grid grid-cols-1 gap-6"
        onSubmit={(e) => handleSave(e, editImage)}
      >
        <div className="flex flex-row flex-nowrap w-full justify-around">
          <label className="mx-4 cursor-pointer mt-2" htmlFor="name">
            Image Name
          </label>
          <input
            required
            value={editImage.imageName}
            onChange={(e) =>
              setEditImage({
                ...editImage,
                imageName: e.target.value,
              })
            }
            placeholder={editImage.imageName}
            className="rounded-3xl p-3 border-1 border-gray w-1/2"
            type="text"
            id="name"
          />
        </div>

        <div className="flex flex-row flex-nowrap w-full justify-between">
          <label className="cursor-pointer mt-2" htmlFor="source">
            Upload New Image
          </label>
          <input
            required
            className="w-1/2 rounded-3xl p-3 border-1 border-gray"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const compressedSrc = await compressAndConvertToBase64(file);
              setEditImage({
                ...editImage,
                src: compressedSrc,
              });
            }}
            id="source"
            type="file"
          />
        </div>

        <button
          type="submit"
          className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </DialogContent>
  )}
</Dialog>
                  
                      <Button
                        onClick={() => handleDelete(key)}
                         className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer" variant='ghost'
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
            })  }
      </div>
    </section>
  );
}
