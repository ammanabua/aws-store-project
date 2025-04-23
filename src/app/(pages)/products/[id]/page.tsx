'use client'
import Image from "next/image"
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/cartSlice";
import Link from "next/link";


interface Food {
  title: string;
  price: number;
  desc: string;
  url: string;
}

const food: Food[] = [
  { title: "Moi Moi Rice", 
    price: 2000, 
    desc: "Delicious jollof rice with chicken",
    url: "/img/jollof.jpg"
  },
  { title: "Fried Rice", 
    price: 2500,
    desc: "Delicious fried rice with chicken",
    url: "/img/friedrice.jpg"
  }, 
  { title: "Noodles", 
    price: 1500,
    desc: "Delicious noodles with chicken",
    url: "/img/noodles.jpg"
  },
]


const Product = () => {

    const [price, setPrice] = useState(food[0].price);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();



    const handleClick = () => {
      console.log("clicked");
        dispatch(addProduct({ 
          id: "1", 
          name: food[0].title, 
          price, 
          quantity,
        }))
    };
    

  return (
    <div className="w-[80%] pt-[40px] m-auto">
      <div className="border border-1 border-yellow-300 flex justify-center items-center py-24 rounded-xl w-full max-w-[800px] m-auto">
          <div className="w-full flex justify-center items-center">
              <Image src='/indos.png' alt="" objectFit="contain" width={250} height={100} />
          </div>
        <div className="flex flex-col items-center justify-start w-full gap-4">
            <h1 className="text-lg font-semibold">{food[0].title}</h1>
            <span className="text-3xl text-green-600">$ {food[0].price}</span>
            <p className="font-sm text-[#808080]">{food[0].desc}</p>
      
          
            <div className="flex gap-4">
                <input 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} type="number" 
                  value={quantity} 
                  className="border border-1 border-[#EC770A] rounded-lg p-2 w-[100px] text-center" 
                />
                <button className="bg-[#EC770A] p-2 rounded-lg px-6" onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
      </div>
      <Link href='/products' className="flex items-center justify-center gap-2 mt-4 p-2 text-[#EC770A] rounded-lg w-[200px] m-auto font-semibold hover:underline hover:underline-offset-2">
        Shop more products
      </Link>
    </div>
  )
};

export default Product