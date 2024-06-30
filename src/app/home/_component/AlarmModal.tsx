import React from 'react';
import AlarmList from './AlarmList';

interface IAlarmModalProps {
  alarms?: IAlarmsType[] | undefined;
}

export default function AlarmModal({ alarms=undefined }: IAlarmModalProps) {
  return (
    <>
      <div
        className='w-[354px] h-[413px] border border-[#8A1F21] rounded-[18px] p-[15px] bg-[#FFFFFF] '
        style={{ position: 'absolute', transform: 'translate(-55%,58%)', zIndex: 100 }}
      >
        <div className='flex flex-col flex-grow'>
          <p className='text-[#8A1F21] text-[14px] font-medium mb-[10px]'>알림</p>
          <AlarmList alarms={alarms && alarms} />
        </div>
        <div className='relative'>
          <hr className='border-[#8A1F21]' />
          <span
            className='text-[#828282] font-medium text-[10px] bg-white px-2 whitespace-nowrap'
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
      </div>
    </>
  );
}
