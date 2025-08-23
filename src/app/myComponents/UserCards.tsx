// components/UserCard.jsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // adjust path if needed
import React from "react";
  
const UserCard = () => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="bg-amber-400 w-20 h-20 -mt-3 mx-1">
        <AvatarImage src="./images/manager.jpg" alt='admin pic' />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <div className="w-full text-sm md:text-lg ">
        <p className="text-sm md:text-md ">Manager</p>
        <p className="text-sm md:text-md text-white">Mohammad Rezaee</p>
      </div>
    </div>
  );
};

export default UserCard;
