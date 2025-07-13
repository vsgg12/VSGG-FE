import React, { useCallback } from 'react';

const useProfileTierIcon = () => {
  const getIcon = useCallback((tier: string): JSX.Element => {
    switch (tier) {
      case '언랭':
        return <img src='/svg/sidebar/tier/unrankIcon.svg' width={16} height={16} />;
      case '아이언':
        return <img src='/svg/sidebar/tier/ironIcon.svg' width={16} height={16} />;
      case '브론즈':
        return <img src='/svg/sidebar/tier/bronzeIcon.svg' width={16} height={16} />;
      case '실버':
        return <img src='/svg/sidebar/tier/silverIcon.svg' width={16} height={16} />;
      case '골드':
        return <img src='/svg/sidebar/tier/goldIcon.svg' width={16} height={16} />;
      case '플래티넘':
        return <img src='/svg/sidebar/tier/platinumIcon.svg' width={16} height={16} />;
      case '에메랄드':
        return <img src='/svg/sidebar/tier/emeraldIcon.svg' width={16} height={16} />;
      case '다이아몬드':
        return <img src='/svg/sidebar/tier/diamondIcon.svg' width={16} height={16} />;
      case '마스터':
        return <img src='/svg/sidebar/tier/masterIcon.svg' width={16} height={16} />;
      case '그랜드마스터':
        return <img src='/svg/sidebar/tier/grandMasterIcon.svg' width={16} height={16} />;
      case '챌린저':
        return <img src='/svg/sidebar/tier/challengerIcon.svg' width={16} height={16} />;

      default:
        return <></>;
    }
  }, []);

  return { getIcon };
};

export default useProfileTierIcon;
