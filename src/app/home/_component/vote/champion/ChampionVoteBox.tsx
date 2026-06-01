'use client';

import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import { useVoteResult } from '@/hooks/vote/useVoteResult';
import ChampionVoteResultItem from '@/app/home/_component/vote/champion/ChampionVoteResultItem';

interface Props {
  voteData: IGetInGameInfoType[];
  voteCount: number;
  daysUntilEnd: number;
  isOwner: boolean;
  isVote: boolean;
  isHome?: boolean;
}

const ChampionVoteBox = ({
  voteData,
  voteCount,
  daysUntilEnd,
  isOwner,
  isVote,
  isHome = false,
}: Props) => {
  const [isHover, setIsHover] = useState<number>(0);

  const {
    shouldBlur,
    isLogin,
    isVoteEnd,
    isNoVote,
    setIsLoginModalOpen,
    getChampionImage,
    sortedVoteData,
  } = useVoteResult({ voteCount, daysUntilEnd, voteData, isOwner, isVote });

  // 2. 아이템 갯수에 따른 동적 Gap 클래스 계산 (아이템 갯수에 따라 간격 조절)
  const listGapClass = useMemo(() => {
    const count = sortedVoteData.length;
    if (count >= 5) return 'gap-[12px]';
    if (count === 4) return 'gap-[24px]';
    if (count === 3) return 'gap-[36px]';
    return 'gap-[48px]';
  }, [sortedVoteData.length]);

  // 현재 호버된 아이템
  const currentHoverItem = sortedVoteData[isHover] || sortedVoteData[0];
  const backgroundImage = currentHoverItem ? getChampionImage(currentHoverItem.championName) : '';

  return (
    <div
      className={`relative ${isHome ? 'w-[526px] h-[253px]' : 'w-[659px] h-[359px]'} rounded-[16px] overflow-hidden bg-gray-900`}
    >
      {/* 컨텐츠 영역 (조건부 Blur 적용 대상) */}
      <div
        className={clsx(
          'w-full h-full px-[50px] py-[10px] transition-all duration-300',
          shouldBlur && 'blur-[8px] opacity-60 pointer-events-none',
        )}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 실제 리스트 및 텍스트 */}
        <div className='relative z-10 w-full h-full flex justify-between items-center '>
          <div
            className={clsx('w-[230px] h-full flex flex-col justify-center', listGapClass)}
            onMouseLeave={() => setIsHover(0)}
          >
            {sortedVoteData.map((item, idx) => (
              <div key={item.inGameInfoId} onMouseEnter={() => setIsHover(idx)}>
                <ChampionVoteResultItem voteItem={item} isHover={isHover === idx} isHome={true} />
              </div>
            ))}
          </div>

          <div className='flex flex-col text-white items-end self-end pb-[10px]'>
            <div className='text-[40px] font-bold'>
              {(currentHoverItem?.averageRatio ?? 0).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* 안내 문구 및 버튼 */}
      {shouldBlur && (
        <div className='absolute inset-0 flex flex-col justify-center items-center z-50 text-white gap-4'>
          {isOwner && isNoVote && !isVoteEnd ? (
            <div className='text-[20px] font-bold drop-shadow-lg'>
              아직 투표한 사람이 없는 게시글입니다.
            </div>
          ) : (!isLogin || isHome) && !isOwner ? (
            <>
              <div
                className={`flex flex-col items-center gap-1 drop-shadow-lg ${isHome ? 'text-[12px]' : 'text-[20px]'} font-bold`}
              >
                <p>판결이 궁금하시다구요?</p>
                <p>판결에 참여하고, 결과를 확인하세요</p>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`bg-[#E20A29] hover:bg-[#a02426] text-white w-[173px] h-[41px] rounded-[5px] font-extrabold ${isHome ? 'text-[16px]' : 'text-[18px]'} transition-colors shadow-xl cursor-pointer`}
              >
                지금 바로 판결하기
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ChampionVoteBox;
