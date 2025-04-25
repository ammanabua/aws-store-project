import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card'

interface Product {
  productId: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  category: string;
}

interface ProductListProps {
  searchTerm: string;
}

const ProductList = ({ searchTerm }: ProductListProps) => {

  const [data, setData] = useState<Product[]>([]);
  
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  async function getData(){
    try {
      const res = await axios.get("https://t0jtno2bbe.execute-api.us-east-1.amazonaws.com/dev/products");
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const filtered = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const Loader = () => {
    return (
      <div className='w-full h-[120px] flex items-center justify-center'>
        <h1 className='text-center'>Loading...</h1>
      </div>
    )
  }
  return (
    <div className='w-full gap-4 p-4 rounded-lg max-w-[1200px] m-auto flex flex-col items-center justify-center'>
      <p className='text-white font-bold text-xl'>Products List</p>
      <div className='grid grid-cols-4 gap-6'>
        {!filteredData ? <Loader /> : filteredData && filteredData.map(item => (
            <Card key={item.productId} id={item.productId} name={item.name} desc={item.desc} category={item.category} price={item.price} quantity={item.quantity} />
        ))}
      </div>
    </div>
  )
}

export default ProductList