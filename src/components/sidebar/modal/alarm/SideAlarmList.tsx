import { patchAlarm } from '@/api/alarm/patchAlarm';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'moment/locale/ko';
import SideAlarmItem from './SideAlarmItem';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function SideAlarmAlarmList({ alarms = undefined }: IAlarmListProps) {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<number>();
  const { setRouteState } = useSidebarStore();

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
    setRouteState('HOME');
    setPostId(id);
    postAlarm({ accessToken, alarmId, alarmType });
  };

  return (
    <div className='w-full h-full'>
      {!alarms || alarms.length === 0 ? (
        <div className='flex flex-col w-full h-[303px] py-[40px] gap-[30px] items-center'>
          <div className='text-[12px] text-semantic-text-muted'>새로운 알림이 없습니다.</div>
          <img
            src={'/svg/sidebar/alarm/emptyAlarmIcon.svg'}
            width={190}
            height={160}
            alt={'알림없음아이콘'}
          />
        </div>
      ) : (
        <>
          {alarms.map((alarm) => (
            <SideAlarmItem
              alarm={alarm}
              key={`alarm-item-${alarm.alarmId}`}
              handleAlarmItemClick={handleAlarmItemClick}
            />
          ))}
        </>
      )}
    </div>
  );
}
