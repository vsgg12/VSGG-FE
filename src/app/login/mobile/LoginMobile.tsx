'use client';

import { SiNaver } from 'react-icons/si';
import { useEffect } from 'react';
import LoadingFull from '@/components/LoadingFull';
import { useQuery } from '@tanstack/react-query';
import getNaverURL from '@/api/naver/getNaverURL';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore'

export default function Login_Mobile() {
  const { isLogin } = useAuthStore.getState();
  const router = useRouter();

  const { data: NAVER_AUTH_URL, isLoading } = useQuery({
    queryKey: ['NAVER_URL'],
    queryFn: async () => getNaverURL(),
  });

    useEffect(() => {
      if (isLogin) {
          router.push('/');
      }
    }, [isLogin, router]);

  const NaverLogin = () => {
    if (NAVER_AUTH_URL) {
      window.location.href = NAVER_AUTH_URL.naverLoginUrl;
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center mobile-layout'>
      {isLoading ? (
        <LoadingFull />
      ) : (
        <>
          <div className="mb-[131px] mt-auto font-['SBAggroB'] text-5xl text-[#8A1F21]">
            <div>VS.GG</div>
          </div>
          <div onClick={NaverLogin} className='cursor-pointer'>
            <div className='flex items-center justify-center gap-2 rounded-[50px] bg-black min-w-[350px] h-[44px]'>
              <SiNaver color='white' />
              <button className='text-white font-bold whitespace-nowrap text-[20px]'>
                네이버로 3초만에 시작하기
              </button>
            </div>
          </div>
          <div className='mb-[50px] mt-auto flex gap-5'>
            <div>이용약관</div>
            <div className='text-gray-400'>개인정보처리방침</div>
          </div>
        </>
      )}
    </div>
  );
}
