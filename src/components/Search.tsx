import { GoSearch } from 'react-icons/go';
import Logo from './Logo';

export default function Search() {
  return (
    <>
      <div className='mb-[230px] mt-[150px] flex flex-col items-center justify-center gap-[32px]'>
        <Logo />
        <div className='relative flex flex-row'>
          <input
            className='h-[38px] w-[358px] rounded-[43px] border-2 border-[#8A1F21] pl-[30px] pr-[40px] text-[13px] focus:outline-none'
            placeholder='제목 혹은 내용 검색'
          />
          <button>
            <GoSearch className='absolute right-5 top-2.5  text-[#8A1F21]' />
          </button>
        </div>
      </div>
    </>
  );
}
