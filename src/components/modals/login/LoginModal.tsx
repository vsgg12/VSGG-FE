'use client';

import { useQuery } from '@tanstack/react-query';
import getNaverURL from '@/api/login/getNaverURL';
import getGoogleURL from '@/api/login/getGoogleUrl';
import getKakaoURL from '@/api/login/getKakaoUrl';
import React from 'react';
import LoginModalFooter from '@/components/modals/login/footer/LoginModalFooter';
import LoginModalHeader from '@/components/modals/login/header/LoginModalHeader';
import LoginModalContent from '@/components/modals/login/content/LoginModalContent';

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
            className='flex flex-col gap-[40px] bg-white w-[512px] h-[700px] rounded-[20px] py-[50px] px-[60px] justify-center items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <LoginModalHeader />
            <LoginModalContent />
            <LoginModalFooter
              onClickGoogleLogin={GoogleLogin}
              onClickNaverLogin={NaverLogin}
              onClickKakaoLogin={KakaoLogin}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LoginModal;
