'use client';

import React from 'react';
import BackArrowIcon from '../../../../public/svg/mobile/backArrowIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function MobileHeader({ headerTitle }: { headerTitle: '마이페이지' | '알림' | string }) {
  const router = useRouter();
  return (
    <div className='flex h-[80px] items-center py-[20px] pl-[10px] mobile-layout sticky top-0 z-[40] !bg-semantic-background-surface'>
      <Image
        src={BackArrowIcon}
        alt='뒤로가기 아이콘'
        width={24}
        height={24}
        className='flex justify-start cursor-pointer'
        onClick={() => {
          router.back();
        }}
      />
      <div className='absolute left-[50%] translate-x-[-50%] text-[20px] font-bold text-semantic-text-primary'>
        {headerTitle}
      </div>
    </div>
  );
}

export default MobileHeader;
