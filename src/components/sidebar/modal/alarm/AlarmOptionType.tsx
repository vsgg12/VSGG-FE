import React, { Dispatch, SetStateAction } from 'react';
import { AlarmKoreanType, AlarmType } from './AlarmModal';

interface Props {
  alarm: AlarmType;
  alarmType: AlarmKoreanType;
  setAlarmType: Dispatch<SetStateAction<AlarmKoreanType>>;
}

function AlarmOptionType({ alarm, alarmType, setAlarmType }: Props) {
  return (
    <div
      className={`h-full flex items-center justify-center cursor-pointer text-[18px] font-semibold ${alarm.type === alarmType ? 'text-primary-500 border-b-2 border-primary-500 rounded-sm' : 'text-semantic-text-muted transition-all duration-300'}`}
      style={{ width: 'calc(100% / 3)' }}
      onClick={() => setAlarmType(alarm.type)}
    >
      {alarm.type}
    </div>
  );
}

export default AlarmOptionType;
