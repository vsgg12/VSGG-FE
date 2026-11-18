import React, { useCallback } from 'react';

interface Props {
  size: number;
}

// 티어 이름 → 아이콘 파일명
// 훅 바깥(모듈 최상단)에 두면 렌더링마다 객체를 새로 만들지 않음
const TIER_ICON: Record<string, string> = {
  언랭: 'unrankIcon',
  아이언: 'ironIcon',
  브론즈: 'bronzeIcon',
  실버: 'silverIcon',
  골드: 'goldIcon',
  플래티넘: 'platinumIcon',
  에메랄드: 'emeraldIcon',
  다이아몬드: 'diamondIcon',
  마스터: 'masterIcon',
  그랜드마스터: 'grandMasterIcon',
  챌린저: 'challengerIcon',
};

const useProfileTierIcon = ({ size = 16 }: Props) => {
  const getIcon = useCallback(
    (tier: string): JSX.Element => {
      const fileName = TIER_ICON[tier];
      if (!fileName) return <></>;

      return (
        <img
          src={`/svg/sidebar/tier/${fileName}.svg`}
          width={size}
          height={size}
          alt={`${tier} 티어`}
        />
      );
    },
    [size], // size가 바뀌면 새 크기로 다시 그리도록
  );

  return { getIcon };
};

export default useProfileTierIcon;
