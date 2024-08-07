'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RefreshTokenExpired = () => {
  const router = useRouter();

  useEffect(() => {
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    router.replace('/login');
  }, [router]);

  return null;
};

export default RefreshTokenExpired;
