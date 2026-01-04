import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';
import positions from '@/constants/positions';
import { getInitialConsonants } from '@/utils/truncateText';

interface Props {
  position: string;
  setPosition: (position: string) => void;
}

const SearchPositionBox = ({ position, setPosition }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const boxRef = useRef<HTMLDivElement>(null);

  const selectedPosition = positions.find((p) => p.content === position);

  const filteredPositions = useMemo(() => {
    if (!query) return positions;

    const lowerQuery = query.toLowerCase();
    const queryInitial = getInitialConsonants(lowerQuery);

    return positions.filter((p) => {
      const content = p.content.toLowerCase();
      const contentInitial = getInitialConsonants(content);

      return (
        content.includes(lowerQuery) || // 일반 문자열 포함
        contentInitial.includes(queryInitial) // 초성 포함
      );
    });
  }, [query]);

  const onClickPosition = (position: string) => {
    setPosition(position);
    setOpen(false);
    setQuery('');
  };

  /** 외부 클릭 닫기 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={boxRef} className='relative w-[141px]'>
      {/* ================= 닫힌 상태 ================= */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className='
            h-[50px] px-[14px] py-[9px]
            flex items-center gap-[8px]
            bg-white border-[1px] border-[#8A1F21]
            rounded-[10px] cursor-pointer
          '
        >
          {selectedPosition ? (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              {selectedPosition.svgB}
              <span className='text-[16px] text-[#333]'>{selectedPosition.content}</span>
            </>
          ) : (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              <span className='text-[16px] text-[#999]'>포지션 검색</span>
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
              placeholder='포지션 검색'
              className='w-full bg-transparent outline-none text-[16px]'
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
                    ${isSelected ? 'bg-[#F9E6E6]' : 'hover:bg-[#F3F3F3]'}
                  `}
                >
                  {item.svgB}
                  <span className='text-[16px] text-[#333]'>{item.content}</span>
                </div>
              );
            })}

            {filteredPositions.length === 0 && (
              <div className='text-[14px] text-[#999] px-[10px] py-[8px]'>검색 결과 없음</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchPositionBox);
