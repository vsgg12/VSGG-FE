import useSearchStore from '@/app/home/store/useSearchStore';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const { setKeyword } = useSearchStore();
  const router = useRouter();

  return (
    <>
      <div
        className="font-['SBAggroB'] text-[52px] text-[#8A1F21] cursor-pointer"
        onClick={() => {
          router.push('/home');
          setKeyword('');
        }}
      >
        VS.GG
      </div>
    </>
  );
}
