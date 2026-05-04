import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import { truncateText } from '@/utils/truncateText';

interface ICommentProps {
  comment: IGetCommentItemType;
  targetComment?: {
    id: number | null;
    nickname: string;
  } | null;
  handleReply: () => void;
}

export default function CommentItem({ comment, targetComment, handleReply }: ICommentProps) {
  const { getIcon } = useProfileTierIcon({ size: 14 });
  const timeAgo = useTimeDifferenceFromNow(comment.createdDateTime);

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center mb-[5px]'>
        <div className='flex gap-[4px]'>
          {getIcon(comment.member.tier)}
          <p className='mr-[5px] text-[14px] text-[#333333] font-semibold'>
            {truncateText(comment.member.nickname, 8)}
          </p>
        </div>
        <p className='text-[12px] text-[#C8C8C8] ml-2 min-w-fit'>| {timeAgo}</p>
      </div>
      <p className='text-[14px] mb-[7px]'>
        {targetComment && <span className='text-[#8A1F21]'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-[#8A1F21]' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
