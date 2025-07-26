import React from 'react';
import Default_Profile from '../../../../public/svg/defaultProfile.svg';
import Image from 'next/image';

interface Props {
  handleWriteClick: () => void;
}
function WritePost({ handleWriteClick }: Props) {
  return (
    <div className='w-[644px] h-[158px] flex gap-[10px] items-start'>
      <Image src={Default_Profile} width={48} height={48} alt='profile' />
      <div className='w-[586px] h-[158px] bg-[#FFFFFF] flex flex-col p-[20px] rounded-[20px] gap-[15px]'>
        <div className='flex flex-col gap-[15px]'>
          <p className='text-[16px] text-[#555555]'>우리 팀 플레이의 과실이 궁금하다면?</p>
          <p className='text-[14px] text-[#C8C8C8] whitespace-pre-line'>
            {`바텀 다이브 왜 안 함? 한타 구도가 이게 맞아? 진짜 너무 억울함 \n 우리팀이 넘 밉다..........`}
          </p>
        </div>
        <button
          className='w-[96px] h-[27px] flex items-center justify-center p-[10px] bg-[#222222] rounded-[20px] text-[14px] text-[#FFFFFF] self-end'
          onClick={handleWriteClick}
        >
          글 작성하기
        </button>
      </div>
    </div>
  );
}

export default WritePost;
