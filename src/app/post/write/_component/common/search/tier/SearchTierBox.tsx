import { memo } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';

interface Props {
  tier: string;
  setTier: (tier: string) => void;
}

const SearchTierBox = ({ tier, setTier }: Props) => {
  return (
    <div
      className={
        'w-[140px] h-[50px] rounded-[10px] px-[14px] py-[9px] text-black bg-white border-[0.5px] border-[#888888] flex items-center gap-[15px] transition-shadow duration-300 hover:shadow-lg cursor-pointer focus-within:border-[1px]\n' +
        '        focus-within:border-[#8A1F21]'
      }
    >
      <Image src={graySearchIcon} alt={'searchIcon'} width={28} height={28} />
      <input
        type='text'
        placeholder={'티어 검색'}
        value={tier}
        className={'w-full h-full bg-transparent outline-none'}
        onChange={(e) => setTier(e.target.value.trim())}
      />
    </div>
  );
};

export default memo(SearchTierBox);
