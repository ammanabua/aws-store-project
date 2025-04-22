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
        <Link href="/cart" passHref className='p-3 bg-[#EC770A] rounded-full'>
            <div className="relative cursor-pointer">
                <ShoppingCart size={36} className='' color='#fff' />
                <div className="absolute -top-[3px] -right-[5px] h-[15px] w-[15px] rounded-full bg-white p-2 flex items-center justify-center font-bold text-[12px] text-black">2</div>
            </div>
        </Link>
        <div className='w-full p-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]'>
            
        </div>
        <ProductList />
    </div>
  )
}

export default page