'use client'
import ProductList from '@/components/ProductList'
import { useState } from 'react'


const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  return (
    
      <div className='w-full min-h-screen p-8 pb-20 gap-8 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
        <h1 className='text-center text-3xl text-[#EC770A] my-4'>Find the best products in the area...</h1>

        <div className='flex items-center justify-center gap-4 w-full max-w-[600px] mb-[20px] m-auto'>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for products...' className='w-full max-w-[400px] p-2 border border-[#fff] rounded' />
            <button className='p-2 bg-[#EC770A] text-white rounded hover:bg-[#EC770A]/80'>Search</button>
        </div>
        <ProductList searchTerm={searchTerm} />
    </div>
  )
}

export default Page