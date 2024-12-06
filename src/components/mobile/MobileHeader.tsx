'use client';

import React from 'react';
import BackArrowIcon from '../../../public/svg/mobile/backArrrowIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function MobileHeader({ headerTitle }: { headerTitle: '마이페이지' | '알림' }) {
  const router = useRouter();
  return (
    <div className='flex w-full pl-[10px] relative h-[32px] items-center'>
      <Image
        src={BackArrowIcon}
        alt='뒤로가기 아이콘'
        width={32}
        height={32}
        className='flex justify-start cursor-pointer'
        onClick={() => {
          router.push('/home');
        }}
      />
      <div className='absolute left-[50%] translate-x-[-50%] text-[#8A1F21] font-bold text-[22px]'>
        {headerTitle}
      </div>
    </div>
  );
}

export default MobileHeader;
