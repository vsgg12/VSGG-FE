import { patchAlarm } from '@/api/patchAlarm';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function AlarmList({ alarms = undefined }: IAlarmListProps) {
  const router = useRouter();
  const { accessToken } = useAuthStore.getState();
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<number>();

  const { mutate: postAlarm } = useMutation({
    mutationFn: ({
      alarmId,
      alarmType,
      accessToken,
    }: {
      alarmId: number;
      alarmType: string;
      accessToken: string;
    }) => patchAlarm(accessToken, alarmId, alarmType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alarms'],
      });
      router.push(`/post/${postId}`);
    },
  });

  const handleAlarmItemClick = (alarmId: number, alarmType: string, id: number) => {
    setPostId(id);
    postAlarm({ accessToken, alarmId, alarmType });
  };

  const truncateText = (comment: string) => {
    if (comment.length > 44) {
      return comment.slice(0, 43) + '...';
    }
    return comment;
  };

  const extractNickname = (alarmContents: string) => {
    const nicknameEndIndex = alarmContents.indexOf('님');
    return nicknameEndIndex !== -1 ? alarmContents.slice(0, nicknameEndIndex) : '익명';
  };

  const formatDate = (dateTime: string) => {
    return moment(dateTime).format('MM월 DD일');
  };

  return (
    <div className='w-full h-full'>
      {!alarms || alarms.length === 0 ? (
        <p className='flex flex-grow h-full justify-center items-center'>새로운 알람이 없습니다!</p>
      ) : (
        <>
          <div className='pb-2 overflow-y-auto h-full scrollbar-hidden'>
            <div>
              {alarms.map((alarm, index) => (
                <div className='flex flex-col gap-[5px] cursor-pointer' key={index}>
                  <div
                    className='flex flex-col gap-[3px] px-[5px] w-full relative'
                    onClick={() =>
                      handleAlarmItemClick(alarm.alarmId, alarm.alarmType, alarm.postId)
                    }
                  >
                    {alarm.alarmType === 'COMMENT' && (
                      <div className='text-[10px] text-[#555555]'>
                        @ {extractNickname(alarm.alarmContents)}
                      </div>
                    )}

                    <p className='text-[12px] text-[#555555] pr-[50px]'>
                      {alarm.alarmType === 'POST'
                        ? `${truncateText(alarm.alarmContents)}`
                        : `${truncateText(alarm.commentContent)}`}
                    </p>
                    <p className='text-[10px] text-[#828282]'>{formatDate(alarm.createdDateTime)}</p>
                    {alarm.isRead === false && (
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
