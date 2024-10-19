'use client';

import Pagination from 'react-js-pagination';
import { useState } from 'react';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import getMyPostLists from '@/api/getMyPostLists';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MyPostList from '../_component/MyPostList';

export default function MyPosts() {
  const [page, setPage] = useState<number>(1);
  const { accessToken } = useAuthStore.getState();

  const { data: myPostLists } = useQuery({
    queryKey: ['MY_POST_LISTS', page],
    queryFn: () => getMyPostLists({ token: accessToken, size: '10', page: String(page) }),
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
      <div className='flex justify-center w-full'>
        <div className='flex w-full flex-col mx-28'>
          {myPostLists && (
            <div className='flex flex-col gap-3 rounded-[30px] bg-white px-10 pb-4 pt-8 min-h-[800px] mb-[50px]'>
              <div className='flex items-center gap-5 mb-[8px]'>
                <p>내가 쓴 글</p>
              </div>
              <div className='flex justify-between items-center text-xs text-[#C3C3C3]'>
                <div>제목</div>
                <div className='w-[250px] flex justify-between'>
                  <div>댓글수</div>
                  <div className='mr-[20px]'>작성일</div>
                </div>
              </div>
              <div className='h-full flex-grow'>
                <MyPostList myPostList={myPostLists.postList} />
              </div>
              <div className='flex justify-center pb-4'>
                <Pagination
                  activePage={page}
                  totalItemsCount={myPostLists.pageInfo.totalPageNum}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  onChange={handlePageChange}
                  activeLinkClass='active-page'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
