import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import { truncateText } from '@/utils/truncateText';

interface ICommentProps {
  comment: IGetCommentItemType;
  targetComment?: {
    id: number | null;
    nickname: string;
  };
  handleReply: () => void;
}

export default function CommentMobile({ comment, targetComment, handleReply }: ICommentProps) {
  const timeAgo = useTimeDifferenceFromNow(comment.createdDateTime);

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center mb-[5px]'>
        <p className='mr-[5px] text-[14px] text-[#333333] whitespace-nowrap font-semibold'>
          {truncateText(comment.member.nickname, 8)}
        </p>
        <p className='text-[12px] text-[#C8C8C8] min-w-fit'>{timeAgo}</p>
      </div>
      <p className='text-[14px] mb-[7px]'>
        {targetComment && <span className='text-[#E20A29]'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-[#E20A29]' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
