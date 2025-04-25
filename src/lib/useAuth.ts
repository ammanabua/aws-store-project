// lib/useAuth.js
import { useRouter } from 'next/router';
import { encode } from 'punycode';
import { useEffect } from 'react';

const domain = 'us-east-1brzthbmt8.auth.us-east-1.amazoncognito.com';
const clientId = '6sm7j2a6770kf8ecnjkpist5o7';
const redirectUri = 'https://main.d31dw6myi9bt2x.amplifyapp.com//auth';

export const login = (redirectPath: string = '/cart') => {
  const loginUrl = `https://${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid+phone&redirect_uri=${redirectUri}&state=${encode(redirectPath)}`;
  
  if (typeof window !== 'undefined') {
    window.location.href = loginUrl;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    window.location.href = '/products'; // Redirect to products page after logout
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Optional: hook to enforce auth
export const useRequireAuth = (): void => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      login();
    }
  }, [router]);
};
