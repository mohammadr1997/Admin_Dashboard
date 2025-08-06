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
};
interface contextType {
  selectedImages: selectedImageType[];
  selectedBanner: selectedImageType[];
  setSelectedImages: React.Dispatch<React.SetStateAction<selectedImageType[]>>;
  setSelectedBanner: React.Dispatch<React.SetStateAction<selectedImageType[]>>;
}
export const Context = createContext<contextType | undefined>(undefined);
export default function Contextprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedImages, setSelectedImages] = useState<selectedImageType[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<selectedImageType[]>([]);

  return (
    <Context.Provider
      value={{
        selectedImages,
        setSelectedImages,
        selectedBanner,
        setSelectedBanner,
      }}
    >
      {children}
    </Context.Provider>
  );
}
