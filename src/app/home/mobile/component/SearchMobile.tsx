import { GoSearch } from 'react-icons/go';
import useSearchStore from '../../store/useSearchStore';
import { useState } from 'react';
import LogoMobile from '@/components/mobile/LogoMobile';

export default function SearchMobile({
  handleSearch,
  handleSearchKeyDown,
}: {
  handleSearch: () => void;
  handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const { setKeyword } = useSearchStore();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedKeyword = e.target.value.trim();
    setKeyword(trimmedKeyword);
    setSearchKeyword(e.target.value);
  };

  return (
    <div className='w-[60%] mt-[20px] flex flex-col items-center justify-center gap-[20px]'>
      <LogoMobile size='default' />
      <div className='relative flex flex-row w-full'>
        <input
          className='h-[30px] w-full rounded-[43px] border-2 border-[#8A1F21] pl-[30px] pr-[40px] text-[13px] focus:outline-none'
          placeholder='제목 혹은 내용 검색'
          onChange={handleKeywordChange}
          onKeyDown={handleSearchKeyDown}
          value={searchKeyword}
        />
        <button onClick={handleSearch}>
          <GoSearch className='absolute right-5 top-[8px]  text-[#8A1F21]' />
        </button>
      </div>
    </div>
  );
}
