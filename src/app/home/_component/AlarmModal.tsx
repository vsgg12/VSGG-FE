import React, { useState } from 'react';
import AlarmList from './AlarmList';

interface IAlarmModalProps {
  alarms?: IAlarmsType[] | undefined;
}

const alarmTypes = [
  { type: '전체', value: 'ALL' },
  { type: '판결', value: 'POST' },
  { type: '댓글', value: 'COMMENT' },
];

export default function AlarmModal({ alarms = undefined }: IAlarmModalProps) {
  const [alarmType, setAlarmType] = useState<string>('전체');

  const filteredAlarms =
    alarms && alarmType !== '전체'
      ? alarms.filter(
          (alarm) => alarm.alarmType === alarmTypes.find((at) => at.type === alarmType)?.value,
        )
      : alarms;

  return (
    <>
      <div
        className='w-[354px] h-[443px] border border-[#8A1F21] rounded-[18px] p-[15px] bg-[#FFFFFF] '
        style={{ position: 'absolute', transform: 'translate(-195px,250px)', zIndex: 100 }}
      >
        <div className='flex flex-col flex-grow'>
          <p className='text-[#8A1F21] text-[14px] font-semibold mb-[10px]'>알림</p>
          <div className='mb-[10px]'>
            {alarmTypes.map((alarm, idx) => (
              <button
                key={idx}
                className={`w-[58px] h-[23px] rounded-[20px] text-[14px] mr-2 ${alarm.type === alarmType ? 'bg-[#333333] text-white' : 'bg-[#F8F8F8] text-[#909090]'}`}
                onClick={() => setAlarmType(alarm.type)}
              >
                {alarm.type}
              </button>
            ))}
          </div>
          <AlarmList alarms={filteredAlarms} />
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
