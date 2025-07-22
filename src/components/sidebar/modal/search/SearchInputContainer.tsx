'use client';

import { GoSearch } from 'react-icons/go';
import { KeyboardEvent, ChangeEvent} from 'react';

interface Props {
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  keyword: string;
}

function SearchInputContainer({
  onChangeKeyword,
  handleSearchKeyDown,
  handleSearch,
  keyword,
}: Props) {
  return (
    <div className='w-full h-[83px] px-[10px] flex flex-col justify-between'>
      <div className='w-[325px] h-[40px] relative'>
        <input
          placeholder={'제목 혹은 내용 검색'}
          value={keyword}
          onChange={onChangeKeyword}
          onKeyDown={handleSearchKeyDown}
          className='w-full h-full rounded-[10px] px-[20px] text-[16px] font-medium bg-[#F8F8F8] focus:outline-none'
        />
        <button onClick={handleSearch}>
          <GoSearch className='absolute right-5 top-[12px] text-[#8A1F21]' />
        </button>
      </div>
      <div className='text-[16px] font-medium text-[#333333] pl-[10px]'>
        <span className='font-semibold text-[#8A1F21]'>{keyword}</span>에 대한 검색 결과입니다.
      </div>
    </div>
  );
}

export default SearchInputContainer;
