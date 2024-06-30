import { useEffect, useState } from 'react';

interface ICommentProps {
  comment: IGetCommentItemType;
  deleteComment: () => void;
  isReply?: boolean;
  targetComment?: IGetCommentItemType;
}
export default function Comment({
  comment,
  deleteComment,
  targetComment,
  isReply = false,
}: ICommentProps) {
  return (
    <>
      <div>
        <div className='flex flex-row relative font-medium'>
          <div className=' mr-[6px] text-[10px] text-[#333333]'>{comment.member.nickname}</div>
          <div className='text-[10px] text-[#666666]'>{comment.member.tier}</div>
          {/* <p
            className='absolute end-0 text-[10px] text-[#d34747] cursor-pointer'
            onClick={deleteComment}
          >
            삭제
          </p> */}
        </div>

        <div>
          {isReply && <span className='text-[#8A1F21]'>@{targetComment?.member.nickname} </span>}
          {comment.content}
        </div>
      </div>
    </>
  );
}
