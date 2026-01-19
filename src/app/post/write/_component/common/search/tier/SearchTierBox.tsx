'use client';

import { memo } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';
import tiers from '@/constants/tier';
import { useSearchDropdown } from '@/hooks/write/useSearchDropDown';

interface Props {
  tier: string;
  setTier: (tier: string) => void;
}

const SearchTierBox = ({ tier, setTier }: Props) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    boxRef,
    filteredList: filteredTiers,
  } = useSearchDropdown({
    list: tiers,
    getText: (t) => t.content,
  });

  const selectedTier = tiers.find((t) => t.content === tier);

  const onClickTier = (tier: string) => {
    setTier(tier);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={boxRef} className='relative w-[189px]'>
      {/* ================= 닫힌 상태 ================= */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className='
            h-[50px] px-[14px] py-[9px]
            flex items-center gap-[8px]
            bg-white border-[0.5px] border-[#C8C8C8] hover:shadow-md
            rounded-[10px] cursor-pointer
          '
        >
          {selectedTier ? (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              {selectedTier.svg}
              <span className='text-[16px] text-[#333]'>{selectedTier.content}</span>
            </>
          ) : (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              <span className='text-[16px] text-[#999]'>티어 검색</span>
            </>
          )}
        </div>
      )}

      {/* ================= 열린 상태 ================= */}
      {open && (
        <div
          className='
            absolute top-0 left-0 w-full
            bg-white border-[1px] border-[#8A1F21]
            rounded-[10px] shadow-lg z-50
          '
        >
          {/* 상단 입력 영역 */}
          <div className='h-[50px] px-[14px] py-[9px] flex items-center gap-[8px]'>
            <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='티어 검색'
              className='w-full bg-transparent outline-none text-[16px]'
            />
          </div>

          {/* 선택 목록 */}
          <div className='flex flex-col gap-[5px] px-[10px] pb-[10px]'>
            {filteredTiers.map((item) => {
              const isSelected = tier === item.content;

              return (
                <div
                  key={item.id}
                  onClick={() => onClickTier(item.content)}
                  className={`
                    flex items-center gap-[12px]
                    h-[38px] px-[10px]
                    rounded-[5px] cursor-pointer transition-colors
                    ${isSelected ? 'bg-[#F9E6E6]' : 'hover:bg-[#F3F3F3]'}
                  `}
                >
                  {item.svg}
                  <span className='text-[16px] text-[#333]'>{item.content}</span>
                </div>
              );
            })}

            {filteredTiers.length === 0 && (
              <div className='text-[14px] text-[#999] px-[10px] py-[8px]'>검색 결과 없음</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchTierBox);
