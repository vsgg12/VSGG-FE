import SearchChampionBox from '@/app/post/write/_component/common/SearchChampionBox';
import SearchTierBox from '@/app/post/write/_component/common/SearchTierBox';
import SearchPositionBox from '@/app/post/write/_component/common/SearchPositionBox';

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
