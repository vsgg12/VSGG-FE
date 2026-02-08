'use client';

import getPostList from '@/api/post/getPostList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchInputContainer from './SearchInputContainer';
import SearchList from './SearchList';

function SearchModal() {
  const { isLogin, accessToken } = useAuthStore();
  const [keyword, setKeyword] = useState<string>('');

  const { data: postData, refetch } = useQuery<IGetPostListType>({
    queryKey: ['POST_LIST'],
    queryFn: () => getPostList('createdatetime', keyword, isLogin ? accessToken : ''),
  });

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      refetch();
    }
  };

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      refetch();
    }
  };

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const trimKeyword = e.target.value.trim();
    setKeyword(trimKeyword);
  };

  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <div
      className='w-[362px] min-w-[362px] h-screen py-[40px] bg-[#FFFFFF] z-[100]'
      style={{
        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='h-full flex flex-col gap-[30px]'>
        <p className='text-[#888888] text-[20px] font-bold pl-[16px]'>검색</p>
        <SearchInputContainer
          handleSearchKeyDown={handleSearchKeyDown}
          handleSearch={handleSearch}
          onChangeKeyword={onChangeKeyword}
          keyword={keyword}
          visible={Number(postData?.postDTO.length) > 0}
        />
        <div className='flex-1 min-h-0 px-[16px] overflow-y-auto scrollbar-hidden'>
          {postData && postData.postDTO.length > 0 ? (
            <div className='overflow-y-auto h-full scrollbar-hidden'>
              <SearchList postList={postData.postDTO} />
            </div>
          ) : (
            <div className='text-[12px] text-[#888888] w-full justify-center flex'>
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
