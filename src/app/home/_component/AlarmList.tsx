import { useRouter } from 'next/navigation';

interface AlarmListProps {
  alarms: IAlarmsType[];
}

export default function AlarmList({ alarms }: AlarmListProps) {
  const router = useRouter();
  const nickname = localStorage.getItem('nickname');
  const handleAlarmItemClick = (id: number) => {
    // 해당 알림 읽음 api 호출
    router.push(`/post/${id}`);
  };

  const truncateText = (comment: string) => {
    if (comment.length > 44) {
      return comment.slice(0, 43) + '...';
    }
    return comment;
  };

  const formatDate = (dateTime: string) => {
    return dateTime.split('T')[0];
  };

  return (
    <div className='pb-2 overflow-y-auto h-[348px]'>
      <div className='flex flex-col gap-[5px] cursor-pointer'>
        {alarms.map((alarm) => (
          <>
            <div
              key={alarm.alarmId}
              className='flex flex-col gap-[3px] px-[5px] w-[305px] relative'
              onClick={() => handleAlarmItemClick(alarm.postId)}
            >
              <p className='text-[12px] text-[#555555] pr-[50px]'>
                {alarm.alarmType === 'POST'
                  ? `[${nickname}]님이 작성한 게시글의 판결 결과를 확인하세요!`
                  : `[댓글 단 유저 닉네임]님이 글에 댓글을 남겼습니다. \n ${truncateText(alarm.alarmContents)}`}
              </p>
              <p className='text-[10px] text-[#828282]'>{formatDate(alarm.createDateTime)}</p>
              {alarm.isRead === true && (
                <span
                  className='bg-[#8A1F21] rounded-full w-[6px] h-[6px]'
                  style={{
                    position: 'absolute',
                    right: '25px',
                    top: '30%',
                    transform: 'translateY(-10%)',
                  }}
                ></span>
              )}
              <hr className='border-[#8A1F21] my-[10px]' />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
