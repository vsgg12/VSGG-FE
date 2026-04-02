import { useCallback, useMemo } from 'react';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useWriteStore } from '@/store/write/useWriteStore';
import tiersData from '@/constants/tier';
import positions from '@/constants/positions';

interface Props {
  voteCount: number;
  daysUntilEnd: number;
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  isVote: boolean;
}

export const useVoteResult = ({ voteCount, daysUntilEnd, voteData, isOwner, isVote }: Props) => {
  const { isLogin } = useAuthStore();
  const { setIsLoginModalOpen } = useLoginStore();
  const { allChampions } = useWriteStore();
  const { tiers } = tiersData;

  const isVoteEnd = daysUntilEnd < 0;
  const isNoVote = voteCount === 0; // 아무도 투표를 안했을경우

  const checkShouldBlur = () => {
    // 1. 투표 마감 전/후 상관없이 비로그인 상태면 무조건 블러
    if (!isLogin) return true;

    // 2. 투표 마감 전일 때: 내 게시글이 아니고, 내가 투표도 안 했으면 블러
    if (!isVoteEnd) {
      return !isOwner && !isVote;
    }

    // 3. 투표 마감 후일 때: (위에서 비로그인을 걸렀으므로) 무조건 보임
    return false;
  };

  const shouldBlur = checkShouldBlur();

  // 득표율 계산 (소수점 1자리 문자열 반환)
  const getRatio = useCallback((voteCount: number) => {
    if (voteCount === 0) return '0.0';
    return ((voteCount / voteCount) * 100).toFixed(1);
  }, []);

  // 챔피언 이름으로 풀 이미지 URL 찾기
  const getChampionImage = useCallback(
    (championName: string) => {
      const champion = allChampions.find((c) => c.name === championName);
      return champion?.fullImage || '';
    },
    [allChampions],
  );

  // 티어 아이콘 찾기
  const getTierIcon = useCallback(
    (tierName: string) => {
      return tiers.find((item) => item.content === tierName)?.svg;
    },
    [tiers],
  );

  // 포지션 아이콘 찾기
  const getPositionIcon = useCallback((positionName: string, isHover: boolean = false) => {
    const positionItem = positions.find((item) => item.content === positionName);
    return isHover ? positionItem?.svgW : positionItem?.svg;
  }, []);

  // 득표수(voteCount) 기준으로 내림차순 정렬
  const sortedVoteData = useMemo(() => {
    return [...voteData!].sort((a, b) => b.averageRatio - a.averageRatio);
  }, [voteData]);

  // 비율 계산 헬퍼 함수(백분율)
  const getCalculatedRatio = (voteCount: number) => {
    if (voteCount === 0) return '0.0';
    return ((voteCount / voteCount) * 100).toFixed(1);
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
