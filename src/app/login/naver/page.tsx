'use client';

import NaverLogin from '@/api/naver/naverLogin';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Naver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const { mutate: login } = useMutation({
    mutationFn: () => NaverLogin({ code, state }),
    onSuccess: () => router.push('/home'),
    onError: (error) => console.log(error),
    onSettled: (data) => console.log(data),
  });

  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <h1>네이버 로그인 중...</h1>
    </div>
  );
}
