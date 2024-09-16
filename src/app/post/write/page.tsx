'use client';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import Link from 'next/link';
import PostFe from './_component/PostFe';

export default function PostWrite() {

  return (
    <div className='min-w-[1400px]'>
      <Header />
      <div>
        <div className='flex items-center justify-center w-full'>
          <Logo />
        </div>
        <section className='flex justify-center'>
          <div className='min-w-[1300px] w-full px-[80px]'>
            <div className='mb-[44px] flex items-center justify-between min-w-[1200px]'>
              <button
                onClick={() => {
                  history.back();
                }}
                className=' box-content flex h-[34px] w-[92px] items-center justify-center rounded-[150px] bg-[#8A1F21] text-white'
              >
                <div className='text-[13px]'>뒤로가기</div>
              </button>
              <div className='text-[12px] text-[#909090]'>
                <Link href='/'>홈</Link>
                {' > '}게시글
              </div>
            </div>
            <PostFe />
          </div>
        </section>
      </div>
    </div>
  );
}
