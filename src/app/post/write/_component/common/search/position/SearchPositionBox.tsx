import { memo } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';

interface Props {
  position: string;
  setPosition: (position: string) => void;
}

const SearchPositionBox = ({ position, setPosition }: Props) => {
  return (
    <div
      className={
        'w-[189px] h-[50px] rounded-[10px] px-[14px] py-[9px] text-black bg-white border-[0.5px] border-[#888888] flex items-center gap-[15px] transition-shadow duration-300 hover:shadow-lg cursor-pointer focus-within:border-[1px]\n' +
        '        focus-within:border-[#8A1F21]'
      }
    >
      <Image src={graySearchIcon} alt={'searchIcon'} width={28} height={28} />
      <input
        type='text'
        value={position}
        placeholder={'포지션 검색'}
        className={'w-full h-full bg-transparent outline-none'}
        onChange={(e) => setPosition(e.target.value.trim())}
      />
    </div>
  );
};

export default memo(SearchPositionBox);
