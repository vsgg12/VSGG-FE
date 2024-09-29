import Image from 'next/image';
import Icon_more from '../../../../public/svg/Icon_more.svg';

interface ICommentProps {
  comment: IGetCommentItemType;
  deleteComment: () => void;
  isReply?: boolean;
  targetComment?: IGetCommentItemType;
}

export default function Comment({ comment, targetComment, isReply = false }: ICommentProps) {
  const pastTime: string = comment.createdDateTime;

  function timeDifferenceFromNow(pastTime: string) {
    const currentTime = new Date();
    const pastDate = new Date(pastTime);

    const diffMs: number = currentTime.getTime() - pastDate.getTime(); // 밀리초 단위 시간 차이 (number 타입)

    if (diffMs < 6000) {
      //1분 미만
      return '방금 전';
    } else if (diffMs < 60000) {
      //1시간 미만
      const diffMins = Math.floor(diffMs / (1000 * 60)); // 분 단위로 변환
      return `${diffMins}분 전`;
    } else if (diffMs < 86400000) {
      //24시간 미만
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위로 변환
      return `${diffHours}시간 전`;
    } else if (diffMs < 2592000000) {
      //30일 이하
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 일 단위로 변환
      return `${diffDays}일 전`;
    } else if (diffMs < 31557600000) {
      //12개월 미만
      const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30)); // 월 단위로 변환
      return `${diffMonths}개월 전`;
    } else {
      //12개월 이상
      const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365)); // 년 단위로 변환
      return `${diffYears}년 전`;
    }
  }

  return (
    <div>
      <div className='flex flex-row relative font-medium items-center'>
        <p className='text-[14px] text-[#333333] mr-1'>@</p>
        <p className='mr-[6px] text-[14px] text-[#333333]'>{comment.member.nickname}</p>
        <p className=' text-[14px] text-[#909090]'>{comment.member.tier}</p>
        <p className='text-[12px] text-[#C8C8C8] ml-2 flex-grow'>
          | {timeDifferenceFromNow(pastTime)}
        </p>
        <Image src={Icon_more} alt='more' width={12} height={12} className='cursor-pointer' />
      </div>
      <p className='text-[14px]'>
        {isReply && <span className='text-[#8A1F21]'>@{targetComment?.member.nickname} </span>}
        {comment.content}
      </p>
    </div>
  );
}
