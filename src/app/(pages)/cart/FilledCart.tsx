import { useState } from 'react'
import { getToken } from '@/lib/useAuth';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';
import { RootState } from '@/redux/store'; // Import the RootState type
import   { CartItem }   from '@/redux/cartSlice'; // Import the CartItem type
import SignInDialog from './SignInDialog';
import Image from 'next/image';


interface OrderResponse {
    message?: string;
    [key: string]: unknown;
  }

const FilledCart = () => {
    const [isOpen, setIsOpen] = useState(false)
    const cart = useSelector((state: RootState) => state.cart) as { items: ( CartItem)[] };
    const dispatch = useDispatch();

    const [creatingOrder, setCreatingOrder] = useState(false);
    const [response, setResponse] = useState<OrderResponse | null>(null);

    const handleReset = () => {
        dispatch(clearCart());
    };
    
    const checkout = async () => {
    const token = getToken();
    if (!token) {
        setIsOpen(true); // open sign-in modal
        return;
    }
    
    try {
        setCreatingOrder(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart.items }), // send actual cart items
        });
    
        const data: OrderResponse = await res.json();
        setResponse(data);
        console.log('Order created!');
        handleReset();
    } catch (error) {
        console.error("Error creating order:", error);
        setResponse({ message: "Error occurred" });
    } finally {
        setCreatingOrder(false);
    }
    };
    
    


    // const createOrder = async () => {
    //     const token = getToken();
    //     if(!token){
    //       console.error("User is not logged in")
    //       login('/cart');
    //       return;
    //     }
    
    //     try {
    //       setCreatingOrder(true);
    //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
    //         method: 'POST',
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ item: 'Pizza' }),
    //       });
    
    //       const data: OrderResponse = await res.json();
    //       setResponse(data);
    //       console.log('Order Created!')
    //     } catch (error) {
    //       console.error("Error creating order:", error);
    //       setResponse({ message: "Error occurred" });
    //     }
    //   }

  return (
    <>
        <SignInDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <table className="w-full max-w-[800px] rounded-xl bg-white">
              <thead>
                  <tr className="bg-[#EC770A] text-white">
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total ($)</th>
                  </tr>
              </thead>
              <tbody>
                    {cart.items.map((product: CartItem) => (
                      <tr className="text-black" key={product.id}>
                        <td>
                          <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                            <Image className="rounded-xl" src={product.image || "/indos.png"} width={50} height={50} alt="" />
                          </div>
                        </td>
                        <td>
                          <span className="flex justify-center">{product.name}</span>
                        </td>
                        <td>
                          <span className="flex justify-center">{product.price}</span>
                        </td>
                        <td>
                          <span className="flex justify-center">{product.quantity}</span>
                        </td>
                        <td>
                          <span className="flex justify-center font-bold">{product.price * product.quantity}</span>
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-green-600 text-white font-bold">
                      <td colSpan={4} className="text-center">Total</td>
                      <td className="text-center">{cart.items.reduce((acc, product) => acc + product.price * product.quantity, 0)}</td>
                    </tr>
              </tbody>
          </table>
          <Link href="/products" className='text-center text-lg hover:text-[#EC770A] hover:underline hover:underline-offset-2'>
              Continue Shopping
          </Link>
          <div className='flex items-center justify-center gap-4 w-full max-w-[600px] mb-[20px]'>
            <button className='p-2 bg-red-800 text-white rounded hover:bg-[#EC770A]/80' onClick={handleReset}>
              Clear Cart
            </button>
            <button className='p-2 bg-green-600 text-white rounded hover:bg-[#EC770A]/80' onClick={checkout} disabled={creatingOrder}>
              {creatingOrder ? "Creating Order..." : "Checkout"}
            </button>
          </div>
          <pre className="mt-4">{response && JSON.stringify(response, null, 2)}</pre>
      </div>
    </>
  )
}

export default FilledCart