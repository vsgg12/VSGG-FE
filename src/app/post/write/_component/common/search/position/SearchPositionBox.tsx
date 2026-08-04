'use client';

import { memo } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';
import positions from '@/constants/positions';
import { useSearchDropdown } from '@/hooks/write/useSearchDropDown';

interface Props {
  position: string;
  setPosition: (position: string) => void;
}

const SearchPositionBox = ({ position, setPosition }: Props) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    boxRef,
    filteredList: filteredPositions,
  } = useSearchDropdown({
    list: positions,
    getText: (p) => p.content,
  });

  const selectedPosition = positions.find((p) => p.content === position);

  const onClickPosition = (position: string) => {
    setPosition(position);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={boxRef} className='relative w-[141px]'>
      {/* ================= 닫힌 상태 ================= */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className='
            h-[50px] px-[14px] py-[9px]
            flex items-center gap-[8px]
            bg-semantic-background-surface border-[0.5px] border-semantic-border-default
            hover:shadow-md
            rounded-[10px] cursor-pointer
          '
        >
          {selectedPosition ? (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              {selectedPosition.svgB}
              <span className='text-[16px] text-semantic-text-primary'>
                {selectedPosition.content}
              </span>
            </>
          ) : (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              <span className='text-[16px] text-semantic-text-muted'>포지션 검색</span>
            </>
          )}
        </div>
      )}

      {/* ================= 열린 상태 ================= */}
      {open && (
        <div
          className='
            absolute top-0 left-0 w-full
            bg-semantic-background-elevated border-[1px] border-primary-500
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
              placeholder='포지션 검색'
              className='w-full bg-transparent outline-none text-[16px] text-semantic-text-primary placeholder:text-semantic-text-muted'
            />
          </div>

          {/* 선택 목록 */}
          <div className='flex flex-col gap-[5px] px-[10px] pb-[10px]'>
            {filteredPositions.map((item) => {
              const isSelected = position === item.content;

              return (
                <div
                  key={item.id}
                  onClick={() => onClickPosition(item.content)}
                  className={`
                    flex items-center gap-[12px]
                    h-[38px] px-[10px]
                    rounded-[5px] cursor-pointer transition-colors
                    ${isSelected ? 'bg-primary-8' : 'hover:bg-semantic-background-subtle'}
                  `}
                >
                  {item.svgB}
                  <span className='text-[16px] text-semantic-text-primary'>{item.content}</span>
                </div>
              );
            })}

            {filteredPositions.length === 0 && (
              <div className='text-[14px] text-semantic-text-muted px-[10px] py-[8px]'>
                검색 결과 없음
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchPositionBox);
