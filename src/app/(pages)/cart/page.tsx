'use client'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';

import FilledCart from './FilledCart';

import { RootState } from '@/redux/store';




const Cart = () => {
  
  const cart = useSelector((state: RootState) => state.cart);
  const EmptyCart = () => {


    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
          <h1 className='text-center text-3xl text-[#EC770A]'>Your cart is empty!</h1>
          <p className='text-center text-lg'>Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className='text-center text-lg hover:text-[#EC770A] hover:underline hover:underline-offset-2'>Start shopping now!</Link>
      </div>
    )
  
  }


  return (
    <div>
      {!cart.items.length ? (<EmptyCart />) : (<FilledCart />)}
    </div>
  )
}

export default Cart