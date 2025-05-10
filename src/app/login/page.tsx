'use client';

import { SiGoogle, SiNaver } from 'react-icons/si';
import { useEffect } from 'react';
import LoadingFull from '@/components/LoadingFull';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from './store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Login_Mobile from './mobile/LoginMobile';
import Image from 'next/image';
import kakaoIcon from '../../../public/svg/login/kakaoIcon.svg';
import getNaverURL from '@/api/login/getNaverURL';
import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';

export default function Login() {
  const { isLogin } = useAuthStore();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
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
    if (isLogin) router.push('/home');
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
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  VS.GG
                </div>
              </div>
              <div onClick={GoogleLogin} className='cursor-pointer'>
                <div className='mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 w-[452px] h-[44px]'>
                  <SiGoogle color='white' />
                  <button className='text-white'>구글로 로그인</button>
                </div>
              </div>
              <div onClick={NaverLogin} className='cursor-pointer'>
                <div className='mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 w-[452px] h-[44px]'>
                  <SiNaver color='white' />
                  <button className='text-white'>네이버로 로그인</button>
                </div>
              </div>
              <div onClick={KakaoLogin} className='cursor-pointer'>
                <div className='flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 w-[452px] h-[44px]'>
                  <Image src={kakaoIcon} width={17} height={16} alt='카카오아이콘' />
                  <button className='text-white'>카카오톡으로 로그인</button>
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
