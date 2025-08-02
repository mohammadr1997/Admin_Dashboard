'use client'
import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export type selectedImageType={
      imageName:string,
     src:string
    date:string,
    realDate:string
}
interface contextType {
    selectedImages:selectedImageType[],
  
    setSelectedImages:React.Dispatch<React.SetStateAction<selectedImageType[]>>,
   
}
export const Context = createContext<contextType | undefined>(undefined)
export default function Contextprovider({children}:{children:React.ReactNode}) {
    const [selectedImages,setSelectedImages]=useState<selectedImageType[]>([])

  return (
    <Context.Provider value={{selectedImages,setSelectedImages}}>{children}</Context.Provider>
  )
}
