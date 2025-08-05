'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export default function useFetchBanner() {
const getBanners=async()=>{
  const response= await axios.get('/api/bannerData')
  return response.data.data  
}
const {data,refetch}=useQuery({
     keepPreviousData: true,
    queryKey:['banners'],
    queryFn:getBanners,
    
})
  return {data,refetch}
}
