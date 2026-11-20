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
          <p className='mr-[5px] text-[14px] font-semibold text-semantic-text-primary'>
            {truncateText(comment.member.nickname, 8)}
          </p>
          <p className='min-w-fit text-[12px] font-medium text-semantic-text-disabled'>{timeAgo}</p>
        </div>
      </div>
      <p className='text-[14px] mb-[2px]'>
        {targetComment && <span className='text-primary-500'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-primary-500' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
