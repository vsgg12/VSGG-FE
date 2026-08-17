import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
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
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const timeAgo = useTimeDifferenceFromNow(comment.createdDateTime);
  const nicknameClass = isDarkMode ? 'text-[#F1F2F2]' : 'text-gray-850';
  const contentClass = isDarkMode ? 'text-[#F1F2F2]' : 'text-gray-850';
  const metaClass = isDarkMode ? 'text-[#787C80]' : 'text-gray-150';

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center mb-[5px]'>
        <div className='flex gap-[4px]'>
          {getIcon(comment.member.tier)}
          <p className={`mr-[5px] text-[14px] font-semibold ${nicknameClass}`}>
            {truncateText(comment.member.nickname, 8)}
          </p>
          <p className={`text-[12px] font-medium min-w-fit ${metaClass}`}>{timeAgo}</p>
        </div>
      </div>
      <p className={`text-[14px] font-normal mb-[7px] ${contentClass}`}>
        {targetComment && <span className='text-primary-500'>@{comment.parentMemberNickname} </span>}
        <span className='whitespace-pre-wrap'>{comment.content}</span>
      </p>
      <button className='text-[12px] font-medium text-primary-500' onClick={() => handleReply()}>
        답글 달기
      </button>
    </div>
  );
}
