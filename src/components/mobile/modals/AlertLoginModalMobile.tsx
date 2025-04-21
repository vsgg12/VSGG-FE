import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';
import getNaverURL from '@/api/login/getNaverURL';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SiGoogle, SiNaver } from 'react-icons/si';
import kakaoIcon from '../../../../public/svg/login/kakaoIcon.svg';
import Image from 'next/image';

function AlertLoginModal_Mobile() {
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
            className='flex flex-col relative bg-white w-[305px] min-h-[399px] rounded-[30px] py-[80px] gap-[50px] '
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col gap-[30px] justify-center items-center'>
              <div className='flex flex-col gap-[8px] justify-center items-center'>
                <div className='font-bold flex text-center flex-col text-[25px] text-[#333333]'>
                  <p>VS.GG를 이용하려면</p>
                  <p>로그인이 필요해요.</p>
                </div>
                <div className='text-[#555555] flex text-center flex-col justify-center text-[20px] font-medium'>
                  <p>간편하게 로그인하고</p>
                  <p>모든 기능을</p>
                  <p>자유롭게 이용해보세요!</p>
                </div>
              </div>
              <div className='flex flex-col gap-[15px]'>
                <div onClick={GoogleLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-[5px] rounded-[30px] bg-black p-2 w-[222px] h-[50px]'>
                    <SiGoogle color='white' />
                    <button className='text-white whitespace-nowrap text-[20px] font-extrabold'>
                      구글로 시작
                    </button>
                  </div>
                </div>
                <div onClick={NaverLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-[5px] rounded-[30px] bg-black p-2 w-[222px] h-[50px]'>
                    <SiNaver color='white' />
                    <button className='text-white whitespace-nowrap text-[20px] font-extrabold'>
                      네이버로 시작
                    </button>
                  </div>
                </div>
                <div onClick={KakaoLogin} className='cursor-pointer'>
                  <div className='flex items-center justify-center gap-[5px] rounded-[30px] bg-black p-2 w-[222px] h-[50px]'>
                    <Image src={kakaoIcon} width={17} height={16} alt='카카오아이콘' />
                    <button className='text-white whitespace-nowrap text-[20px] font-extrabold'>
                      카카오톡으로 시작
                    </button>
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

export default AlertLoginModal_Mobile;
