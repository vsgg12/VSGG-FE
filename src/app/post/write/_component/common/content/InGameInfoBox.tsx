'use client';

import SearchChampionBox from '@/app/post/write/_component/common/search/champion/SearchChampionBox';
import SearchTierBox from '@/app/post/write/_component/common/search/tier/SearchTierBox';
import SearchPositionBox from '@/app/post/write/_component/common/search/position/SearchPositionBox';

interface Props {
  championName: string;
  setChampionName: (championName: string) => void;
  tier: string;
  setTier: (tier: string) => void;
  position: string;
  setPosition: (position: string) => void;
}

const InGameInfoBox = ({
  championName,
  setChampionName,
  position,
  setPosition,
  tier,
  setTier,
}: Props) => {
  return (
    <div className={'flex justify-between w-full'}>
      <SearchChampionBox championName={championName} setChampionName={setChampionName} />
      <SearchTierBox tier={tier} setTier={setTier} />
      <SearchPositionBox position={position} setPosition={setPosition} />
    </div>
  );
};

export default InGameInfoBox;
