import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

const CardProduct = ({data}) => {
  return (
    <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white '>
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
        <img 
                src={data.image[0]}
                className='w-full h-full object-scale-down lg:scale-125'
            />
      </div>

      <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-100'>
        10 min
      </div>

      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>

      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit}
      </div>

    <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
      <div className='flex items-center gap-1'>
        <div className='font-semibold'>
            {DisplayPriceInRupees(data.price)}
        </div>
      </div>
          
        <div className=''>
            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded'>
                Add
            </button>
        </div>
    </div>

    </div>
  )
}

export default CardProduct