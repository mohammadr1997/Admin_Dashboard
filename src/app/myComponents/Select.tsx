import * as React from "react"
import { useState,useEffect } from "react"
import { selectedImageType } from "./Contextprovider"
import { Context } from "./Contextprovider"
import { useContext } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface titleType{
title:string
}
const days=['today','last 7 days','last 30','year','all']
const newest=['newest','oldest']

export function SelectDemo({title}:titleType) {
  const context=useContext(Context)
  const selectedImgs=context?.selectedImages
  const allImgs=context?.allImgs
  const setAllImgs=context?.setAllImgs
  const setSelectedImgs=context?.setSelectedImages
    const [dayValue,setDayValue]=useState<string>('')
    const [sortValue,setSortValue]=useState<string>('')
    useEffect(()=>{
      const allProducts=localStorage.getItem("productsImages")
      if(allProducts){
        const allProductsImgs=JSON.parse(allProducts)
        console.log('all',allProductsImgs)
         const updatedImgs=allProductsImgs.filter((img:any)=>{
          const now=new Date()
         const secondsNow=now.getTime() / 1000
          const imgDate=new Date(img.realDate)
         
          const secondsImg=imgDate.getTime() / 1000;
          const secondsSevenDays=7 * 24 * 60 * 60
          const secondsThirtyDays= 30 * 24 * 60 * 60
          switch(dayValue){
            case "today":
              return now.getFullYear()===imgDate.getFullYear() && now.getMonth()===imgDate.getMonth() && now.getDate()===imgDate.getDate()
              case "all":
                return true
                case "year":
                  return now.getFullYear()===imgDate.getFullYear()
                  case "last 7 days":
                  return secondsNow - secondsImg <= secondsSevenDays && now.getFullYear()===imgDate.getFullYear()
                  case "last 30":
                    return secondsNow - secondsImg <=secondsThirtyDays && now.getFullYear()===imgDate.getFullYear()
                    default:
                      return true
          }
        })
        if(setSelectedImgs){
          setSelectedImgs(updatedImgs)
        }
      }
      
       
        
       
       
       
     
        // if(allProducts){
        //     const products=JSON.parse(allProducts)
        //     console.log('allproducts',products.products)
        // }
    },[dayValue])
  return (
    <div>
        {title==='days'?   <Select value={dayValue} onValueChange={setDayValue}>
      <SelectTrigger className=' cursor-pointer flex text-md md:text-lg  !text-white bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
        <SelectValue className="" placeholder="filter by days" />
        
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {days.map((item,key:number)=>{
                return <SelectItem key={key} value={item}>{item}</SelectItem>
            })}
        
        </SelectGroup>
      </SelectContent>
    </Select>:   <Select value={sortValue} onValueChange={setSortValue}>
      <SelectTrigger className=' cursor-pointer flex !text-white text-md md:text-lg bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
        <SelectValue placeholder="sort : Newest" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
         {newest.map((item,key:number)=>{
                return <SelectItem key={key} value={item}>{item}</SelectItem>
            })}
         
        </SelectGroup>
      </SelectContent>
    </Select>}
       
    </div>
   
  )
}
