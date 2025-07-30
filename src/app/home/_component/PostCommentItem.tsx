import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import React from 'react';

interface ICommentProps {
  comment: IGetCommentItemType;
  targetComment?: {
    id: number | null;
    nickname: string;
  } | null;
  handleReply: () => void;
}

export default function PostCommentItem({ comment, targetComment, handleReply }: ICommentProps) {
  const timeAgo = useTimeDifferenceFromNow(comment.createdDateTime);

  const truncateNickname = (nickname: string) => {
    const formattedNickname = nickname.slice(0, 8);
    if (nickname.length <= 8) {
      return formattedNickname;
    }
    return formattedNickname + '...';
  };

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center mb-[5px]'>
        <p className='mr-[5px] text-[14px] text-[#333333] font-semibold'>
          {truncateNickname(comment.member.nickname)}
        </p>
        <p className='text-[14px] text-[#909090] min-w-fit'>{comment.member.tier}</p>
        <p className='text-[12px] text-[#C8C8C8] ml-2 min-w-fit'>| {timeAgo}</p>
      </div>
      <p className='text-[14px] mb-[2px]'>
        {targetComment && <span className='text-[#8A1F21]'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-[#8A1F21]' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
