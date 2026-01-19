'use client';

import SearchChampionBox from '@/app/post/write/_component/common/search/champion/SearchChampionBox';
import SearchTierBox from '@/app/post/write/_component/common/search/tier/SearchTierBox';
import SearchPositionBox from '@/app/post/write/_component/common/search/position/SearchPositionBox';
import ClaimBox from '@/app/post/write/claim/_component/ClaimBox';

interface Props {
  championName: string;
  setChampionName: (championName: string) => void;
  tier: string;
  setTier: (tier: string) => void;
  position: string;
  setPosition: (position: string) => void;
  claim: string;
  setClaim: (claim: string) => void;
}

const ClaimInfoBox = ({
  championName,
  setChampionName,
  position,
  setPosition,
  tier,
  setTier,
  claim,
  setClaim,
}: Props) => {
  return (
    <div className={'w-full flex flex-col gap-[10px]'}>
      <div className={'flex w-full justify-between'}>
        <SearchChampionBox championName={championName} setChampionName={setChampionName} />
        <SearchTierBox tier={tier} setTier={setTier} />
        <SearchPositionBox position={position} setPosition={setPosition} />
      </div>
      <ClaimBox claim={claim} setClaim={setClaim} />
    </div>
  );
};

export default ClaimInfoBox;
