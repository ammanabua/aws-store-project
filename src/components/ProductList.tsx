import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card'

const ProductList = () => {
  interface Product {
    ProductId: string;
    Name: string;
    Desc: string;
    Price: number;
    Quantity: number;
  }

  const [data, setData] = useState<Product[]>([]);
  async function getData(){
    try {
      const res = await axios.get("https://c8wz11p0zk.execute-api.us-east-1.amazonaws.com/dev/products");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const Loader = () => {
    return (
      <div className='w-full h-[120px] flex items-center justify-center'>
        <h1 className='text-center'>Loading...</h1>
      </div>
    )
  }
  return (
    <div className='w-full gap-4 p-4 rounded-lg'>
      <p className='text-white font-bold text-xl'>Products List</p>
      <div className='grid grid-cols-4 gap-6'>
        {!data ? <Loader /> : data && data.map(item => (
            <Card key={item.ProductId} id={item.ProductId} name={item.Name} desc={item.Desc} price={item.Price} quantity={item.Quantity} />
        ))}
      </div>

    </div>
  )
}

export default ProductList