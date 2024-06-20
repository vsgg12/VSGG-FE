'use client';

import Image from 'next/image';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';
import writeSVG from '../../public/svg/writing.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // const handleSignOut = async () => {
  //   await deleteToken();
  //   await signOut();
  //   router.push('/home');
  // };

  return (
    <>
      <div className='p-right-20 absolute right-10 top-10 flex flex-row items-center justify-end'>
        <div className='flex flex-row items-center gap-4'>
          {isLogin ? (
            <>
              <div className='cursor-pointer'>
                <Image
                  className='h-[32px] w-[32px]'
                  src={writeSVG}
                  alt='writeIcon'
                  onClick={() => router.push('/post/write')}
                />
              </div>

              <button className='hd-items'>
                <IoMdNotificationsOutline />
              </button>

              <div>
                <button className='hd-items flex items-center justify-center overflow-hidden rounded-full'>
                  <IoPersonCircle className='h-[2.2rem] w-[2.2rem]' />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className='mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]'
                onClick={() => setIsLogin(true)}
              >
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
