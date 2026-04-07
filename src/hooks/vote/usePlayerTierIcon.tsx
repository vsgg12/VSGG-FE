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
        return 'text-[#C8C8C8]';
      case '아이언':
        return 'text-[#51484A]';
      case '브론즈':
        return 'text-[#8C513A]';
      case '실버':
        return 'text-[#80989D]';
      case '골드':
        return 'text-[#CD8837]';
      case '플래티넘':
        return 'text-[#54AAD2]';
      case '에메랄드':
        return 'text-[#149C3A]';
      case '다이아몬드':
        return 'text-[#7944E2]';
      case '마스터':
        return 'text-[#A4584E]';
      case '그랜드마스터':
        return 'text-[#756572]';
      case '챌린저':
        return 'text-[#F4C874]';

      default:
        return <></>;
    }
  }, []);

  return { getIcon, getColor };
};

export default usePlayerTierIcon;
