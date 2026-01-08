'use client';

import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import kakaoIcon from '../../../../../public/svg/login/kakaoIcon.svg';
import googleIcon from '../../../../../public/svg/login/googleIcon.svg';
import naverIcon from '../../../../../public/svg/login/naverIcon.svg';

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
    src: googleIcon,
    label: '구글 로그인',
    styleClass: 'bg-white text-[#333333] hover:bg-white/80 hover:text-[#333333]/80',
    width: 18,
    height: 18.37,
    alt: '구글아이콘',
  },
  naver: {
    src: naverIcon,
    label: '네이버 로그인',
    styleClass: 'bg-[#03C75A] text-white hover:bg-[#03C75A]/80 hover:text-white/80',
    width: 15,
    height: 15,
    alt: '네이버아이콘',
  },
  kakao: {
    src: kakaoIcon,
    label: '카카오 로그인',
    styleClass: 'bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FEE500]/80 hover:text-[#3C1E1E]/80',
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
        'cursor-pointer w-full h-[40px] border-[0.25px] border-[#C8C8C8] shadow-sm rounded-[5px]',
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