import { useCallback, useMemo } from 'react';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useWriteStore } from '@/store/write/useWriteStore';
import tiers from '@/constants/tier';
import positions from '@/constants/positions';
import { VoteDataType } from '@/app/post/_component/vote/claim/ClaimVoteBox';

interface Props {
  voteCount: number;
  daysUntilEnd: number;
  voteData: IGetInGameInfoType[];
  DUMMY_VOTE_DATA?: VoteDataType[];
}

export const useVoteResult = ({ voteCount, daysUntilEnd, voteData, DUMMY_VOTE_DATA }: Props) => {
  const { isLogin } = useAuthStore();
  const { setIsLoginModalOpen } = useLoginStore();
  const { allChampions } = useWriteStore();

  const isVoteEnd = daysUntilEnd < 0;
  const isNoVote = voteCount === 0;
  // 비로그인 상태이거나, 로그인했지만 투표가 없는 경우 블러 처리 (단, 투표 종료시에는 결과 공개)
  const shouldBlur = (!isLogin || (isLogin && isNoVote)) && !isVoteEnd;

  // 득표율 계산 (소수점 1자리 문자열 반환)
  const getRatio = useCallback(
    (voteNum: number) => {
      if (voteCount === 0) return '0.0';
      return ((voteNum / voteCount) * 100).toFixed(1);
    },
    [voteCount],
  );

  // 챔피언 이름으로 풀 이미지 URL 찾기
  const getChampionImage = useCallback(
    (championName: string) => {
      const champion = allChampions.find((c) => c.name === championName);
      return champion?.fullImage || '';
    },
    [allChampions],
  );

  // 티어 아이콘 찾기
  const getTierIcon = useCallback((tierName: string) => {
    return tiers.find((item) => item.content === tierName)?.svg;
  }, []);

  // 포지션 아이콘 찾기
  const getPositionIcon = useCallback((positionName: string, isHover: boolean = false) => {
    const positionItem = positions.find((item) => item.content === positionName);
    return isHover ? positionItem?.svgW : positionItem?.svg;
  }, []);

  // 득표수(voteNum) 기준으로 내림차순 정렬
  const sortedVoteData = useMemo(() => {
    return [...DUMMY_VOTE_DATA!].sort((a, b) => b.averageRatio - a.averageRatio);
  }, [voteData]);

  // 비율 계산 헬퍼 함수(백분율)
  const getCalculatedRatio = (voteNum: number) => {
    if (voteCount === 0) return '0.0';
    return ((voteNum / voteCount) * 100).toFixed(1);
  };

  return {
    isLogin,
    setIsLoginModalOpen,
    isVoteEnd,
    isNoVote,
    shouldBlur,
    getRatio,
    getChampionImage,
    getTierIcon,
    getPositionIcon,
    sortedVoteData,
    getCalculatedRatio,
  };
};
