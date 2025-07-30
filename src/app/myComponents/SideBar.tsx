'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { Menu,X ,Bell, LucideIcon  } from 'lucide-react'
import { menuItem } from '../data'
import { Avatar,AvatarFallback,AvatarImage } from '../Components/ui/Avatar'
import {
  Command,
  
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
 
} from "../Components/ui/Command"
export default function SideBar() {
    type items={
  name:string,
  icon:LucideIcon
}
      const [menuOpen,setMenuOpen]=useState<boolean>(false);
      const pathName=usePathname();
      const path=pathName.split('').slice(1).join('')
  return (
    <>
      <div className={`lg:hidden fixed lg:col-span-1 text-center p-6  transition-all   ${menuOpen?'h-full' : ''} lg:h-screen mx-auto relative w-full bg-gray-50 `}>
           {menuOpen ? <X className='cursor-pointer' color='black' onClick={()=>setMenuOpen((prev)=>!prev)} /> : <Menu color='black' onClick={()=>setMenuOpen((prev)=>!prev)} className={` ${menuOpen?'hidden':'flex'}lg:hidden cursor-pointer '`}/>}
       <div className='absolute flex flex-row flex-gap-4 justify-end gap-1 right-10 top-4  '>
      
       <div className='flex flex-row gap-1 rounded-4xl p-2  text-stone-950 w-64 px-4  shadow-4xl mx-1 -mt-4 '>
        <div>
           <Avatar className='w-14 h-14'>
          <AvatarImage className=''  src="./images/manager.jpg" alt='pic'></AvatarImage>
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        </div>
       
          <div className='w-full'>
        <p className="text-sm font-medium ">Mohammad Rezaei</p>
        <p className="text-sm text-muted-foreground">Manager</p>
      </div>
       </div>
       
        <Bell className='cursor-pointer' color='black'/>
       </div>
      
        <Command className={`overflow-y-hidden scroll-y-0 transition-all duration-1000 ${menuOpen?'relative h-full opacity-100 ':'hidden opacity-0 '}`} >
 
  <CommandList className='' >
    
    <CommandGroup className='w-44' heading="">
      {menuItem[0].mainItem.map((item:items,key:Key)=>{
        
        const Icon=item.icon
        return <CommandItem className={`${item.name===path? 'bg-white text-black ' :'text-black'} hover:text-black hover:bg-white mt-1 text-white`}  key={key} ><Link className={`flex flex-row gap-2 ${item.name===path ? 'text-black ' :''}  cursor-pointer text-black`} href={`/${item.name}`}><Icon/>&nbsp;{item.name}</Link></CommandItem>
      })}
    </CommandGroup>
    <CommandSeparator />
    <CommandSeparator />
   
  <hr className=" border-t border-gray-800 w-[10rem] lg:w-4/5 lg:mx-auto" />
 <CommandSeparator />
 <CommandSeparator />
    <CommandGroup className='w-44' heading="">
       {menuItem[0].restItem.map((item:items,key:Key)=>{
        const Icon=item.icon
        return <CommandItem className={`${item.name===path? 'bg-white text-black ' :'text-black'} hover:text-black hover:bg-white mt-1 text-white`} key={key} ><Link className={`flex flex-row gap-2 hover:bg-white cursor-pointer ${item.name===path ? 'text-black' :''}text-black`} href={`/${item.name}`}><Icon/>&nbsp;{item.name}</Link></CommandItem>
      })}
    </CommandGroup>
  </CommandList>
</Command>
      </div>
       <div className='hidden lg:w-[250px]   lg:flex lg:fixed  text-center bg-blue-950    lg:h-screen  '>
           {/* {menuOpen ? <X color='black' onClick={()=>setMenuOpen((prev)=>!prev)} /> : <Menu color='black' onClick={()=>setMenuOpen((prev)=>!prev)} className={` ${menuOpen?'hidden':'flex'}lg:hidden cursor-pointer '`}/>} */}
       
      
        <Command  >
 
  <CommandList className=' lg:h-full  w-full ' >
    
    <CommandGroup className='' heading="">
      {menuItem[0].mainItem.map((item:items,key:Key)=>{
        const Icon=item.icon
        return <CommandItem className={`${item.name===path? 'bg-white ' :''} hover:text-black hover:bg-white mt-1 text-white`}    key={key} ><Link className={`flex flex-row gap-2  cursor-pointer ${item.name===path ? 'text-black' :''}`} href={`/${item.name}`}><Icon/>&nbsp;{item.name}</Link></CommandItem>
      })}
    </CommandGroup>
    <CommandSeparator />
    <CommandSeparator />
   
  <hr className=" border-t border-gray-800 w-[10rem] lg:w-4/5 lg:mx-auto" />
 <CommandSeparator />
 <CommandSeparator />
    <CommandGroup heading="">
       {menuItem[0].restItem.map((item:items,key:Key)=>{
        const Icon=item.icon
        return <CommandItem className={`${item.name===path? 'bg-white ' :''} hover:text-black hover:bg-white mt-1 text-white`} key={key}><Link className={`flex flex-row gap-2  cursor-pointer `} href={`/${item.name}`}> <Icon/>&nbsp;{item.name} </Link></CommandItem>
      })}
    </CommandGroup>
  </CommandList>
</Command>
      </div>
      </>
  )
}
