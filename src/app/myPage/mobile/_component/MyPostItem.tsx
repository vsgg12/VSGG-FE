import React from 'react'
import VoteStatusCircle from '../../_component/VoteStatusCircle';
import formatDate from '@/utils/formatDate';

function MyPostItem_Mobile({ postItem }: { postItem: IGetMyPostItemsType }) {
    // const router = useRouter();
  return (
    <div className="flex flex-col w-full gap-[4px]">
      <div className="flex gap-[12px]">
        <div className="font-medium text-[#333333] text-[12px]">댓글수</div>
        <div className="text-[12px] font-medium text-[#909090]">{postItem.commentNum}</div>
      </div>
      <div className="flex gap-[12px]">
        <div className="text-[15px] text-black font-semibold">{postItem.title}</div>
        <VoteStatusCircle text={postItem.voteStatus} />
      </div>
      <div className="text-[#C8C8C8] text-[12px] font-medium">
        {formatDate(postItem.createdDate)}
      </div>
      <div className='h-0.5 w-full bg-[#8A1F21] my-[15px]' />
    </div>
  );
}

export default MyPostItem_Mobile;