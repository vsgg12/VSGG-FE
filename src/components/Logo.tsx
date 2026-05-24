import useSearchStore from '@/app/home/store/useSearchStore';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const { setKeyword } = useSearchStore();
  const router = useRouter();

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        router.push('/home');
        setKeyword('');
      }}
    >
      {/* 라이트모드용 로고: 기본적으로 보이고, 다크모드(.dark)에서 숨김 */}
      <img
        src='/logo/normal/normal-red.svg'
        alt='VS.GG'
        className='block h-[40px] w-auto dark:block'
        // className='block h-[40px] w-auto dark:hidden'
      />

      {/* 다크모드용 로고: 기본적으로 숨기고, 다크모드(.dark)에서만 보임 */}
      <img
        src='/logo/normal/normal-white.svg'
        alt='VS.GG'
        className='hidden h-[40px] w-auto dark:hidden'
      />
    </div>
  );
}
