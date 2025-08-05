'use client'
import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export default function useFetch() {
      const getProducts=async()=>{
    const response= await axios.get('/api/data')
    return response.data.data
  }
  const {data,refetch}=useQuery({
    queryKey:['products'],
    queryFn:getProducts
  })

  return {data,refetch}
}
