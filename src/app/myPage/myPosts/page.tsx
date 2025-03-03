'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import getMyPostLists from '@/api/getMyPostLists';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MyPostList from '../_component/MyPostList';
import IsNotExistList from '../_component/IsNotExistList';
import MyPost_Mobile from '../mobile/myPosts/MyPostsMobile';
import { useMediaQuery } from 'react-responsive';
import getMyProfileDTO from '@/api/getMyProfileDTO';
import getAlarms from '@/api/getAlarms';

export default function MyPosts() {
  const [page, setPage] = useState<number>(1);
  const { accessToken, isLogin } = useAuthStore.getState();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin && !isMobile,
  });

  const { data: alarmData } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin && !isMobile,
  });

  const { data: myPostLists } = useQuery({
    queryKey: ['MY_POST_LISTS', page],
    queryFn: () => getMyPostLists({ token: accessToken, size: '10', page: String(page) }),
    enabled: isLogin && !isMobile,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {isMobile ? (
        <MyPost_Mobile />
      ) : (
        <div className='min-w-[1350px]'>
          <Header userProfileData={userProfileData} alarmData={alarmData} />
          <div className='mb-[130px] mt-[30px] flex flex-col items-center justify-center gap-[32px] min-w-[1280px]'>
            <Logo />
          </div>
          <div className='flex justify-center w-full'>
            <div className='flex w-full flex-col mx-28'>
              {myPostLists && (
                <div className='flex flex-col gap-3 rounded-[30px] bg-white px-10 pb-4 pt-8 min-h-[800px] mb-[50px] font-medium'>
                  <div className='flex items-center gap-5 mb-[8px] text-[20px]'>
                    <p>내가 쓴 글</p>
                  </div>
                  <div className='flex justify-between items-center text-[12px] text-[#C3C3C3]'>
                    <div>제목</div>
                    <div className='w-[300px] flex justify-between'>
                      <div>댓글수</div>
                      <div className='mr-[20px]'>작성일</div>
                    </div>
                  </div>
                  <div className='h-full flex-grow'>
                    {myPostLists && myPostLists.postList.length !== 0 ? (
                      <MyPostList myPostList={myPostLists.postList} />
                    ) : (
                      <div className='flex justify-center items-center w-full h-full'>
                        <IsNotExistList type='myPost' />
                      </div>
                    )}
                  </div>
                  <div className='flex justify-center pb-4'>
                    {myPostLists && myPostLists.postList.length !== 0 ? (
                      <Pagination
                        activePage={page}
                        totalItemsCount={myPostLists.pageInfo.totalPageNum * 10}
                        itemsCountPerPage={10}
                        pageRangeDisplayed={5}
                        prevPageText={'<'}
                        nextPageText={'>'}
                        onChange={handlePageChange}
                        activeLinkClass='active-page'
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
