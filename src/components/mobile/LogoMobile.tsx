'use client';

import useSearchStore from '@/app/home/store/useSearchStore';
import { useRouter } from 'next/navigation';

export default function LogoMobile({ size }: { size: 'default' | 'small' }) {
  const { setKeyword } = useSearchStore();
  const router = useRouter();

  // size prop에 따라 이미지 높이를 기존 폰트 사이즈와 동일하게 맞춥니다.
  const heightClass = size === 'default' ? 'h-[32px]' : 'h-[25px]';

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        router.push('/home');
        setKeyword('');
      }}
    >
      {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서는 숨김 */}
      <img
        src='/logo/normal/normal-red.svg'
        alt='VS.GG'
        className={`block w-auto ${heightClass} dark:block`}
      />

      {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
      <img
        src='/logo/normal/normal-white.svg'
        alt='VS.GG'
        className={`hidden w-auto ${heightClass} dark:hidden`}
      />
    </div>
  );
}
