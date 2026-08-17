'use client';

import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

type LoginProviderType = 'google' | 'kakao' | 'naver';

type LoginButtonType = {
  src: string;
  label: string;
  styleClass: string;
  width: number;
  height: number;
  alt: string;
}

interface Props {
  type: LoginProviderType;
  onClick: () => void;
}

// 타입별 설정 정보 (상수로 분리)
const LOGIN_BUTTON_CONFIG: Record<
  LoginProviderType,
  LoginButtonType
> = {
  google: {
    src: "/svg/login/googleIcon.svg",
    label: '구글 로그인',
    styleClass: 'bg-white text-gray-850 hover:bg-white/80 hover:text-gray-850/80',
    width: 18,
    height: 18.37,
    alt: '구글아이콘',
  },
  naver: {
    src: '/svg/login/naverIcon.svg',
    label: '네이버 로그인',
    styleClass: 'bg-special-naver text-white hover:bg-special-naver/80 hover:text-white/80',
    width: 15,
    height: 15,
    alt: '네이버아이콘',
  },
  kakao: {
    src: "/svg/login/kakaoIcon.svg",
    label: '카카오 로그인',
    styleClass: 'bg-special-kakao text-special-kakaoLogo hover:bg-special-kakao/80 hover:text-special-kakaoLogo/80',
    width: 17,
    height: 16,
    alt: '카카오아이콘',
  },
};

const LoginTypeButton = ({ type, onClick }: Props) => {
  const { src, label, styleClass, width, height, alt } = LOGIN_BUTTON_CONFIG[type];

  return (
    <div
      onClick={onClick}
      className={clsx(
        'cursor-pointer w-full h-[40px] border-[0.25px] border-gray-150 shadow-sm rounded-[5px]',
        'flex items-center justify-center gap-2 text-[16px]',
        styleClass,
      )}
    >
      <Image src={src} width={width} height={height} alt={alt} priority />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
};

export default LoginTypeButton;