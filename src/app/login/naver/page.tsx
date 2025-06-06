'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import getSocialLogin from '@/api/login/getSocialLogin';

export default function Naver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { mutate: login } = useMutation({
    mutationFn: () => getSocialLogin(code!, 'naver'),
    mutationKey: ['login'],
    onSuccess: (data) => {
      if (data.resultCode === 409) {
        useAuthStore.setState({
          user: { email: data.email, nickname: '', profile_image: data.profileImage, socialLoginType: "NAVER" },
        }),
          router.push('/signUp');
      } else if (data.resultCode === 200) {
        useAuthStore.setState({
          isLogin: true,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: { email: data.email, nickname: data.nickname, profile_image: data.profileImage, socialLoginType: "NAVER" },
        });
        router.push('/home');
      }
    },
  });

  useEffect(() => {
    login();
  }, []);

  return (
    <div className='flex flex-grow flex-column h-[100vh] justify-center items-center'>
      <h1>네이버 로그인 중...</h1>
    </div>
  );
}
