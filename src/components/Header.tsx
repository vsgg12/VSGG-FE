'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';

import writeSVG from '../../../public/svg/writing.svg';
import { checkToken, deleteToken } from '../service/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await deleteToken();
    await signOut();
    router.push('/home');
  };

  return (
    <>
      <div className="p-right-20 absolute right-10 top-10 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center gap-4">
          <div className="cursor-pointer">
            <Image
              className="h-[32px] w-[32px]"
              src={writeSVG}
              alt="writeIcon"
              onClick={() => router.push('/post/write')}
            />
          </div>

          {/* <button className="hd-items mr-[0.6rem] ">
            <IoMdNotificationsOutline />
          </button> */}
          {/* <Link href="/myPage">
          <Link href="/myPage">
            <button className="hd-items mr-[1rem] flex items-center justify-center overflow-hidden rounded-full">
              <IoPersonCircle className="h-[2.2rem] w-[2.2rem]" />
            </button>
          </Link> */}
          {session ? (
            <div onClick={handleSignOut}>
              <button className="mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]">
                로그아웃
              </button>
            </div>
          ) : (
            <button
              className="mr-[1rem] rounded-[150px] border-2 border-[#8A1F21] px-[30px] py-[5px] text-[#8A1F21]"
              onClick={() => router.push('/auth/signIn')}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </>
  );
}
