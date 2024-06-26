'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <p onClick={() => router.push('/home')}>VSGG로 돌아가기</p>
    </>
  );
}
