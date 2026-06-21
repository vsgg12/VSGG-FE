'use client';

import React from 'react';
import SettingItemMobile, { SettingItemMobileProps } from './SettingItemMobile';

interface IProps {
  title: string;
  items: SettingItemMobileProps[];
}

const SettingListMobile = ({ title, items }: IProps) => {
  return (
    <section className='flex w-full flex-col gap-[13px]'>
      <h2 className='text-[14px] font-[400] leading-none text-[#C8C8C8]'>{title}</h2>
      <div className='w-full overflow-hidden rounded-[10px] bg-white'>
        {items.map((item, index) => (
          <SettingItemMobile
            key={item.title}
            icon={item.icon}
            title={item.title}
            onClick={item.onClick}
            hasDivider={index !== items.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default SettingListMobile;
