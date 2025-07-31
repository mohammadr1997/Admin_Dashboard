import * as React from "react"
import { useState,useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
interface titleType{
title:string
}
const days=['today','last 7 days','last 30','year','all']
const newest=['newest','oldest']
export function SelectDemo({title}:titleType) {
    const [dayValue,setDayValue]=useState<string>('')
    const [sortValue,setSortValue]=useState<string>('')
    useEffect(()=>{
        const allProducts=localStorage.getItem('productsImages')
        if(allProducts){
            const products=JSON.parse(allProducts)
            console.log('allproducts',products.products)
        }
    },[dayValue])
  return (
    <div>
        {title==='days'?   <Select value={dayValue} onValueChange={setDayValue}>
      <SelectTrigger className='flex text-md md:text-lg  !text-white bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
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
      <SelectTrigger className='flex !text-white text-md md:text-lg bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap'>
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
