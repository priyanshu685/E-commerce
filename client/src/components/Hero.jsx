import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141] text-center px-6 sm:px-10'>
                <div className='flex items-center gap-2'>
                    {/* <p className='w-14 md:w-15 h-[1px] bg-[#414141]'></p>
                    <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p> */}
                </div>
                <h1 className= 'text-2xl sm:py-3 lg:text-5xl leading-relaxed'>Premium Confections Delivered to Your Doorstep </h1>
                <div className='flex items-center gap-2'>
                    {/* <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-14 md:w-15 h-[1px] bg-[#414141]'></p> */}
                </div>
                <button className='mt-6 px-6 py-2 bg-[#a0522d] text-white font-semibold rounded-full shadow hover:bg-[#8b4513] transition duration-100'>Shop Now</button>
            </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero
