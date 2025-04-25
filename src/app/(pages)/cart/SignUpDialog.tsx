import { Dialog, DialogPanel, Transition, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react';
import Link from 'next/link';

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}


const SignUpDialog = ({ isOpen, onClose }: SignInDialogProps) => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    const [msg, setMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target; 
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            setMsg("Passwords do not match");
            return;
        }
    
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            }),
        });

        const data = await res.json();
        setMsg(data.message || data.error);
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
              <form onSubmit={handleSignup} className='flex flex-col gap-4 w-full'>
                <h2 className='text-black font-semibold'>Sign Up</h2>
                <input type="text" placeholder="Username" name='username' onChange={handleChange} value={formData.username} required className='border border-gray-400 rounded-lg text-black p-2' />
                <input type="email" placeholder="Email" name='email' onChange={handleChange} value={formData.email} required className='border border-gray-400 rounded-lg text-black p-2' />
                <input type="password" placeholder="Password" name='password' onChange={handleChange} value={formData.password} required className='border border-gray-400 rounded-lg text-black p-2' />
                <input type="password" placeholder="Re-enter password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required className='border border-gray-400 rounded-lg text-black p-2' />
                <button type="submit" className='bg-green-600 rounded-lg py-2'>Sign Up</button>
                <p>{msg}</p>
              </form>
              <p className='text- text-gray-500'>Already have an account? <span className='font-semibold text-blue-600 underline underline-offset-2'><Link href="/">Sign in</Link></span></p>
          </DialogPanel>
          </Transition>
        </div>
      </Dialog>
    )
  }

  export default SignUpDialog;