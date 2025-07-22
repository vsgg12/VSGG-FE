'use client';

import getPostList from '@/api/getPostList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchInputContainer from './SearchInputContainer';
import SearchList from './SearchList';


function SearchModal() {
  const { isLogin, accessToken } = useAuthStore();
  const [keyword, setKeyword] = useState<string>('');

  const {
    data: postData,
    refetch,
  } = useQuery<IGetPostListType>({
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
        />
      </div>
      <div className="w-full h-full px-[16px]">
        <SearchList postList={postData?.postDTO} />
      </div>
    </div>
  );
}

export default SearchModal;
