import { patchCommentAlarm, patchPostAlarm } from '@/api/patchAlarm';
import { getStoredLoginState } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface IAlarmListProps {
  alarms: IAlarmsType[] | undefined;
}

export default function AlarmList({ alarms = undefined }: IAlarmListProps) {
  const router = useRouter();
  const { accessToken } = getStoredLoginState();
  const queryClient = useQueryClient();

  const handleAlarmItemClick = (id: number, alarmType: string) => {
    // 해당 알림 읽음 api 호출
    if (alarmType === 'POST') {
      useMutation({
        mutationFn: () => patchPostAlarm({ accessToken, alarmId: id }),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['alarms'],
          });
        },
      });
    } else {
      useMutation({
        mutationFn: () =>
          patchCommentAlarm({
            accessToken,
            alarmId: id,
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['alarms'],
          });
        },
      });
    }
    router.push(`/post/${id}`);
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
            <div className='flex flex-col gap-[5px] cursor-pointer'>
              {alarms.map((alarm) => (
                <>
                  <div
                    key={alarm.alarmId}
                    className='flex flex-col gap-[3px] px-[5px] w-[305px] relative'
                    onClick={() => handleAlarmItemClick(alarm.postId, alarm.alarmType)}
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
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
