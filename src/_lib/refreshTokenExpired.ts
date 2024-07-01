'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';

const RefreshTokenExpired = () => {
  const router = useRouter();
  useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
  localStorage.clear();
  router.push('/login');
};

export default RefreshTokenExpired;
