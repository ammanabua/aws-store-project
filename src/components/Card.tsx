'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/redux/cartSlice'

interface CardProps {
  id: string;
  name: string;
  desc: string;
  category: string;
  price: number;
  quantity: number;
}


const Card = ({ id, name, desc, price, }: CardProps) => {
  
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addProduct({ 
      id,
      name, 
      price, 
      quantity,
    }))  
  }

  const router = useRouter();

  return (
    <div className="flex flex-col justify-between border border-1 border-blue-600 p-4 rounded-xl bg-white">
      <Link href={`/products/${id}`} className='flex items-center justify-center'>
        <Image src="/indos.png" width={100} height={10} alt="name" className='' />
      </Link>
      <div className='flex items-center justify-between'>
        <h3 className='text-black font-semibold text-sm'>{name}</h3>
        <p className='text-md text-black'>$ {price}</p>
      </div>
      <p className='text-[#808080] text-sm'>{desc}</p>
      <div className=''>
        <input type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity} className='bg-white rounded-lg text-black px-2 w-12 border border-black' />
      </div>
      <div className='bottom-0 flex items-center justify-center gap-2 mt-4'>
        <button onClick={handleAddToCart} className='bg-green-700 p-2 rounded-lg w-full cursor-pointer text-sm'>+ Cart</button>
        <button onClick={() => router.push(`/products/${id}`)} className='border border-1 p-2 rounded-lg w-full cursor-pointer bg-[#EC770A] text-sm'>Buy Now</button>
      </div>
    </div>
  )
}

export default Card