import React from 'react'
import Link from 'next/link'
import { Home, ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store' // Import the RootState type
import { getToken } from '@/lib/useAuth';



const Header = () => {
  const quantity = useSelector((state: RootState) => state.cart.items.length) as number;

  const token = getToken(); // Get the token from local storage or state

  const handleLogout = () => {
    localStorage.removeItem('token');

    window.location.href = '/';
  }

  return (
    <div className='flex items-center justify-between w-full p-4 px-6 mx-auto bg-[#1A1A1A] text-white sticky top-0 z-50'>
        <Link href="/" className='text-lg font-semibold text-[#EC770A] hover:text-[#EC770A]/80'>
          <Home size={36} className='mr-2' color='#EC770A' />
        </Link>
        {token && (
          <div>
            Signed in!

            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
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