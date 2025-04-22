'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

const Card = () => {

  const router = useRouter();
  return (
    <div className="border border-1 border-blue-600 p-4 rounded-xl w-[350px] space-y-4 bg-white">
      <Link href="/products/123" className='flex items-center justify-center'>
        <Image src="/indos.png" width={200} height={50} alt="name" className='m-auto' />
      </Link>
      <div className='flex items-center justify-between'>
        <h3 className='text-black font-semibold'>Fried Rice</h3>
        <p className='text-2xl text-black'>$34</p>
      </div>
      <p className='text-[#808080]'>Delicious charcoal stove cooked fried rice</p>
      <div className=''>
        <input type="number" className='bg-white rounded-lg text-black p-2 w-24 border border-black' />
      </div>
      <div className='flex items-center justify-center gap-2'>
        <button className='bg-green-700 p-2 rounded-lg w-full cursor-pointer'>Add to Cart</button>
        <button onClick={() => router.push('/products/123')} className='border border-1 p-2 rounded-lg w-full cursor-pointer bg-[#EC770A]'>Buy Now</button>
      </div>
    </div>
  )
}

export default Card