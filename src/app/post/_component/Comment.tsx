interface ICommentProps {
  comment: IGetCommentItemType;
  isReply?: boolean;
  targetNickname?: string;
}

export default function Comment({ comment }: ICommentProps) {
  const pastTime: string = comment.createdDateTime;

  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const ONE_MONTH = 2592000000;
  const ONE_YEAR = 31557600000;

  function timeDifferenceFromNow(pastTime: string) {
    const currentTime = new Date();
    const pastDate = new Date(pastTime);

    const diffMs: number = currentTime.getTime() - pastDate.getTime(); // 밀리초 단위 시간 차이 (number 타입)

    if (diffMs < ONE_MINUTE) return '방금 전';
    if (diffMs < ONE_HOUR) return `${Math.floor(diffMs / ONE_MINUTE)}분 전`;
    if (diffMs < ONE_DAY) return `${Math.floor(diffMs / ONE_HOUR)}시간 전`;
    if (diffMs < ONE_MONTH) return `${Math.floor(diffMs / ONE_DAY)}일 전`;
    if (diffMs < ONE_YEAR) return `${Math.floor(diffMs / ONE_MONTH)}개월 전`;
    return `${Math.floor(diffMs / ONE_YEAR)}년 전`;
  }

  return (
    <div>
      <div className='flex flex-row relative font-medium items-start'>
        <p className='mr-[5px] text-[13px] text-[#333333] mb-[5px]'>@{comment.member.nickname}</p>
        <p className='text-[12px] text-[#909090] min-w-fit'>{comment.member.tier}</p>
        <p className='text-[12px] text-[#C8C8C8] ml-2 flex-grow min-w-fit'>
          | {timeDifferenceFromNow(pastTime)}
        </p>
      </div>
      <p className='text-[14px]'>
        {/* {isReply && <span className='text-[#8A1F21]'>@{targetNickname} </span>} */}
        <span className='whitespace-pre-wrap'>
          {comment.content}
          <br />
        </span>
      </p>
    </div>
  );
}
