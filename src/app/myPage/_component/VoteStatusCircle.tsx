import React from 'react';

interface IVoteStatusCircleProps {
  text: string;
}

function VoteStatusCircle({ text }: IVoteStatusCircleProps) {
  const textClass = () => {
    switch (text) {
      case '승리':
        return 'bg-status-blue border border-status-blue';
      case '패배':
        return 'bg-status-red border border-status-red';
      case '무승부':
        return 'bg-status-yellow border border-status-yellow';
      case '판결 종료':
        return 'bg-gray-850 border border-gray-850';
      case '판결 중':
        return 'bg-status-green border border-status-green';
      default:
        return '';
    }
  };
  return (
    <div
      className={`text-gray-850 font-medium text-[12px] rounded-[50px] px-[10px] py-[5px] bg-opacity-30 ${textClass()} h-[21px] flex justify-center items-center whitespace-nowrap`}
    >
      {text}
    </div>
  );
}

export default VoteStatusCircle;
