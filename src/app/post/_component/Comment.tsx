import Image from 'next/image';
import Icon_more from '../../../../public/svg/Icon_more.svg';

interface ICommentProps {
  comment: IGetCommentItemType;
  deleteComment: () => void;
  isReply?: boolean;
  targetComment?: IGetCommentItemType;
}

export default function Comment({ comment, targetComment, isReply = false }: ICommentProps) {
  return (
    <>
      <div>
        <div className='flex flex-row relative font-medium items-center'>
          <p className='text-[14px] text-[#333333] mr-1'>@</p>
          <p className='mr-[6px] text-[14px] text-[#909090]'>{comment.member.tier}</p>
          <p className='text-[14px] text-[#333333]'>{comment.member.nickname}</p>
          <p className='text-[12px] text-[#C8C8C8] ml-2 flex-grow'>| 1초 전</p>
          <Image src={Icon_more} alt='more' width={12} height={12} className='cursor-pointer' />
        </div>
        <p className='text-[14px]'>
          {isReply && <span className='text-[#8A1F21]'>@{targetComment?.member.nickname} </span>}
          {comment.content}
        </p>
      </div>
    </>
  );
}
