import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';
import { getInitialConsonants } from '@/utils/truncateText';
import tiers from '@/constants/tier';

interface Props {
  tier: string;
  setTier: (tier: string) => void;
}

const SearchTierBox = ({ tier, setTier }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  const selectedTier = tiers.find((t) => t.content === tier);

  const filteredTiers = useMemo(() => {
    if (!query) return tiers;

    const lowerQuery = query.toLowerCase();
    const queryInitial = getInitialConsonants(lowerQuery);

    return tiers.filter((t) => {
      const content = t.content.toLowerCase();
      const contentInitial = getInitialConsonants(content);

      return content.includes(lowerQuery) || contentInitial.includes(queryInitial);
    });
  }, [query]);

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
    <div ref={boxRef} className='relative w-[189px]'>
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
          {selectedTier ? (
            <>
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
                  onClick={() => {
                    setTier(item.content);
                    setOpen(false);
                    setQuery('');
                  }}
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
