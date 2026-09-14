'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

export interface SettingItemMobileProps {
  icon: StaticImageData;
  title: string;
  onClick: () => void;
}

interface IProps extends SettingItemMobileProps {
  hasDivider?: boolean;
}

const SettingItemMobile = ({ icon, title, onClick, hasDivider = false }: IProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`relative flex h-[52px] w-full items-center gap-[8px] px-[14px] py-[16px] text-left ${
        hasDivider
          ? "after:absolute after:bottom-0 after:left-[52px] after:right-[14px] after:h-px after:bg-gray-100 after:content-['']"
          : ''
      }`}
    >
      <Image src={icon} alt={`${title} 아이콘`} width={20} height={20} />
      <span className='text-[14px] font-[400] leading-none text-gray-850'>{title}</span>
    </button>
  );
};

export default SettingItemMobile;
