'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
interface progressProp{
    target:number
}
interface progressProp{
    keyStatus:string
}
export default function Progress({target,keyStatus}:progressProp) {
        const [progressValue,setProgressValue]=useState<number>(0)
    useEffect(()=>{
        const interval=setInterval(()=>{
            setProgressValue((prev:number)=>{
                    if( prev < target){
                        return prev +1
                        } else{
                            return target
                        }
            })
        },100)
    
        return()=>clearInterval(interval)
        
    },[progressValue])
   
  return (
    <div className='flex flex-col gap-1 -mt-4 p-1'>
          <CircularProgressbar
        value={progressValue}
        text={`${progressValue}`}
        maxValue={300}
        strokeWidth={10}
        styles={buildStyles({
          textColor: '#333',
          
          pathColor: '#ef4444',
          trailColor: '#e5e7eb',
          textSize: '16px',
        })}
      />
         <span className='text-black text-md md:text-lg font-bold'>{keyStatus}</span>
    </div>
   
  )
}
