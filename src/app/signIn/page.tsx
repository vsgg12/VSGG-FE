'use client';

import { SiNaver } from 'react-icons/si';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingFull from '@/components/LoadingFull';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (): void => {
    router.push('/');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {isLoading && <LoadingFull />}
      <div className="mb-10 mt-auto font-['SBAggroB'] text-5xl text-[#8A1F21] md:text-8xl">
        <div>VS.GG</div>
      </div>
      <div>
        <div className='mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 '>
          <SiNaver color='white' />
          <button className='text-white' onClick={handleLogin}>
            네이버로 3초만에 시작하기
          </button>
        </div>
      </div>
      <div className='mb-20 mt-auto flex gap-5'>
        <div>이용약관</div>
        <div className='text-gray-400'>개인정보처리방침</div>
      </div>
    </div>
  );
}
