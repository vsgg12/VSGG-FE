'use client';

import Loading from '@/components/Loading';
import MobileHeader from '@/components/mobile/MobileHeader';
import { useMobileVersionStore } from '@/store/useMobileVersionStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function JudgeRecord_Mobile() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const { isMobileVersion } = useMobileVersionStore.getState();
  // const { accessToken } = useAuthStore.getState();

  const router = useRouter();

  //  const { data: myJudgeLists } = useQuery({
  //    queryKey: ['MY_JUDGE_LISTS', page],
  //    queryFn: () => getMyJudgeList({ token: accessToken, size: '10', page: String(page) }),
  //  });

  useEffect(() => {
    if (isMobileVersion === false) {
      router.replace('/myPage/judgeRecord');
    }
    setIsPageLoading(false);
  }, []);

  return (
    <div className='px-[10px]'>
      {isPageLoading ? (
        <div className='w-full h-[100dvh] items-center flex'>
          <Loading />
        </div>
      ) : (
        <>
          <MobileHeader headerTitle='판결 전적' />
          <div className='mobile-layout h-[100dvh] flex flex-col items-center px-[20px] py-[20px]'></div>
        </>
      )}
    </div>
  );
}

export default JudgeRecord_Mobile;
