import React from 'react'
import VoteStatusCircle from '../../_component/VoteStatusCircle';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

function MyPostItem_Mobile({ postItem }: { postItem: IGetMyPostItemsType }) {
    const router = useRouter();
  return (
    <div className='flex flex-col w-full gap-[4px] cursor-pointer' onClick={() => router.push(`post/${postItem.id}`)}>
      <div className='flex gap-[8px] items-center'>
        <div className='text-[15px] text-black font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
          {postItem.title}
        </div>
        <div className='text-[15px] font-semibold text-[#D63111]'>
          {'['}
          {postItem.commentNum}
          {']'}
        </div>
        <VoteStatusCircle text={postItem.voteStatus} />
      </div>
      <div className='text-[#C8C8C8] text-[12px] font-medium'>
        {formatDate(postItem.createdDate)}
      </div>
      <div className='h-0.5 w-full bg-[#8A1F21] my-[15px]' />
    </div>
  );
}

export default MyPostItem_Mobile;