import Image from 'next/image';
import kakaoIcon from '../../../../../public/svg/login/kakaoIcon.svg';
import React from 'react';
import googleIcon from '../../../../../public/svg/login/googleIcon.svg';
import naverIcon from '../../../../../public/svg/login/naverIcon.svg';

interface Props {
  type: 'google' | 'kakao' | 'naver';
  onClick: () => void;
}

const LoginTypeButton = ({ type, onClick }: Props) => {
  const getButtonIcon = () => {
    switch (type) {
      case 'google':
        return <Image src={googleIcon} width={18} height={18.37} alt={'구글아이콘'} />;
      case 'naver':
        return <Image src={naverIcon} width={15} height={15} alt={'네이버아이콘'} />;
      case 'kakao':
        return <Image src={kakaoIcon} width={17} height={16} alt='카카오아이콘' />;
      default:
        break;
    }
  };

  const getButtonTitle = () => {
    switch (type) {
      case 'google':
        return '구글 로그인';
      case 'naver':
        return '네이버 로그인';
      case 'kakao':
        return '카카오 로그인';
    }
  };

  const buttonClass = () => {
    if (type === 'google') return 'bg-white text-[#333333]';
    if (type === 'naver') return 'bg-[#FF6600] text-[#3C1E1E]';
    if (type === 'kakao') return 'bg-[#03C75A] text-white';
  };

  return (
    <div
      onClick={onClick}
      className='cursor-pointer w-full h-[40px] border-[0.25px] border-[#C8C8C8] shadow-sm'
    >
      <div
        className={`h-full w-full flex items-center justify-center gap-2 rounded-[5px] text-[16px] ${buttonClass()}`}
      >
        {getButtonIcon()}
        <div className='whitespace-nowrap'>{getButtonTitle()}</div>
      </div>
    </div>
  );
};

export default LoginTypeButton;
