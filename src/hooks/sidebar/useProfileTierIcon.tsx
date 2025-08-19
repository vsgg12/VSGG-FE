import React, { useCallback } from 'react';

interface Props {
  size: number;
}

const useProfileTierIcon = ({ size = 16 }: Props) => {
  const getIcon = useCallback((tier: string): JSX.Element => {
    switch (tier) {
      case '언랭':
        return <img src='/svg/sidebar/tier/unrankIcon.svg' width={size} height={size} />;
      case '아이언':
        return <img src='/svg/sidebar/tier/ironIcon.svg' width={size} height={size} />;
      case '브론즈':
        return <img src='/svg/sidebar/tier/bronzeIcon.svg' width={size} height={size} />;
      case '실버':
        return <img src='/svg/sidebar/tier/silverIcon.svg' width={size} height={size} />;
      case '골드':
        return <img src='/svg/sidebar/tier/goldIcon.svg' width={size} height={size} />;
      case '플래티넘':
        return <img src='/svg/sidebar/tier/platinumIcon.svg' width={size} height={size} />;
      case '에메랄드':
        return <img src='/svg/sidebar/tier/emeraldIcon.svg' width={size} height={size} />;
      case '다이아몬드':
        return <img src='/svg/sidebar/tier/diamondIcon.svg' width={size} height={size} />;
      case '마스터':
        return <img src='/svg/sidebar/tier/masterIcon.svg' width={size} height={size} />;
      case '그랜드마스터':
        return <img src='/svg/sidebar/tier/grandMasterIcon.svg' width={size} height={size} />;
      case '챌린저':
        return <img src='/svg/sidebar/tier/challengerIcon.svg' width={size} height={size} />;

      default:
        return <></>;
    }
  }, []);

  return { getIcon };
};

export default useProfileTierIcon;
