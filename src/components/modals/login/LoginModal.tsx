import { useQuery } from '@tanstack/react-query';
import getNaverURL from '@/api/login/getNaverURL';
import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';
import React from 'react';
import LoginModalFooter from '@/components/modals/login/footer/LoginModalFooter';

const LoginModal = () => {
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
            className='flex flex-col relative bg-white w-[512px] h-[700px] rounded-[20px] py-[50px] gap-[50px] px-[60px]'
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
              <LoginModalFooter
                onClickGoogleLogin={GoogleLogin}
                onClickNaverLogin={NaverLogin}
                onClickKakaoLogin={KakaoLogin}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginModal;
