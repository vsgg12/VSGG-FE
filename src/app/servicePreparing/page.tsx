'use client';
import Image from 'next/image';
import Icon_alert from '../../../public/svg/Icon_alert.svg';
import { useRouter } from 'next/navigation';

export default function ServicePreparing() {
  const router = useRouter();

  return (
    <div className='flex flex-col h-[100vh] justify-center items-center bg-[#F3F3F3] py-20'>
      <Image className='mb-5' src={Icon_alert} width={150} height={150} alt='alertIcon' />
      <p className='text-[50px] text-[#333333] mb-5'>
        <span className='font-bold '>서비스 준비중</span>입니다.
      </p>
      <p className='text-[#333333] text-[18px]'>
        보다 나은 서비스 제공을 위해 페이지 준비중에 있습니다.
      </p>
      <p className='text-[#333333] text-[18px] mb-10'>빠른 시일내에 준비하여 찾아뵙겠습니다.</p>
      <p
        className='text-[#333333] text-[10px] underline cursor-pointer'
        onClick={() => router.push('/home')}
      >
        메인으로 돌아가기
      </p>
    </div>
  );
}
