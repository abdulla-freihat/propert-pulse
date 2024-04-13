'use client'

import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const LoadingPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
    <MoonLoader 
    color='#3b82f6'
    size={80}
    aria-label="Loading Spinner"

     />
    
    </div>
  )
}

export default LoadingPage