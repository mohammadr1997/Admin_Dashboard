"use client";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {useEffect } from "react";
import Link from "next/link";

import { Context } from "./ContextProvider";
import { Menu, X, LucideIcon } from "lucide-react";
import { menuItem } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../../components/ui/command";
import { DarkModeContext } from "../myComponents/darkModeProvider";
import NotificationBell from "./NotificationBell";

export default function SideBar() {
  type items = { name: string; icon: LucideIcon; url: string };

  const pathName = usePathname();
  // const path = pathName.split("").slice(1).join("");
   const contextDark = useContext(DarkModeContext);
    if (!contextDark) {
    throw new Error('DarkModeContext must be used within a DarkModeProvider');
  }
  const { darkMode } = contextDark;  
  // const { darkMode } = useContext(DarkModeContext);
  const context=useContext(Context)

 const menuOpen = context?.menuOpen ;
  const setOpenMenu = context?.setMenuOpen;

  const bgColor = darkMode ? "bg-[#0f4b5c]" : "bg-white";
  const textColor = darkMode ? "text-black" : "text-black";
  const hoverBg = darkMode ? "hover:bg-blue-900" : "hover:bg-white";
  const hoverText = darkMode ? "hover:text-white" : "hover:text-white hover:bg-blue-900";
  const iconColor = darkMode ? "white" : "black";
  
  const notificationsEnabled=context?.notificationsEnabled
  const setNotificationsEnabled=context?.setNotificationsEnabled
 

     useEffect(() => {
      if(!notificationsEnabled || !setNotificationsEnabled) return
    const stored = localStorage.getItem('notificationsEnabled');
    if (stored !== null) {
      setNotificationsEnabled(JSON.parse(stored));
    }
  }, [notificationsEnabled]);
  return (
    <>
   
      <div
        className={`lg:hidden  fixed text-center p-6 transition-all ${menuOpen ? "h-[70vh]" : ""} lg:h-screen mx-auto  relative w-full ${bgColor}`}
      >
        { menuOpen ? (
          <X
            className="cursor-pointer"
            color={iconColor}
            onClick={() =>{ 
              if(!setOpenMenu) return
              setOpenMenu((prev) => !prev)}}
          />
        ) : (
          <Menu
            className="lg:hidden cursor-pointer"
            color={iconColor}
            onClick={() =>{ 
              if(!setOpenMenu) return
              setOpenMenu((prev) => !prev)}}
          />
        )}

        <div className="absolute  flex flex-row gap-1 justify-end right-4 top-4   ">
          <div className={`flex flex-row gap-1 rounded-4xl p-2 w-64 shadow-4xl   mx-1 -mt-4 ${bgColor} ${textColor}`}>
            <Avatar className="w-14 h-14">
              <AvatarImage src="./images/manager.jpg" alt="pic" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className="w-full mt-2">
              <p className={`text-sm font-medium ${darkMode? 'text-white':'text-black'}`}>Mohammad Rezaei</p>
              <p className="text-sm text-muted-foreground">Manager</p>
            </div>
          </div>
          <NotificationBell enabled={notificationsEnabled}/>
        </div>

        <Command
          className={`overflow-y-hidden scroll-y-0 transition-all duration-1000 ${
            menuOpen ? "relative  h-full z-10 opacity-100 mt-8 " : "hidden opacity-0 "
          }`}
        >
          <CommandList>
            <CommandGroup className="w-44">
              {menuItem[0].mainItem.map((item: items, key: number) => {
                const Icon = item.icon;
             const active = `/${item.url}` === pathName;
                return (
                  <CommandItem
                     className={`mt-1 group cursor-pointer !text-white ${active ? "bg-blue-900 text-white "  : ''} ${hoverBg} ${hoverText} ${!darkMode ? 'hover:text-white' :'!text-black'}`}
                    key={key}
                  >
                    <Link className={`flex flex-row gap-2 cursor-pointer  ${active && 'text-white'}   ${darkMode ? 'text-white':'text-black group-hover:text-white'}`} href={`/${item.url}`}>
                      <Icon className={`w-8 h-8   ${active ? "text-white bg-blue-900" : darkMode ? "text-white" : ""}
    ${!darkMode ? "group-hover:text-white " : ""} `} />
                      {item.name}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup className="w-44">
              {menuItem[0].restItem.map((item: items, key: number) => {
                const Icon = item.icon;
             const active = `/${item.url}` === pathName;
                return (
                  <CommandItem
                    className={`mt-1 group cursor-pointer  ${active ? "bg-blue-900 text-white "  : textColor} ${hoverBg} ${hoverText} ${!darkMode ? 'hover:text-white' :''}`}
                    key={key}
                  >
                    <Link className={`group-hover:text-white flex flex-row gap-2 ${active && 'text-white'} cursor-pointer ${darkMode ? 'text-white':'text-black'} `} href={`/${item.url}`}>
                      <Icon  className={`w-8 h-8   ${active ? "text-white bg-blue-900" : darkMode ? "text-white" : " text-black"}
    ${!darkMode ? "group-hover:text-white " : ""} `} />
                      {item.name}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

    
      <div className={`hidden lg:w-[250px] lg:flex lg:fixed text-center ${bgColor} lg:h-screen`}>
        <Command>
          <CommandList className="lg:h-full w-full">
            <CommandGroup>
              {menuItem[0].mainItem.map((item: items, key: number) => {
                const Icon = item.icon;
               const active = `/${item.url}` === pathName;
                 return (
                  <CommandItem
                    className={`mt-1 cursor-pointer ${active ? "bg-blue-900 text-white "  : textColor} ${hoverBg} ${hoverText} ${!darkMode ? 'hover:text-white' :'text-white'}`}
                    key={key}
                  >
                    <Link className="group flex flex-row gap-2 cursor-pointer text-lg" href={`/${item.url}`}>
                      <Icon className={`!w-[24px] !h-[24px]    ${active ? "text-white bg-blue-900" : darkMode ? "text-white" : " "}
    ${!darkMode ? "group-hover::text-white " : ""} `}  />
                      {item.name}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              {menuItem[0].restItem.map((item: items, key: number) => {
                const Icon = item.icon;
                const active = `/${item.url}` === pathName;
                return (
                  <CommandItem
                    className={`mt-1 cursor-pointer ${active ? "bg-blue-900 text-white "  : textColor} ${hoverBg} ${hoverText} ${!darkMode ? 'hover:text-white' :'text-white'}`}
                    key={key}
                  >
                    <Link className="group flex flex-row gap-2 cursor-pointer text-lg" href={`/${item.url}`}>
                      <Icon className={`!w-[24px] !h-[24px]   ${active ? "text-white bg-blue-900" : darkMode ? "text-white" : " "}
    ${!darkMode ? "group-hover::text-white  " : "!bg-blue-900"} `}  />
                      {item.name}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </>
  );
}
