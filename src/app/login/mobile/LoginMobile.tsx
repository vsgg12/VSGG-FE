'use client';

import { SiGoogle, SiNaver } from 'react-icons/si';
import { useEffect } from 'react';
import LoadingFull from '@/components/LoadingFull';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import kakaoIcon from '../../../../public/svg/login/kakaoIcon.svg';
import Image from 'next/image';
import getNaverURL from '@/api/login/getNaverURL';
import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';

export default function Login_Mobile() {
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

  return (
    <div className='flex h-screen flex-col items-center justify-center mobile-layout'>
      {isLoading ? (
        <LoadingFull />
      ) : (
        <>
          <div className="mb-[131px] mt-auto font-['SBAggroB'] text-5xl text-[#8A1F21]">
            <div
              className='cursor-pointer'
              onClick={() => {
                router.push('/');
              }}
            >
              VS.GG
            </div>
          </div>
          <div onClick={GoogleLogin}>
            <div className='mb-5 flex items-center justify-center gap-2 rounded-[50px] bg-black min-w-[350px] h-[44px] cursor-pointer'>
              <SiGoogle color='white' />
              <button className='text-white font-bold whitespace-nowrap text-[20px]'>
                구글로 로그인
              </button>
            </div>
          </div>
          <div onClick={NaverLogin}>
            <div className='mb-5 flex items-center justify-center gap-2 rounded-[50px] bg-black min-w-[350px] h-[44px] cursor-pointer'>
              <SiNaver color='white' />
              <button className='text-white font-bold whitespace-nowrap text-[20px]'>
                네이버로 로그인
              </button>
            </div>
          </div>
          <div onClick={KakaoLogin}>
            <div className='flex items-center justify-center gap-2 rounded-[50px] bg-black min-w-[350px] h-[44px] cursor-pointer'>
              <Image src={kakaoIcon} width={17} height={16} alt='카카오아이콘' />
              <button className='text-white font-bold whitespace-nowrap text-[20px]'>
              카카오톡으로 로그인
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
