'use client'

import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const Spinner= ({loading}) => {
  return (
    <div className='h-screen flex justify-center items-center'>
    <MoonLoader 
    color='#3b82f6'
    loading={loading}
    size={80}
    aria-label="Loading Spinner"

     />
    
    </div>
  )
}

export default Spinner