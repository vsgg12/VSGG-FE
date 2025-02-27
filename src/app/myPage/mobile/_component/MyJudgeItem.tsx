import React from 'react';
import VoteStatusCircle from '../../_component/VoteStatusCircle';
import formatDate from '@/utils/formatDate';

function MyJudgeItem_Mobile({ judgeItem }: { judgeItem: IVotedPostItem }) {
  // const router = useRouter();
  return (
    <div className='flex flex-col w-full gap-[4px]'>
      <div className='flex gap-[12px]'>
        <div className='font-medium text-[#333333] text-[12px]'>{judgeItem.authorNickname}</div>
        <div className='text-[12px] font-medium text-[#909090]'>{judgeItem.authorTier}</div>
      </div>
      <div className='flex gap-[12px]'>
        <div className='text-[15px] text-black font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
          {judgeItem.title}
        </div>
        <VoteStatusCircle
          text={judgeItem.myVoteResult === null ? judgeItem.voteStatus : judgeItem.myVoteResult}
        />
      </div>
      <div className='text-[#C8C8C8] text-[12px] font-medium'>
        {formatDate(judgeItem.createdDate)}
      </div>
      <div className='h-0.5 w-full bg-[#8A1F21] my-[15px]' />
    </div>
  );
}

export default MyJudgeItem_Mobile;
