'use client';

import getAlarms from '@/api/alarm/getAlarms';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../login/store/useAuthStore';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import AlarmList from './components/AlarmList';

const alarmTypes = [
  { type: '전체', value: 'ALL' },
  { type: '댓글', value: 'COMMENT' },
  { type: '판결', value: 'POST' },
];

function Alert() {
  const [alarmType, setAlarmType] = useState<string>('전체');
  const { accessToken } = useAuthStore.getState();
  const { data: alarmsData, isLoading } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: !!accessToken,
  });
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [accessToken, router]);

  const filteredAlarms =
    alarmsData?.alarmList && alarmType !== '전체'
      ? alarmsData.alarmList.filter(
          (alarm) => alarm.alarmType === alarmTypes.find((at) => at.type === alarmType)?.value,
        )
      : alarmsData?.alarmList;

  return (
    <div className='pb-[20px] h-[100dvh] bg-white'>
      <MobileHeader headerTitle='알림' />
      <div className='mobile-layout flex flex-col flex-grow items-center pt-[40px] pb-[20px] mobile-scroll !bg-white'>
        {/* 탭 영역 */}
        <div className='w-full border-b border-[#ECECEC] flex justify-center mb-[30px]'>
          {alarmTypes.map((alarm, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center cursor-pointer text-[18px] font-medium px-[20px] h-[31px]
              ${alarm.type === alarmType ? 'text-[#E20A29] border-b-2 border-[#E20A29]' : 'text-[#AAAAAA]'}`}
              style={{ width: 'calc(100% / 3)' }}
              onClick={() => setAlarmType(alarm.type)}
            >
              {alarm.type}
            </div>
          ))}
        </div>

        {/* 알림 목록 */}
        {isLoading ? (
          <div className='flex flex-grow h-full justify-center items-center'>
            <Loading />
          </div>
        ) : (
          <div className='w-full h-[750px] overflow-auto'>
            <AlarmList alarms={filteredAlarms} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;