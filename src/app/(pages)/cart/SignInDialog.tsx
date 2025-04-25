import { Dialog, DialogPanel, DialogTitle, Transition, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}


const SignInDialog = ({ isOpen, onClose }: SignInDialogProps) => {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
    
    const [msg, setMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target; 
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleSignIn = async (username: string, password: string) => {      
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
            {
                action: 'login',
              username,
              password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          const { message, idToken } = response.data;
          console.log(response.data.idToken);
          localStorage.setItem('token', response.data.idToken);
          return { success: true, message, idToken }
        } catch (error: unknown) {
          const errMsg = axios.isAxiosError(error) && error.response?.data?.error 
            ? error.response.data.error 
            : 'Login failed';
          return { success: false, message: errMsg };
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const result = await handleSignIn(formData.username, formData.password);
            if (result.success) {
                console.log('Login successful:', result.idToken);
                setMsg(result.message);
            } else {
                setMsg(result.message);
            }
        }

    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
        <Transition show={isOpen}>
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        </Transition>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition show={isOpen}>
            <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
              
              {/* STEP 1: Enter Loan Amount */}
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <h2 className='text-black font-semibold'>Sign In</h2>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm text-gray-500' htmlFor='username'>Username</label>
                    <input type="text" placeholder="Username" name='username' onChange={handleChange} value={formData.username} required className='border border-gray-400 rounded-lg text-black p-2' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm text-gray-500' htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password} required className='border border-gray-400 rounded-lg text-black p-2' />
                </div>
                <button type="submit" className='bg-green-600 rounded-lg py-2 cursor-pointer'>Login</button>
                <p className='text-red-400 text-sm font-light'>{msg}</p>
              </form>
              <p className='text- text-gray-500'>Don&apos;t have an account? <span className='font-semibold text-blue-600 underline underline-offset-2'><Link href="/">Sign up</Link></span></p>
          </DialogPanel>
          </Transition>
        </div>
      </Dialog>
    )
  }

  export default SignInDialog;