import React, { useState } from 'react';
import SideAlarmList from './SideAlarmList';
import AlarmOptionType from './AlarmOptionType';

interface IAlarmModalProps {
  alarms?: IAlarmsType[] | undefined;
}

export type AlarmKoreanType = '전체' | '판결' | '댓글';
type AlarmEnglishType = 'ALL' | 'POST' | 'COMMENT';

export type AlarmType = {
  type: AlarmKoreanType;
  value: AlarmEnglishType;
};

export const alarmTypes: AlarmType[] = [
  { type: '전체', value: 'ALL' },
  { type: '판결', value: 'POST' },
  { type: '댓글', value: 'COMMENT' },
];

export default function AlarmModal({ alarms = undefined }: IAlarmModalProps) {
  const [alarmType, setAlarmType] = useState<AlarmKoreanType>('전체');

  const filteredAlarms =
    alarms && alarmType !== '전체'
      ? alarms.filter(
          (alarm) => alarm.alarmType === alarmTypes.find((at) => at.type === alarmType)?.value,
        )
      : alarms;

  return (
    <>
      <div
        className='w-[362px] min-w-[362px] h-screen pt-[40px] pb-[60px] bg-semantic-background-surface z-[100]'
        style={{
          boxShadow: '4px 0 12px var(--color-shadow-soft)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='h-full flex flex-col gap-[30px]'>
          <p className='text-semantic-text-muted text-[20px] font-bold pl-[16px]'>알림</p>
          <div className='w-full h-[32px] border-b-1 border-semantic-border-default flex '>
            {alarmTypes.map((alarm: AlarmType) => (
              <AlarmOptionType
                alarm={alarm}
                alarmType={alarmType}
                setAlarmType={setAlarmType}
                key={`alarm-option-${alarm.type}`}
              />
            ))}
          </div>
          <div className='flex-1 min-h-0 overflow-y-auto scrollbar-hidden'>
            <SideAlarmList alarms={filteredAlarms} />
          </div>
        </div>
        <div className='relative'>
          <span
            className='text-semantic-text-muted font-medium text-[12px] px-2 whitespace-nowrap'
            style={{
              position: 'absolute',
              bottom: '-35px',
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
