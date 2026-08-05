import React from 'react';

interface Props {
  type: 'selectMethod' | 'uploadVideo';
}

function DescriptionBox({ type }: Props) {
  return (
    <div className='w-[545px] h-[144px] rounded-[10px] bg-white border-[0.5px] border-gray-150 shadow-[0px_3px_3px_0px_var(--color-shadow-soft)]'>
      {type === 'selectMethod' ? (
        <div className='text-gray-600 text-[18px] w-full h-full flex flex-col items-center justify-center'>
          <p>
            <span className='text-gray-900'>파일 첨부</span> : mp4 파일 첨부 (최대 500MB)
          </p>
          <p>
            <span className='text-gray-900'>유튜브 링크</span> : 유튜브 영상 URL 복사
          </p>
        </div>
      ) : (
        <div className='text-gray-600 text-[16px] w-full h-full flex flex-col justify-center items-center'>
          <p>
            <span className='text-gray-900'>영상 크기</span> : 최대 500MB
          </p>
          <p>
            <span className='text-gray-900'>영상 형식</span> : mp4
          </p>
        </div>
      )}
    </div>
  );
}

export default DescriptionBox;
