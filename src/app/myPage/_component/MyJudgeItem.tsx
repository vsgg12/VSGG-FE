import { useRouter } from 'next/navigation';
import React from 'react';
import VoteStatusCircle from '@/app/myPage/_component/VoteStatusCircle';
import { formatDate } from '@/utils/formatDate';

interface IMyJudgeItemProps {
  myJudgeItem: IVotedPostItem;
}

function MyJudgeItem({ myJudgeItem }: IMyJudgeItemProps) {
  const router = useRouter();

  return (
    <>
      <div
        className='flex justify-between items-center text-xs text-gray-150 cursor-pointer font-medium'
        key={myJudgeItem.id}
        onClick={() => {
          router.push(`/post/${myJudgeItem.id}`);
        }}
      >
        <div className='flex gap-[10px] items-center'>
          <div className='text-gray-700 text-[16px]'>{myJudgeItem.title}</div>
          <VoteStatusCircle
            text={
              myJudgeItem.myVoteResult === null ? myJudgeItem.voteStatus : myJudgeItem.myVoteResult
            }
          />
        </div>

        <div className='flex justify-between w-[390px]'>
          <div className='flex gap-[8px] text-gray-850 w-[240px] justify-center'>
            {myJudgeItem.authorNickname}{' '}
            <span className='text-gray-150'>{myJudgeItem.authorTier}</span>
          </div>
          <div>{formatDate(myJudgeItem.createdDate)}</div>
        </div>
      </div>
      <div className='h-0.5 w-full bg-primary-500 my-[21px]' />
    </>
  );
}

export default MyJudgeItem;
