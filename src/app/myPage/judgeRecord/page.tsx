'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
import HalfDoughnutChart from '@/components/HalfDoughnutChart';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getMyJudgeList from '@/api/getMyJudgeList';
import MyJudgeList from '../_component/MyJudgeList';
import IsNotExistList from '../_component/IsNotExistList';
import { useMediaQuery } from 'react-responsive';
import JudgeRecord_Mobile from '../mobile/judgeRecord/JudgeRecordMobile';

export default function JudgeRecord() {
  const [page, setPage] = useState<number>(1);
  const { accessToken } = useAuthStore.getState();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
  });

  const { data: myJudgeLists } = useQuery({
    queryKey: ['MY_JUDGE_LISTS', page],
    queryFn: () => getMyJudgeList({ token: accessToken, size: '10', page: String(page) }),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {isMobile ? (
        <JudgeRecord_Mobile />
      ) : (
        <div className='min-w-[1480px]'>
          <Header />
          <div className='mb-[130px] mt-[30px] flex flex-col items-center justify-center gap-[32px] min-w-[1280px]'>
            <Logo />
          </div>
          {userProfileData && (
            <div className='flex justify-center gap-10'>
              <div className='flex flex-col'>
                <div className='w-[300px] h-[240px] flex flex-col items-center rounded-[30px] bg-white p-[15px]'>
                  <p className='self-start text-[14px] font-[400] flex-grow ml-5 mt-2'>판결 승률</p>
                  <div className='absolute top-[360px] w-[180px]'>
                    <HalfDoughnutChart
                      win={userProfileData.memberProfileDTO.predicateResult}
                      lose={
                        userProfileData.memberProfileDTO.joinedResult -
                        userProfileData.memberProfileDTO.predicateResult
                      }
                    />
                  </div>
                  <div className='absolute text-[14px] font-[400] text-[#C3C3C3] translate-y-[170px]'>
                    {userProfileData.memberProfileDTO.joinedResult}전{' '}
                    {userProfileData.memberProfileDTO.predicateResult}승{' '}
                    {userProfileData.memberProfileDTO.joinedResult -
                      userProfileData.memberProfileDTO.predicateResult}
                    패
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3 rounded-[30px] bg-white px-10 pb-4 pt-8 min-h-[800px] mb-[50px] min-w-[960px]'>
                <div className='flex items-center gap-5 mb-[8px] font-medium'>
                  <div className='text-[20px]'>판결 전적</div>
                  <div className='text-[12px] text-[#C3C3C3]'>
                    최대 1달 전까지의 전적을 확인할 수 있어요
                  </div>
                </div>
                <div className='flex justify-between items-center text-[12px] text-[#C3C3C3] font-medium'>
                  <div>제목</div>
                  <div className='w-[300px] flex justify-between'>
                    <div>게시자</div>
                    <div className='mr-[20px]'>작성일</div>
                  </div>
                </div>
                <div className='h-full flex-grow'>
                  {myJudgeLists && myJudgeLists.postList.length !== 0 ? (
                    <MyJudgeList myJudgeList={myJudgeLists.postList} />
                  ) : (
                    <div className='flex justify-center items-center w-full h-full'>
                      <IsNotExistList type='myJudge' />
                    </div>
                  )}
                </div>
                <div className='flex justify-center pb-4'>
                  {myJudgeLists && myJudgeLists.postList.length !== 0 ? (
                    <Pagination
                      activePage={page}
                      totalItemsCount={myJudgeLists.pageInfo.totalPageNum}
                      pageRangeDisplayed={5}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      onChange={handlePageChange}
                      activeLinkClass='active-page'
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
