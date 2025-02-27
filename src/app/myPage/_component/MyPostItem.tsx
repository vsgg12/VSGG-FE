import React from 'react'

import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import VoteStatusCircle from '@/app/myPage/_component/VoteStatusCircle'

interface IMyPostItemProps{
    myPostItem: IGetMyPostItemsType;
}

function MyPostItem({ myPostItem }: IMyPostItemProps) {
    const router = useRouter();

  return (
    <>
      <div
        className='flex justify-between items-center text-[12px] text-[#C3C3C3] cursor-pointer font-medium'
        key={myPostItem.id}
        onClick={() => {
          router.push(`/post/${myPostItem.id}/`);
        }}
      >
        <div className='flex gap-[10px] items-center'>
          <div className='text-[#555555] text-[16px]'>{myPostItem.title}</div>
          <VoteStatusCircle text={myPostItem.voteStatus} />
        </div>

        <div className='flex justify-between w-[310px]'>
          <div className="w-[50px] flex justify-center">{myPostItem.commentNum}</div>
          <div>{formatDate(myPostItem.createdDate)}</div>
        </div>
      </div>
      <div className='h-0.5 w-full bg-[#8A1F21] my-[21px]' />
    </>
  );
}

export default MyPostItem