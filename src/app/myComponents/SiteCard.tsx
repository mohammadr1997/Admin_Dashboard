'use client'
import Link from 'next/link';
import { Button } from '../Components/ui/Button';
import {
   Card,
   CardContent,
   CardFooter,
   CardTitle,
   CardDescription,
 } from '../Components/ui/Card';
 export default function SiteCard({ route, iconBg }:any){
    return (<Card className="w-[300px] mx-auto rounded-2xl shadow-md overflow-hidden bg-white text-gray-800">
    <CardContent className="p-6 flex flex-col justify-center items-center gap-4">
      <span className={`p-4 ${iconBg} rounded-full text-black bg-transparent shadow-md`}>
        <route.icon className="w-6 h-6" />
      </span>
      <CardTitle className="text-lg font-semibold">{route.name}</CardTitle>
      <CardDescription className="text-sm text-gray-500 text-center">
        {route.description}
      </CardDescription>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Link href={route.url}>
        <Button className="px-6 cursor-pointer w-24 md:w-28  py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition">
          Visit
        </Button>
      </Link>
    </CardFooter>
  </Card>
);
 }
 