import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import React from 'react';
import { truncateText } from '@/utils/truncateText';

interface ICommentProps {
  comment: IGetCommentItemType;
  targetComment?: {
    id: number | null;
    nickname: string;
  } | null;
  handleReply: () => void;
}

export default function PostCommentItem({ comment, targetComment, handleReply }: ICommentProps) {
  const { getIcon } = useProfileTierIcon({ size: 14 });
  const timeAgo = useTimeDifferenceFromNow(comment.createdDateTime);

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center mb-[5px]'>
        <div className='flex gap-[4px]'>
          {getIcon(comment.member.tier)}
          <p className='mr-[5px] text-[14px] text-[#242526] font-semibold'>
            {truncateText(comment.member.nickname, 8)}
          </p>
          <p className='text-[12px] text-[#D7D8D9] font-medium min-w-fit'>{timeAgo}</p>
        </div>
      </div>
      <p className='text-[14px] mb-[2px]'>
        {targetComment && <span className='text-[#E20A29]'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-[#E20A29]' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
