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
    <div className="flex flex-col border border-1 border-blue-600 p-4 rounded-xl w-[350px] space-y-4 bg-white">
      <Link href="/products/123" className='flex items-center justify-center'>
        <Image src="/indos.png" width={150} height={10} alt="name" className='m-auto' />
      </Link>
      <div className='flex items-center justify-between'>
        <h3 className='text-black font-semibold'>{name}</h3>
        <p className='text-2xl text-black'>$ {price}</p>
      </div>
      <p className='text-[#808080]'>{desc}</p>
      <div className=''>
        <input type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity} className='bg-white rounded-lg text-black p-2 w-24 border border-black' />
      </div>
      <div className='flex items-center justify-center gap-2'>
        <button onClick={handleAddToCart} className='bg-green-700 p-2 rounded-lg w-full cursor-pointer'>Add to Cart</button>
        <button onClick={() => router.push(`/products/${id}`)} className='border border-1 p-2 rounded-lg w-full cursor-pointer bg-[#EC770A]'>Buy Now</button>
      </div>
    </div>
  )
}

export default Card