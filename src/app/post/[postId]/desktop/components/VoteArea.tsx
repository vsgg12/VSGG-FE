import React from 'react';
import { useChampion } from '@/hooks/useChampion';

// interface IVoteArea {
//   voteData: IGetInGameInfoType[];
//   isOwner: boolean;
//   post: IGetPostItemType;
//   setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
// }

function VoteArea() {
  const { champions, loading, getImageUrlByName } = useChampion();

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className='vote-area-container'>
      <h2>챔피언 목록 ({champions.length}명)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {champions.map((champion) => (
          <div key={champion.name} style={{ textAlign: 'center' }}>
            <img src={getImageUrlByName('')} alt={champion.name} />
            <p>{champion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteArea;
