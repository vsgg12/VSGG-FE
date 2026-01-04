import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import graySearchIcon from '../../../../../../../../public/svg/postWrite/graySearchIcon.svg';
import { getInitialConsonants } from '@/utils/truncateText';
import { useWriteStore } from '@/store/write/useWriteStore';

interface Props {
  championName: string;
  setChampionName: (name: string) => void;
}

const SearchChampionBox = ({ championName, setChampionName }: Props) => {
  const { allChampions } = useWriteStore();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const championRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedChampion = allChampions.find((c) => c.name === championName);

  const filteredChampions = useMemo(() => {
    if (!query) return allChampions;

    const lowerQuery = query.toLowerCase();
    const queryInitial = getInitialConsonants(lowerQuery);

    return allChampions.filter((champion) => {
      const name = champion.name.toLowerCase();
      const nameInitial = getInitialConsonants(name);

      return name.includes(lowerQuery) || nameInitial.includes(queryInitial);
    });
  }, [query, allChampions]);

  const onClickChampion = (champion: string) => {
    setChampionName(champion);
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

  useEffect(() => {
    if (!open) return;

    if (!championName) return;

    // 선택된 항목이 보이도록 스크롤 재조정
    requestAnimationFrame(() => {
      const target = championRefs.current[championName];
      if (target) {
        target.scrollIntoView({
          block: 'center',
          behavior: 'instant',
        });
      }
    });
  }, [open, championName]);

  return (
    <div ref={boxRef} className='relative w-[219px]'>
      {/* ================= 닫힌 상태 ================= */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className='
            h-[50px] px-[14px] py-[9px]
            flex items-center gap-[10px]
            bg-white border-[1px] border-[#8A1F21]
            rounded-[10px] cursor-pointer
          '
        >
          {selectedChampion ? (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              <img
                src={selectedChampion.image}
                alt={selectedChampion.name}
                width={28}
                height={28}
                className='rounded-[5px]'
              />
              <span className='text-[16px] text-[#333]'>{selectedChampion.name}</span>
            </>
          ) : (
            <>
              <Image src={graySearchIcon} alt='searchIcon' width={28} height={28} />
              <span className='text-[16px] text-[#999]'>챔피언 검색</span>
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
              placeholder='챔피언 검색'
              className='w-full bg-transparent outline-none text-[16px]'
            />
          </div>

          {/* 선택 목록 */}
          <div className='flex flex-col gap-[20px] px-[14px] py-[10px] max-h-[285px] overflow-y-auto'>
            {filteredChampions.map((champion) => {
              const isSelected = championName === champion.name;

              return (
                <div
                  key={champion.name}
                  ref={(el) => {
                    championRefs.current[champion.name] = el;
                  }}
                  onClick={() => onClickChampion(champion.name)}
                  className={`
                    flex items-center gap-[12px]
                    min-h-[38px] px-[10px]
                    rounded-[5px] cursor-pointer transition-colors
                    ${isSelected ? 'bg-[#F9E6E6]' : 'hover:bg-[#F3F3F3]'}
                  `}
                >
                  <img
                    src={champion.image}
                    alt={champion.name}
                    width={28}
                    height={28}
                    className='rounded-[5px]'
                  />
                  <span className='text-[18px] text-[#333]'>{champion.name}</span>
                </div>
              );
            })}

            {filteredChampions.length === 0 && (
              <div className='text-[14px] text-[#999] px-[10px] py-[8px]'>검색 결과 없음</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchChampionBox);
