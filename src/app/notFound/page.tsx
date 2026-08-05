'use client';
import Image from 'next/image';
import Icon_alert from '../../../public/svg/Icon_alert.svg';
import { useRouter } from 'next/navigation';
import React from 'react';

function NotFound() {
  const router = useRouter();
  return (
    <div className='flex flex-col min-w-[1000px] h-[100vh] justify-center items-center bg-gray-50 p-20 gap-[30px]'>
      <Image src={Icon_alert} width={250} height={250} alt='alertIcon' />
      <p className='text-[80px] text-gray-850'>
        이미 삭제된 게시글입니다.
      </p>
      <p
        className='text-gray-850 text-[16px] underline cursor-pointer'
        onClick={() => router.push('/home')}
      >
        메인으로 돌아가기
      </p>
    </div>
  );
}

export default NotFound;
