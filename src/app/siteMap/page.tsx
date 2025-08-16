

'use client';
import React from 'react';
import { menuItem } from '../data';
import Link from 'next/link';
import SideBar from '../myComponents/SideBar';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '../Components/ui/Card';
import { Button } from '../../components/ui/button';




export default function Page() {
    
  return (
    <section className="relative overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />

      <div className="text-white font-bold gap-4 p-10 flex flex-col bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center">
    
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl lg:text-4xl">Sitemap</h1>
          <p className="text-md lg:text-xl">
            Hi Mohammad, here is a quick access to all your site pages
          </p>
        </div>

      
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
          {menuItem[0].mainItem.map((route, key) => (
            <Card
              key={key}
              className="w-[300px] mx-auto rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <CardContent className="p-6 flex flex-col justify-center items-center gap-4">
                <span className="p-4 bg-[#189DAC] rounded-full text-black shadow-md">
                 <route.icon className="w-6 h-6" />
                </span>
                <CardTitle className="text-xl">{route.name}</CardTitle>
                <CardDescription className="text-sm text-gray-200 text-center">
                  {route.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href={route.url}>
                  <Button
                    variant="ghost"
                    className="!text-black !font-bold !px-6 !py-2 !rounded-2xl !border-1 !border-gray"
                  >
                    Visit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          {menuItem[0].restItem.map((route, key) => (
            <Card
              key={key}
              className="w-[300px] mx-auto rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <CardContent className="p-6 flex flex-col justify-center items-center gap-4">
                <span className="p-4 bg-white rounded-full text-black shadow-md">
                 <route.icon className="w-6 h-6" />
                </span>
                <CardTitle className="text-xl">{route.name}</CardTitle>
                <CardDescription className="text-sm text-gray-200 text-center">
                  {route.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href={route.url}>
                  <Button
                    variant="ghost"
                    className="!text-black !font-bold !px-6 !py-2 !rounded-2xl !border-1 !border-gray"
                  >
                    Visit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
