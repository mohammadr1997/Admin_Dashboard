'use client';

import React, { useContext } from 'react';
import { Context } from './Contextprovider';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { usePost } from './hooks/usePost';
import { Upload } from 'lucide-react';
import useConvertBase64 from './hooks/useConvertBase64';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// const compressAndConvertToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     const isSvg = file.type === 'image/svg+xml';

//     reader.onload = () => {
//       if (isSvg) {
       
//         resolve(reader.result as string);
//         return;
//       }

//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const MAX_WIDTH = 800;
//         const scaleSize = MAX_WIDTH / img.width;
//         canvas.width = MAX_WIDTH;
//         canvas.height = img.height * scaleSize;

//         const ctx = canvas.getContext('2d');
//         ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

//         const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
//         resolve(compressedBase64);
//       };
//       img.onerror = reject;
//       img.src = reader.result as string;
//     };

//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// };

export default function UploadButton() {
  const context = useContext(Context);
  const {compressAndConvertToBase64} =useConvertBase64()
  const setSelectedImgs = context?.setSelectedImages;

  const { postData } = usePost();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const name = file.name;
      const fileType = file.type?.split('/')[1] || 'unknown';

      const base64String = await compressAndConvertToBase64(file);

      const now = new Date();
      const day = now.toLocaleString('en-us', { day: '2-digit' });
      const month = now.toLocaleString('en-us', { month: 'long' });
      const year = now.toLocaleString('en-us', { year: 'numeric' });

      const realDate = `${day} ${month} ${year}`;
      const dateResult = `${day} ${month}`;
      const id=Date.now()
      const objectImage = {
        imageName: name,
        src: base64String,
        date: dateResult,
        realDate,
        type: fileType,
        id
      };

      setSelectedImgs?.((prev) => [...prev, objectImage]);
      postData(objectImage);
    }
  };

  return (
    <div className="flex -mt-1 bg-black/10 w-full backdrop-blur-lg border-1  font-bold border-blue-100 rounded-3xl px-2 -py-1 flex-row gap-2 flex-nowrap">
      <input
        onChange={handleChange}
        id="trigger-upload"
        type="file"
        className="hidden"
      />
      <label className="cursor-pointer flex flex-row" htmlFor="trigger-upload">
        <Upload className="mt-2" />
        <span
          className={cn(
            'text-white font-bold text-center text-sm lg:text-md hover:!bg-transparent hover:!text-inherit',
            buttonVariants({ variant: 'ghost', size: 'lg' })
          )}
        >
          Upload New Image
        </span>
      </label>
    </div>
  );
}
