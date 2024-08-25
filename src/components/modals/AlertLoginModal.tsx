import getNaverURL from '@/api/naver/getNaverURL';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SiNaver } from 'react-icons/si';

function AlertLoginModal() {
  const { data: NAVER_AUTH_URL, isLoading } = useQuery({
    queryKey: ['NAVER_URL'],
    queryFn: async () => getNaverURL(),
  });

  const NaverLogin = () => {
    if (NAVER_AUTH_URL) {
      window.location.href = NAVER_AUTH_URL.naverLoginUrl;
    }
  };
  return (
    <div>
      {!isLoading && (
        <>
          <div
            className='flex flex-col relative bg-white w-[674px] h-[310px] rounded-[18px] py-[80px] gap-[50px] px-[100px]'
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
              <div onClick={NaverLogin} className='cursor-pointer'>
                <div className='mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
                  <SiNaver color='white' />
                  <button className='text-white whitespace-nowrap'>
                    네이버로 3초만에 시작하기
                  </button>
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
