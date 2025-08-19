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
      className={`h-full flex items-center justify-center cursor-pointer text-[18px] font-semibold ${alarm.type === alarmType ? 'text-[#8A1F21] border-b-2 border-[#8A1F21] rounded-sm' : 'text-[#888888] transition-all duration-300'}`}
      style={{ width: 'calc(100% / 3)' }}
      onClick={() => setAlarmType(alarm.type)}
    >
      {alarm.type}
    </div>
  );
}

export default AlarmOptionType;
