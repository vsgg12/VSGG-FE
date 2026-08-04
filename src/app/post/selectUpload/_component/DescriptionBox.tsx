import React from 'react';

interface Props {
  type: 'selectMethod' | 'uploadVideo';
}

function DescriptionBox({ type }: Props) {
  return (
    <div className='h-[144px] w-[545px] rounded-[10px] border-[0.5px] border-semantic-border-default bg-semantic-background-surface shadow-[0px_3px_3px_0px_var(--color-shadow-soft)]'>
      {type === 'selectMethod' ? (
        <div className='flex h-full w-full flex-col items-center justify-center text-[18px] text-semantic-text-secondary'>
          <p>
            <span className='text-semantic-text-primary'>파일 첨부</span> : mp4 파일 첨부 (최대
            500MB)
          </p>
          <p>
            <span className='text-semantic-text-primary'>유튜브 링크</span> : 유튜브 영상 URL 복사
          </p>
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center text-[16px] text-semantic-text-secondary'>
          <p>
            <span className='text-semantic-text-primary'>영상 크기</span> : 최대 500MB
          </p>
          <p>
            <span className='text-semantic-text-primary'>영상 형식</span> : mp4
          </p>
        </div>
      )}
    </div>
  );
}

export default DescriptionBox;
