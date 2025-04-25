// pages/auth/callback.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const state = params.get('state');

    if (token) {
      localStorage.setItem('access_token', token);
      const redirectTo = state ? decodeURIComponent(state) : '/';
      router.push(redirectTo); // redirect to home or wherever you need
    } else {
      console.error('Token not found in callback');
    }
  }, [router]);

  return <p>Logging in...</p>;
}
