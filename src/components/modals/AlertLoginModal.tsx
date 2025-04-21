import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';
import getNaverURL from '@/api/login/getNaverURL';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SiGoogle, SiNaver } from 'react-icons/si';
import kakaoIcon from '../../../public/svg/login/kakaoIcon.svg';
import Image from 'next/image';

function AlertLoginModal() {
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
    <div>
      {!isLoading && (
        <>
          <div
            className='flex flex-col relative bg-white w-[674px] min-h-[310px] rounded-[18px] py-[80px] gap-[50px] px-[100px]'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col gap-[40px] justify-center items-center'>
              <div className='flex flex-col gap-[8px] justify-center items-center'>
                <p className='font-semibold text-[25px] text-[#333333]'>
                  VS.GG를 이용하려면 로그인이 필요해요.
                </p>
                <p className='text-[#999999] text-[20px] font-medium whitespace-nowrap'>
                  간편하게 로그인하고 모든 기능을 자유롭게 이용해보세요!
                </p>
              </div>
              <div className='flex flex-col gap-[15px]'>
                <div onClick={GoogleLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
                    <SiGoogle color='white' />
                    <button className='text-white whitespace-nowrap'>구글로 시작</button>
                  </div>
                </div>
                <div onClick={NaverLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
                    <SiNaver color='white' />
                    <button className='text-white whitespace-nowrap'>네이버로 시작</button>
                  </div>
                </div>
                <div onClick={KakaoLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
                    <Image src={kakaoIcon} width={17} height={16} alt='카카오아이콘' />
                    <button className='text-white whitespace-nowrap'>카카오톡으로 시작</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AlertLoginModal;
