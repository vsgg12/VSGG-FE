'use client';
import Link from 'next/link';
import { SiNaver } from 'react-icons/si';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingFull from '@/app/components/LoadingFull';
import { checkToken } from '@/app/service/auth';
import Header from '@/app/layout/Header';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const naverLogin = async () => {
    setIsLoading(true);
    const res = await signIn('naver', { redirect: true, callbackUrl:'/home' });

    if (res) {
      setIsLoading(false);
    }
  };



  // useEffect(() => {
  //   async function handleToken() {
  //     const res = await checkToken();
  //     if (res) {
  //       router.push('/home');
  //     }
  //   }
  //   handleToken();
  // }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isLoading && <LoadingFull />}
      <div className="mb-10 mt-auto font-['SBAggroB'] text-5xl text-[#8A1F21] md:text-8xl">
        <div>VS.GG</div>
      </div>
      <div onClick={naverLogin}>
        <div className="mb-3 flex items-center justify-center gap-2 rounded-3xl bg-black p-2 px-32 ">
          <SiNaver color="white" />
          <button className="text-white">네이버로 3초만에 시작하기</button>
        </div>
      </div>
      {/* <div className="flex gap-2">
        <div>아직 VS.GG 멤버가 아니신가요?</div>
        <Link href="/auth/goSignUp" className="text-[#8A1F21]">
          회원가입
        </Link>
      </div> */}
      <div className="mb-20 mt-auto flex gap-5">
        <div>이용약관</div>
        <div className="text-gray-400">개인정보처리방침</div>
      </div>
    </div>
  );
}
