import ProductList from '@/components/ProductList'
import Link
 from 'next/link'
import { ShoppingCart } from 'lucide-react'

const page = () => {
  return (
    
      <div className='flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <h1 className='text-center text-3xl text-[#EC770A]'>Find the best food in the area...</h1>

        <div className='flex items-center justify-center gap-4 w-full max-w-[600px] mb-[20px]'>
            <input type="text" placeholder='Search for products...' className='w-full max-w-[400px] p-2 border border-[#fff] rounded' />
            <button className='p-2 bg-[#EC770A] text-white rounded hover:bg-[#EC770A]/80'>Search</button>
        </div>
        <ProductList />
    </div>
  )
}

export default page