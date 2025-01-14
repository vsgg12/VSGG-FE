import { useRouter } from 'next/navigation';
import React from 'react';

function NavigationArea() {
  const router = useRouter();
  return (
    <div className='min-w-[1400px] px-[50px] flex flex-row items-center justify-between'>
      <button
        onClick={() => {
          router.push('/home');
        }}
        className='mb-[44px] box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white'
      >
        <div className='text-[13px]'>글 목록</div>
      </button>
      <div className='text-xs text-[#909090]'>
        <span className='cursor-pointer' onClick={() => router.push('/home')}>
          홈
        </span>
        {' > '}게시글
      </div>
    </div>
  );
}

export default NavigationArea;
