import React, { Dispatch, SetStateAction } from 'react';
import { useChampion } from '@/hooks/useChampion';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function VoteArea({ voteData, isOwner, post, setIsLoginModalOpen }: IVoteArea) {
  // 커스텀 훅에서 데이터와 이미지 변환 함수를 가져옵니다.
  const { champions, loading, getImageUrlByName } = useChampion();

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className='vote-area-container'>
      <h2>챔피언 목록 ({champions.length}명)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {champions.map((champion) => (
          <div key={champion.name} style={{ textAlign: 'center' }}>
            {/* 훅에서 가져온 getImageUrlByName 함수에 챔피언 이름을 전달합니다. */}
            <img
              src={getImageUrlByName('')}
              alt={champion.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px', // 약간의 라운드 처리는 시각적으로 더 좋습니다.
                objectFit: 'cover',
              }}
            />
            <p style={{ fontSize: '12px', marginTop: '5px' }}>{champion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteArea;
