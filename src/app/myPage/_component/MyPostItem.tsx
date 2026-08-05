import React from 'react';

import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import VoteStatusCircle from '@/app/myPage/_component/VoteStatusCircle';

interface IMyPostItemProps {
  myPostItem: IGetMyPostItemsType;
}

function MyPostItem({ myPostItem }: IMyPostItemProps) {
  const router = useRouter();

  return (
    <>
      <div
        className='flex justify-between items-center text-[12px] text-gray-150 cursor-pointer font-medium'
        key={myPostItem.id}
        onClick={() => {
          router.push(`/post/${myPostItem.id}/`);
        }}
      >
        <div className='flex gap-[10px] items-center'>
          <div className='text-gray-700 text-[16px]'>{myPostItem.title}</div>
          <VoteStatusCircle text={myPostItem.voteStatus} />
        </div>

        <div className='flex justify-between w-[310px]'>
          <div className='w-[50px] flex justify-center'>{myPostItem.commentNum}</div>
          <div>{formatDate(myPostItem.createdDate)}</div>
        </div>
      </div>
      <div className='h-0.5 w-full bg-primary-500 my-[21px]' />
    </>
  );
}

export default MyPostItem;
