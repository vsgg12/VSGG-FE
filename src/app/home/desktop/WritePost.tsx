import React from 'react';
import Default_Profile from '../../../../public/svg/defaultProfile.svg';
import Image from 'next/image';

interface Props {
  handleWriteClick: () => void;
  isListed: boolean;
}
function WritePost({ handleWriteClick, isListed }: Props) {
  return (
    <div className={`${isListed ? 'w-full' : 'w-[586px]'} h-[158px] flex gap-[10px] items-start`}>
      <Image src={Default_Profile} width={48} height={48} alt='profile' />
      <div className='flex h-[158px] w-full min-w-[586px] flex-col gap-[15px] rounded-[20px] bg-semantic-background-surface p-[20px] text-semantic-text-primary shadow'>
        <div className='flex flex-col gap-[15px]'>
          <p className='text-[16px] font-medium text-semantic-text-secondary'>
            우리 팀 플레이의 과실이 궁금하다면?
          </p>
          <p className='whitespace-pre-line text-[14px] text-semantic-text-disabled'>
            {`바텀 다이브 왜 안 함? 한타 구도가 이게 맞아? 진짜 너무 억울함 \n 우리팀이 넘 밉다..........`}
          </p>
        </div>
        <button
          className='flex h-[27px] w-[96px] items-center justify-center self-end rounded-[20px] bg-semantic-text-primary p-[10px] text-[14px] text-semantic-text-inverse'
          onClick={handleWriteClick}
        >
          글 작성하기
        </button>
      </div>
    </div>
  );
}

export default WritePost;
