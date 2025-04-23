import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

const Header = () => {
  const quantity = useSelector(state => state.cart.items.length)

  return (
    <div className='flex items-center justify-end w-full p-4 mx-auto bg-[#1A1A1A] text-white sticky top-0 z-50'>
        <Link href="/cart" passHref className='p-3 bg-[#EC770A] rounded-full'>
            <div className="relative cursor-pointer">
                <ShoppingCart size={36} className='' color='#fff' />
                <div className="absolute -top-[3px] -right-[5px] h-[15px] w-[15px] rounded-full bg-white p-2 flex items-center justify-center font-bold text-[12px] text-black">{quantity}</div>
            </div>
        </Link>
    </div>
  )
}

export default Header