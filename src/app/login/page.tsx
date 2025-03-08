'use client';

import { SiNaver } from 'react-icons/si';
import { useEffect } from 'react';
import LoadingFull from '@/components/LoadingFull';
import { useQuery } from '@tanstack/react-query';
import getNaverURL from '@/api/naver/getNaverURL';
import { useAuthStore } from './store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Login_Mobile from './mobile/LoginMobile';

export default function Login() {
  const { isLogin } = useAuthStore();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { data: NAVER_AUTH_URL, isLoading } = useQuery({
    queryKey: ['NAVER_URL'],
    queryFn: async () => getNaverURL(),
  });

  useEffect(() => {
    if (isLogin) router.push('/home');
  }, [isLogin, router]);

  const NaverLogin = () => {
    if (NAVER_AUTH_URL) {
      window.location.href = NAVER_AUTH_URL.naverLoginUrl;
    }
  };

  return (
    <>
      {isMobile ? (
        <Login_Mobile />
      ) : (
        <div className='flex h-screen flex-col items-center justify-center'>
          {isLoading ? (
            <LoadingFull />
          ) : (
            <>
              <div className="mb-10 mt-auto font-['SBAggroB'] text-5xl text-[#8A1F21] md:text-8xl">
                <div className="cursor-pointer" onClick={()=> {router.push("/")}}>VS.GG</div>
              </div>
              <div onClick={NaverLogin} className='cursor-pointer'>
                <div className='mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
                  <SiNaver color='white' />
                  <button className='text-white'>네이버로 3초만에 시작하기</button>
                </div>
              </div>
              <div className='mb-20 mt-auto flex gap-5'>
                <div>이용약관</div>
                <div className='text-gray-400'>개인정보처리방침</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
