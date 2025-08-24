'use client';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
export type selectedImageType = {
  imageName: string;
  src: string;
  date: string;
  realDate: string;
  isActive: boolean;
  type?: string;
  id:number
};
interface contextType {
  selectedImages: selectedImageType[];
  dayValue:string,
  setDayValue:React.Dispatch<React.SetStateAction<string>>
  selectedImageGalleryByDate: selectedImageType[];
  selectedBanner: selectedImageType[];
  menuOpen:boolean;
  setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<selectedImageType[]>>;
  setSelectedImageGalleryByDate: React.Dispatch<React.SetStateAction<selectedImageType[]>>;
  setSelectedBanner: React.Dispatch<React.SetStateAction<selectedImageType[]>>;
}
export const Context = createContext<contextType | undefined>(undefined);
export default function Contextprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedImages, setSelectedImages] = useState<selectedImageType[]>([]);
  const [dayValue, setDayValue] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedBanner, setSelectedBanner] = useState<selectedImageType[]>([]);
  const [selectedImageGalleryByDate, setSelectedImageGalleryByDate] = useState<selectedImageType[]>([]);

  return (
    <Context.Provider
      value={{
        selectedImages,
        setSelectedImages,
        selectedBanner,
        setSelectedBanner,
        setSelectedImageGalleryByDate,
        selectedImageGalleryByDate,
        dayValue,
        setDayValue,
        menuOpen,
        setMenuOpen
      }}
    >
      {children}
    </Context.Provider>
  );
}
