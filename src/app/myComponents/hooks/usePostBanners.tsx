'use client'

import axios from 'axios'
interface dataType {
    imageName:string,
    src:string,
    realDate:string,
    date:string,
    isActive:boolean
}
export default function usePostBanners() {
    const postBanner=async(data:dataType | dataType[])=>{
            const response= await axios.post('/api/bannerData',data)
            return response.data
    }

  return {postBanner}
}
