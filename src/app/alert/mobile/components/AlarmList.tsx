import { patchAlarm } from '@/api/alarm/patchAlarm';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SideAlarmItem from '@/components/sidebar/modal/alarm/SideAlarmItem';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function AlarmList({ alarms = undefined }: IAlarmListProps) {
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
          <div className='text-[12px] text-gray-500'>새로운 알림이 없습니다.</div>
          <img
            src={'/svg/sidebar/alarm/emptyAlarmIcon.svg'}
            width={190}
            height={160}
            alt={'알림없음아이콘'}
          />
        </div>
      ) : (
        <div className='overflow-y-auto h-full scrollbar-hidden'>
          {alarms.map((alarm) => (
            <SideAlarmItem
              key={`alarm-item-${alarm.alarmId}`}
              alarm={alarm}
              handleAlarmItemClick={handleAlarmItemClick}
              isMobile={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}