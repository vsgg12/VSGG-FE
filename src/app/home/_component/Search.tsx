import { GoSearch } from 'react-icons/go';
import Logo from '../../../components/Logo';
import useSearchStore from '../store/useSearchStore';
import { useState } from 'react';
import Image from 'next/image';
import Banner from '../../../../public/svg/banner/banner.svg';

export default function Search({
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

  const handleFeedbackBannerClick = () => {};

  return (
    <div className='flex w-full justify-center relative'>
      <div className='mb-[100px] mt-[100px] flex flex-col items-center justify-center gap-[32px]'>
        <Logo />
        <div className='relative flex flex-row'>
          <input
            className='h-[38px] w-[358px] rounded-[43px] border-2 border-[#8A1F21] pl-[30px] pr-[40px] text-[13px] focus:outline-none'
            placeholder='제목 혹은 내용 검색'
            onChange={handleKeywordChange}
            onKeyDown={handleSearchKeyDown}
            value={searchKeyword}
          />
          <button onClick={handleSearch}>
            <GoSearch className='absolute right-5 top-2.5  text-[#8A1F21]' />
          </button>
        </div>
      </div>
      <Image
        src={Banner}
        alt='feedback banner'
        width={284}
        height={112}
        className='absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer'
        onClick={handleFeedbackBannerClick}
      />
    </div>
  );
}
