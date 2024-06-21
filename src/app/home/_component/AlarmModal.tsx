import React from 'react';
import AlarmList from './AlarmList';

const dummyData: GetAlarmConfirmType[] = [
  {
    createdDateTime: '2024-05-18T08:18:02.092Z',
    modifyDateTime: '2024-05-18T08:18:02.092Z',
    id: 0,
    memberName: '방구쟁이 뿡뿡이',
    memberTier: '새싹',
    alarmContents:
      '댓글 달기 선플을 달아서 클린한 인터넷 문화를 만들어요 댓글 참여는 투표 참여 여기서부터는 ...으로 보여야 합니다.',
    alarmType: 'true',
  },
  {
    createdDateTime: '2024-05-18T08:18:02.092Z',
    modifyDateTime: '2024-05-18T08:18:02.092Z',
    id: 1,
    memberName: '다이에나믹듀오',
    memberTier: '새싹',
    alarmContents:
      '댓글 달기 선플을 달아서 클린한 인터넷 문화를 만들어요 댓글 참여는 투표 참여 여기서부터는 ...으로 보여야 합니다.',
    alarmType: 'true',
  },
  {
    createdDateTime: '2024-05-16T08:18:02.092Z',
    modifyDateTime: '2024-05-16T08:18:02.092Z',
    id: 2,
    memberName: '방구쟁이 뿡뿡이',
    memberTier: '새싹',
    alarmContents: '판결한 게시물 결과를 확인해보세요!',
    alarmType: 'false',
  },
  {
    createdDateTime: '2024-05-14T08:18:02.092Z',
    modifyDateTime: '2024-05-14T08:18:02.092Z',
    id: 1,
    memberName: '다이에나믹듀오',
    memberTier: '새싹',
    alarmContents:
      '댓글 달기 선플을 달아서 클린한 인터넷 문화를 만들어요 댓글 참여는 투표 참여 여기서부터는 ...으로 보여야 합니다.',
    alarmType: 'false',
  },
  {
    createdDateTime: '2024-05-10T08:18:02.092Z',
    modifyDateTime: '2024-05-10T08:18:02.092Z',
    id: 1,
    memberName: '방구쟁이 뿡빵이',
    memberTier: '새싹',
    alarmContents:
      '댓글 달기 선플을 달아서 클린한 인터넷 문화를 만들어요 댓글 참여는 투표 참여 여기서부터는 ...으로 보여야 합니다.',
    alarmType: 'true',
  },
];

export default function AlarmModal() {
  return (
    <div
      className='w-[354px] h-[413px] border border-[#8A1F21] rounded-[18px] p-[15px] bg-[#FFFFFF] '
      style={{ position: 'absolute', transform: 'translate(-55%,58%)', zIndex: 100 }}
    >
      <div className='flex flex-col flex-grow'>
        <p className='text-[#8A1F21] text-[14px] font-medium mb-[10px]'>알림</p>
        <AlarmList alarms={dummyData} />
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
          최대 1달 전까지의 알림을 확인할 수 있어요
        </span>
      </div>
    </div>
  );
}
