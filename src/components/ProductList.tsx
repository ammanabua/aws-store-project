import React from 'react'
import Card from './Card'

const ProductList = () => {
  return (
    <>
      <div className='w-full gap-4 p-4 rounded-lg'>
        <p className='text-white font-bold text-xl'>Products List</p>
        <Card/>
      </div>
    </>
  )
}

export default ProductList