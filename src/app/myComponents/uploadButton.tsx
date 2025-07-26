'use client'
import React from 'react'
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import SideBar from './SideBar';
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
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log('e',e)
    }
  return (
    
       <div className='flex  bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
        <input onChange={handleChange} id='trigger-upload' type="file" className='hidden' />
        <label className='cursor-pointer  flex flex-row' htmlFor='trigger-upload'>  <Upload className='mt-2'/>
      <span 
  className={`text-white font-bold text-center w-full  text-sm lg:text-lg ${buttonVariants({ variant: 'ghost', size: 'lg' })}`}
>
  Upload New Image
</span></label>
       </div>
   
  )
}
