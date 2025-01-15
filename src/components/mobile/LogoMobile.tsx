import useSearchStore from '@/app/home/store/useSearchStore';
import { useRouter } from 'next/navigation';

export default function LogoMobile({ size }: { size: 'default' | 'small' }) {
  const { setKeyword } = useSearchStore();
  const router = useRouter();

  return (
    <div
      className={`${size === 'default' ? 'text-[32px]' : 'text-[25px]'} font-['SBAggroB']  text-[#8A1F21] cursor-pointer`}
      onClick={() => {
        router.push('/home/mobile');
        setKeyword('');
      }}
    >
      VS.GG
    </div>
  );
}
