import { patchAlarm } from '@/api/patchAlarm';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'moment/locale/ko';
import SideAlarmItem from './SideAlarmItem';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function SideAlarmAlarmList({ alarms = undefined }: IAlarmListProps) {
  const router = useRouter();
  const { accessToken } = useAuthStore();
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

  return (
    <div className='w-full h-full'>
      {!alarms || alarms.length === 0 ? (
        <div className='flex flex-col w-full h-[303px] py-[40px] gap-[30px] items-center'>
          <div className='text-[12px] text-[#888888]'>새로운 알림이 없습니다.</div>
          <div className='flex flex-row'>
            <img src={'/svg/sidebar/alarm/emptyAlarmLine.svg'} width={6} height={179} />
            <img
              src={'/svg/sidebar/alarm/emptyAlarmIcon.svg'}
              width={190}
              height={160}
              alt={'알림없음아이콘'}
            />
          </div>
        </div>
      ) : (
        <>
          <div className='pb-2 overflow-y-auto h-full flex-grow scrollbar-hidden'>
            <div>
              {alarms.map((alarm) => (
                <SideAlarmItem
                  alarm={alarm}
                  key={`alarm-item-${alarm.alarmId}`}
                  handleAlarmItemClick={handleAlarmItemClick}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
