'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };

  const handleUpload = async () => {
    if (!file || !email) {
      setMessage('Please select a file and enter your email.');
      return;
    }

    try {
      const filename = encodeURIComponent(file.name);
      const contentType = file.type;

      // Send POST request to API Gateway
      const response = await axios.post(
        process.env.REACT_APP_API_URL || 'https://c8wz11p0zk.execute-api.us-east-1.amazonaws.com/dev/images',
        { filename, contentType, email }
      );

      const { uploadURL } = response.data;
      console.log(uploadURL, response.data);
      // Upload the file to S3 using the pre-signed URL
      await axios.put(uploadURL, file, {
        headers: { 'Content-Type': file.type },
      });

      setMessage('Upload successful!');


    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className='flex w-full h-screen justify-center'>
        <div className='flex flex-col gap-4 items-center justify-center w-full h-full'>
            <h2 className='text-2xl font-bold text-center my-4'>Create a new product</h2>
            <form action="" className='flex flex-col gap-4 items-center'>
              <div className='flex gap-4 items-center justify-center'>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                <p>{message}</p>
              </div>
              <div className='flex flex-col gap-4 items-center'>
                  <input type="text" placeholder='Product Name' className='border border-1 border-blue-600 p-2 rounded-lg w-[400px]' />
                  <input type="text" placeholder='Product Description' className='border border-1 border-blue-600 p-2 rounded-lg w-[400px]' />
                  <input type="number" placeholder='Product Price' className='border border-1 border-blue-600 p-2 rounded-lg w-[400px]' />
                  <input type="text" placeholder='Product Category' className='border border-1 border-blue-600 p-2 rounded-lg w-[400px]' />
              </div>
              <button type="submit" className='bg-[#EC770A] text-white p-2 rounded-lg mt-4'>Create Product</button>
            </form>
            <input className='border border-1 border-blue-600 p-2 rounded-lg w-[400px]'
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <Link href="/products" className='text-[#EC770A] p-2 rounded-lg'>Go to Products</Link>
        </div>

    </div>
  );
};

export default ImageUploader;
