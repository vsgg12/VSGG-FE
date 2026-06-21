'use client';

import Image from 'next/image';
import React from 'react';
import logoutIcon from '../../../../../../public/svg/gologout.svg';

interface IProps {
  onServiceTermClick: () => void;
  onPersonalInfoClick: () => void;
  onLogoutClick: () => void;
}

const SettingFooterMobile = ({
  onServiceTermClick,
  onPersonalInfoClick,
  onLogoutClick,
}: IProps) => {
  return (
    <footer className='-mx-[20px] mt-auto pt-[110px]'>
      <div className='flex h-[24px] items-center gap-[10px] px-[20px] text-[12px] font-[400] leading-none tracking-[-0.02em] text-[#666666]'>
        <button type='button' onClick={onServiceTermClick}>
          서비스 약관
        </button>
        <button type='button' onClick={onPersonalInfoClick}>
          개인정보처리방침
        </button>
      </div>

      <button
        type='button'
        onClick={onLogoutClick}
        className='flex h-[50px] w-full items-center gap-[10px] border-t border-[#D9D9D9] bg-[#F3F3F3] px-[20px] text-[14px] font-[400] leading-none text-[#333333]'
      >
        <Image src={logoutIcon} alt='로그아웃 아이콘' width={20} height={20} />
        <span>로그아웃</span>
      </button>
    </footer>
  );
};

export default SettingFooterMobile;
