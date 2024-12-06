import getAlarms from '@/api/getAlarms';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../login/store/useAuthStore';
import MobileHeader from '@/components/mobile/MobileHeader';

const alarmTypes = [
  { type: '전체', value: 'ALL' },
  { type: '판결', value: 'POST' },
  { type: '댓글', value: 'COMMENT' },
];

function Alert() {
  // const { accessToken, isLogin } = useAuthStore();
  // const { data: alarmData, isLoading } = useQuery({
  //   queryKey: ['alarms'],
  //   queryFn: () => getAlarms(accessToken),
  //   enabled: isLogin,
  // });

  return (
    <div className='min-w-[390px] max-w-[768px] h-[100svh] flex justify-center relative my-0 mx-auto box-border bg-[#ECECEC]'>
      <MobileHeader headerTitle='알림'/>
    </div>
  );
}

export default Alert;
