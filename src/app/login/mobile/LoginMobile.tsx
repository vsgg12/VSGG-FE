'use client';

import { useQuery } from '@tanstack/react-query';
import getNaverURL from '@/api/login/getNaverURL';
import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';
import LoadingFull from '@/components/LoadingFull';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import LoginModalHeader from '@/components/modals/login/header/LoginModalHeader';
import LoginModalContent from '@/components/modals/login/content/LoginModalContent';
import LoginModalFooter from '@/components/modals/login/footer/LoginModalFooter';
import { useEffect, useState } from 'react';

export default function Login_Mobile() {
  const [mounted, setMounted] = useState(false);
  const { isLogin } = useAuthStore();
  const router = useRouter();

  const { data: NAVER_AUTH_URL, isLoading } = useQuery({
    queryKey: ['NAVER_URL'],
    queryFn: async () => getNaverURL(),
  });
  const { data: GOOGLE_AUTH_URL } = useQuery({
    queryKey: ['GOOGLE_URL'],
    queryFn: () => getGoogleURL(),
  });
  const { data: KAKAO_AUTH_URL } = useQuery({
    queryKey: ['KAKAO_URL'],
    queryFn: () => getKakaoURL(),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);

  const NaverLogin = () => {
    if (NAVER_AUTH_URL) {
      window.location.href = NAVER_AUTH_URL.loginUrl;
    }
  };

  const GoogleLogin = () => {
    if (GOOGLE_AUTH_URL) {
      window.location.href = GOOGLE_AUTH_URL.loginUrl;
    }
  };

  const KakaoLogin = () => {
    if (KAKAO_AUTH_URL) {
      window.location.href = KAKAO_AUTH_URL.loginUrl;
    }
  };

  if (!mounted) return null;

  return (
    <div className='flex h-screen flex-col items-center justify-center px-[24px] bg-white'>
      {isLoading ? (
        <div className='flex h-screen items-center justify-center bg-white'>
          <div className='loader2'></div>
        </div>
      ) : (
        <div className='flex flex-col gap-[40px] w-full justify-center items-center'>
          <LoginModalHeader />
          <LoginModalContent />
          <LoginModalFooter
            onClickGoogleLogin={GoogleLogin}
            onClickNaverLogin={NaverLogin}
            onClickKakaoLogin={KakaoLogin}
          />
        </div>
      )}
    </div>
  );
}