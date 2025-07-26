
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Components/ui/Button";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-10 lg:p-5">
    <Image width={600} height={600} alt="pic not-found" src="/images/not-found.jpg" />
    <p className="text-gray-500 text-md lg:text-lg text-center">The page you are looking for does not exist or might be redirected to another url</p>
      <Link href="/Dashboard" passHref>
        <Button className="bg-[#ef4444] cursor-pointer text-white font-bold text-md lg:text-lg" color="red" variant='ghost'>Take me home</Button>
      </Link>
    </div>
  );
}
