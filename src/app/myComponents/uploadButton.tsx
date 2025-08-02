'use client'
import React from 'react'
import { Context } from './Contextprovider';
import { useContext } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../lib/utils';
import { usePost } from './hooks/usePost';
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
import { Upload } from 'lucide-react'


export default function UploadButton() {
  const context=useContext(Context)
  const setSelectedImgs=context?.setSelectedImages
  
   const {postData}=usePost()
  // const postData=async(data)=>{
  //   const response=await axios.post('/api/data',data)
  //   return response.data.data
  // }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const name = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file); // تبدیل به base64

    reader.onloadend = () => {
      const base64String = reader.result as string;

      const now = new Date();
      const day = now.toLocaleString("en-us", { day: "2-digit" });
      const month = now.toLocaleString("en-us", { month: "long" });
      const year = now.toLocaleString("en-us", { year: "numeric" });

      const realDate = `${day} ${month} ${year}`;
      const dateResult = `${day} ${month}`;

      const objectImage = {
        imageName: name,
        src: base64String, 
        date: dateResult,
        realDate,
      };

      setSelectedImgs?.((prev) => [...prev, objectImage]);
      
      postData(objectImage);
    };
  }
};
  return (
    
       <div className='flex  bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
        <input onChange={handleChange} id='trigger-upload' type="file" className='hidden' />
        <label className='cursor-pointer  flex flex-row' htmlFor='trigger-upload'>  <Upload className='mt-2'/>
      <span 
  className={`text-white   font-bold text-center   text-sm lg:text-lg hover:!bg-transparent hover:!text-inherit ${buttonVariants({ variant: 'ghost', size: 'lg' })}`}
>
  Upload New Image
</span></label>
       </div>
   
  )
}
