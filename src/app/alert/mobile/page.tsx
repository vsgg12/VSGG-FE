'use client';

import getAlarms from '@/api/getAlarms';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../login/store/useAuthStore';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import AlarmList from '../../home/_component/AlarmList';
import Loading from '@/components/Loading';
import { useMobileVersionStore } from '@/store/useMobileVersionStore';
import { useRouter } from 'next/navigation';

const alarmTypes = [
  { type: '전체', value: 'ALL' },
  { type: '판결', value: 'POST' },
  { type: '댓글', value: 'COMMENT' },
];

function Alert() {
  const [alarmType, setAlarmType] = useState<string>('전체');
  const { accessToken, isLogin } = useAuthStore();
  const { data: alarmsData, isLoading } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin,
  });
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const { isMobileVersion } = useMobileVersionStore.getState();
  const router = useRouter();

  useEffect(() => {
    if (isMobileVersion === false) {
      router.replace('/home');
    }
    setIsPageLoading(false);
  }, []);

  const filteredAlarms =
    alarmsData?.alarmList && alarmType !== '전체'
      ? alarmsData.alarmList.filter(
          (alarm) => alarm.alarmType === alarmTypes.find((at) => at.type === alarmType)?.value,
        )
      : alarmsData?.alarmList;

  return (
    <div className='pb-[20px] h-[100dvh]'>
      {isPageLoading ? (
        <div className='w-full items-center flex h-full'>
          <Loading />
        </div>
      ) : (
        <>
          <MobileHeader headerTitle='알림' />
          <div className='mobile-layout flex flex-col flex-grow items-center px-[20px] py-[20px] mobile-scroll'>
            <div className='w-full h-[32px] border-b-1 border-[#ECECEC] flex mb-[20px]'>
              {alarmTypes.map((alarm, idx) => (
                <div
                  className={`h-full flex items-center justify-center cursor-pointer text-[18px] font-semibold ${alarm.type === alarmType ? 'text-black border-b-2 border-black rounded-sm' : 'text-[#AAAAAA]'}`}
                  style={{ width: 'calc(100% / 3)' }}
                  key={idx}
                  onClick={() => setAlarmType(alarm.type)}
                >
                  {alarm.type}
                </div>
              ))}
            </div>
            {isLoading ? (
              <div className='flex flex-grow h-full justify-center items-center'>
                <Loading />
              </div>
            ) : (
              <div className='w-full h-[750px] overflow-auto' >
                <AlarmList alarms={filteredAlarms} />
              </div>
            )}
            {filteredAlarms && (
              <div className='relative mt-[10px]'>
                <div className='border-b-1 border-[#8A1F21] w-[301px]' />
                <span
                  className='text-[#828282] font-medium text-[10px] bg-[#F3F3F3] px-2 whitespace-nowrap'
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  최대 14일 전까지의 알림을 확인할 수 있어요
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Alert;
