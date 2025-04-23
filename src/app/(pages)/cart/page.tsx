'use client'
import React from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, } from '@/redux/cartSlice';

// Define the Product type
type Product = {
  _id: string;
  url: string;
  name: string;
  price: number;
  quantity: number;
};
import Image from 'next/image';




const Cart = () => {


  const FilledCart = () => (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <table className="w-full max-w-[800px] rounded-xl bg-white">
              <thead>
                  <tr className="bg-[#EC770A] text-white">
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                    {cart.items.map((product: Product) => (
                      <tr className="text-black" key={product._id}>
                        <td>
                          <div className="relative w-[100px] h-[100px]">
                            <Image className="rounded-xl" src={product.url} layout="fill" objectFit="cover" alt="" />
                          </div>
                        </td>
                        <td>
                          <span className="">{product.name}</span>
                        </td>
                        <td>
                          <span className="">{product.price}</span>
                        </td>
                        <td>
                          <span className="">{product.quantity}</span>
                        </td>
                        <td>
                          <span className="">{product.price * product.quantity}</span>
                        </td>
                      </tr>
                    ))}
              </tbody>
          </table>
          <Link href="/products" className='text-center text-lg hover:text-[#EC770A] hover:underline hover:underline-offset-2'>
              Continue Shopping
          </Link>
          <div className='flex items-center justify-center gap-4 w-full max-w-[600px] mb-[20px]'>
            <button className='p-2 bg-red-800 text-white rounded hover:bg-[#EC770A]/80' onClick={handleReset}>
              Clear Cart
            </button>
            <button className='p-2 bg-green-600 text-white rounded hover:bg-[#EC770A]/80' onClick={handleReset}>
              Create Order
            </button>
          </div>
      </div>
    </>
  ) 

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log("Proceeding to checkout...");
  };


  console.log(cart)
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