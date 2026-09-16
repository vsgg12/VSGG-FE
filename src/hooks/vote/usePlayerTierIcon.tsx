import React, { useCallback } from 'react';

interface Props {
  size: number;
}

const usePlayerTierIcon = ({ size = 16 }: Props) => {
  const getIcon = useCallback((tier: string): JSX.Element => {
    switch (tier) {
      case '언랭':
        return <img src='/svg/vote/tier/unrank.svg' width={size} height={size} />;
      case '아이언':
        return <img src='/svg/vote/tier/iron.svg' width={size} height={size} />;
      case '브론즈':
        return <img src='/svg/vote/tier/bronze.svg' width={size} height={size} />;
      case '실버':
        return <img src='/svg/vote/tier/silver.svg' width={size} height={size} />;
      case '골드':
        return <img src='/svg/vote/tier/gold.svg' width={size} height={size} />;
      case '플래티넘':
        return <img src='/svg/vote/tier/platinum.svg' width={size} height={size} />;
      case '에메랄드':
        return <img src='/svg/vote/tier/emerald.svg' width={size} height={size} />;
      case '다이아몬드':
        return <img src='/svg/vote/tier/diamond.svg' width={size} height={size} />;
      case '마스터':
        return <img src='/svg/vote/tier/master.svg' width={size} height={size} />;
      case '그랜드마스터':
        return <img src='/svg/vote/tier/grandMaster.svg' width={size} height={size} />;
      case '챌린저':
        return <img src='/svg/vote/tier/challenger.svg' width={size} height={size} />;

      default:
        return <></>;
    }
  }, []);

  const getColor = useCallback((tier: string) => {
    switch (tier) {
      case '언랭':
        return 'text-tier-unrank';
      case '아이언':
        return 'text-tier-iron';
      case '브론즈':
        return 'text-tier-bronze';
      case '실버':
        return 'text-tier-silver';
      case '골드':
        return 'text-tier-gold';
      case '플래티넘':
        return 'text-tier-platinum';
      case '에메랄드':
        return 'text-tier-emerald';
      case '다이아몬드':
        return 'text-tier-diamond';
      case '마스터':
        return 'text-tier-master';
      case '그랜드마스터':
        return 'text-tier-grand-master';
      case '챌린저':
        return 'text-tier-challenger';

      default:
        return <></>;
    }
  }, []);

  return { getIcon, getColor };
};

export default usePlayerTierIcon;
