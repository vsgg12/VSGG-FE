import { IPatchAlarm, patchAlarm } from '@/api/patchAlarm';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function AlarmList({ alarms = undefined }: IAlarmListProps) {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: postAlarm } = useMutation({
    mutationFn: (params: IPatchAlarm) => patchAlarm(params),
    onSuccess: () => {
      console.log('알람 업데이트 성공');
      queryClient.invalidateQueries({
        queryKey: ['alarms'],
      });
    },
  });

  const handleAlarmItemClick = (alarmId: number, alarmType: string, postId: number) => {
    postAlarm({ accessToken, alarmId, alarmType });
    router.push(`/post/${postId}`);
  };

  const truncateText = (comment: string) => {
    if (comment.length > 44) {
      return comment.slice(0, 43) + '...';
    }
    return comment;
  };

  const formatDate = (dateTime: string) => {
    return moment(dateTime).format('YYYY-MM-DD');
  };

  return (
    <>
      {!alarms || alarms.length === 0 ? (
        <p className='flex flex-grow h-[348px] justify-center items-center'>
          새로운 알람이 없습니다!
        </p>
      ) : (
        <>
          <div className='pb-2 overflow-y-auto h-[348px]'>
            <div>
              {alarms.map((alarm, index) => (
                <div className='flex flex-col gap-[5px] cursor-pointer' key={index}>
                  <div
                    className='flex flex-col gap-[3px] px-[5px] w-[305px] relative'
                    onClick={() =>
                      handleAlarmItemClick(alarm.alarmId, alarm.alarmType, alarm.postId)
                    }
                  >
                    <p className='text-[12px] text-[#555555] pr-[50px]'>
                      {alarm.alarmType === 'POST'
                        ? `${truncateText(alarm.alarmContents)}`
                        : `${truncateText(alarm.alarmContents + '\n' + alarm.commentContent)}`}
                    </p>
                    <p className='text-[10px] text-[#828282]'>{formatDate(alarm.createDateTime)}</p>
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
    </>
  );
}
