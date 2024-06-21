import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AlarmListProps {
  alarms: GetAlarmConfirmType[];
}

export default function AlarmList({ alarms }: AlarmListProps) {
  const router = useRouter();
  const [alarmData, setAlarmData] = useState<GetAlarmConfirmType[]>(alarms);

  const handleAlarmItemClick = (id: number) => {
    // 해당 알림의 게시글로 이동해야 함(postId 필요)
    //   router.push(`/post/${postId}`)
  };

  // Group alarms by memberName
  const groupedAlarms = alarms.reduce<{ [key: string]: GetAlarmConfirmType[] }>((acc, alarm) => {
    if (!acc[alarm.memberName]) {
      acc[alarm.memberName] = [];
    }
    acc[alarm.memberName].push(alarm);
    return acc;
  }, {});

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
      {Object.keys(groupedAlarms).map((memberName) => (
        <div key={memberName} className='flex flex-col gap-[4px] mb-[10px]'>
          <div className='flex items-center gap-[5px]'>
            <span className='font-medium text-[#828282] text-[10px]'>@ {memberName}</span>
            <span className='text-[#828282] font-medium text-[10px]'>
              {groupedAlarms[memberName][0].memberTier}
            </span>
          </div>
          <div className='flex flex-col gap-[5px] cursor-pointer'>
            {groupedAlarms[memberName].map((alarm) => (
              <>
                <div
                  key={alarm.id}
                  className='flex flex-col gap-[3px] px-[5px] w-[305px] relative'
                  onClick={() => handleAlarmItemClick(alarm.id)}
                >
                  <p className='text-[12px] text-[#555555] pr-[50px]'>
                    {truncateText(alarm.alarmContents)}
                  </p>
                  <p className='text-[10px] text-[#828282]'>{formatDate(alarm.createdDateTime)}</p>
                  {alarm.alarmType === 'true' && (
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
      ))}
    </div>
  );
}
