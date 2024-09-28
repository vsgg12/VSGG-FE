'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export default function JudgeRecord() {
  const [page, setPage] = useState<number>(1);
  const { accessToken } = useAuthStore.getState();

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className='min-w-[1350px]'>
      <Header />
      <div className='mb-[130px] mt-[30px] flex flex-col items-center justify-center gap-[32px] min-w-[1280px]'>
        <Logo />
      </div>
      {userProfileData && (
        <div className='flex justify-center gap-10'>
          <div className='flex flex-col'>
            <div className='w-[340px] h-[240px] flex flex-col items-center rounded-[30px] bg-white p-[15px]'>
              <p className='self-start text-xs flex-grow ml-5 mt-2'>판결 승률</p>
              <div className='absolute top-[340px] w-[250px]'>
                <HalfDoughnutChart win={30} lose={70} />
              </div>
              <div className=' text-xs text-[#C3C3C3]'>
                {userProfileData.memberProfileDTO.joinedResult}전{' '}
                {userProfileData.memberProfileDTO.predicateResult}승{' '}
                {userProfileData.memberProfileDTO.joinedResult -
                  userProfileData.memberProfileDTO.predicateResult}
                패
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3 rounded-[30px] bg-white px-10 pb-4 pt-8 min-h-[800px] mb-[50px] min-w-[800px]'>
            <div className='flex items-center gap-5 mb-[8px]'>
              <div>판결 전적</div>
              <div className='text-xs text-[#C3C3C3]'>
                최대 1달 전까지의 전적을 확인할 수 있어요
              </div>
            </div>
            <div className='flex justify-between items-center text-xs text-[#C3C3C3]'>
              <div>제목</div>
              <div className='w-[250px] flex justify-between'>
                <div>게시자</div>
                <div className='mr-[20px]'>작성일</div>
              </div>
            </div>
            <div className='h-full flex-grow'>{/* 내 판결 전적 목록 컴포넌트 부분 */}</div>
            <div className='flex justify-center pb-4'>
              <Pagination
                activePage={page}
                totalItemsCount={1}
                pageRangeDisplayed={5}
                prevPageText={'<'}
                nextPageText={'>'}
                onChange={handlePageChange}
                activeLinkClass='active-page'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
