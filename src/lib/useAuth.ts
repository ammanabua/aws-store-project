// lib/useAuth.js
import { useRouter } from 'next/router';
import { encode } from 'punycode';
import { useEffect } from 'react';

const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!;

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
