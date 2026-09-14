'use client';

import moment from 'moment';
import React from 'react';

interface Props {
  alarm: IAlarmsType;
  handleAlarmItemClick: (alarmId: number, alarmType: string, id: number) => void;
  isMobile?: boolean;
}

function SideAlarmItem({ alarm, handleAlarmItemClick, isMobile = false }: Props) {
  moment.locale('ko');

  const formatDate = (dateTime: string) => {
    return moment(dateTime).fromNow();
  };

  const getIcon = () => {
    switch (alarm.alarmType) {
      case 'POST':
        return <img src={'/svg/sidebar/alarm/alarmJudgeIcon.svg'} width={30} height={30} />;
      case 'COMMENT':
        return <img src={'/svg/sidebar/alarm/alarmCommentIcon.svg'} width={30} height={30} />;
    }
  };

  return (
    <div
      className={`px-[16px] flex gap-[10px] cursor-pointer h-[116px] w-full py-[20px] ${alarm.isRead === false && 'bg-semantic-background-subtle'} hover:bg-semantic-background-subtle`}
      onClick={() => handleAlarmItemClick(alarm.alarmId, alarm.alarmType, alarm.postId)}
    >
      <div className='h-full'>{getIcon()}</div>
      <div className={`flex flex-col h-full gap-[5px] ${isMobile ? 'w-full' : 'w-[265px]'}`}>
        <div className='flex justify-between text-[14px] text-gray-300'>
          <div>{alarm.alarmType === 'POST' ? '판결 결과' : '댓글'}</div>
          <div className='text-[10px] text-semantic-text-muted'>{formatDate(alarm.createdDateTime)}</div>
        </div>
        <div className='text-[16px] text-semantic-text-secondary'>{alarm.alarmContents}</div>
      </div>
      <div className='flex h-full justify-center flex-1 items-center'>
        {alarm.isRead === false && (
          <span className='bg-primary-500 rounded-full w-[6px] h-[6px]'></span>
        )}
      </div>
    </div>
  );
}

export default SideAlarmItem;