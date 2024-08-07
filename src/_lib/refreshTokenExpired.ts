'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RefreshTokenExpired = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('refreshTokenExpired 함수 시작점 도달 성공');
    useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
    localStorage.clear();
    console.log("로컬은 초기화 완료했고 로그인 페이지로 이동하기 전 콘솔")
    router.replace('/login');
  }, [router]);

  return null;
};

export default RefreshTokenExpired;
