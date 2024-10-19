import React from 'react';

interface IVoteStatusCircleProps {
  text: string;
}

function VoteStatusCircle({ text }: IVoteStatusCircleProps) {
  const textClass = () => {
    switch (text) {
      case '승리':
        return 'bg-[#0D37CB] border border-[#0D37CB]';
      case '패배':
        return 'bg-[#B01D00] border border-[#B01D00]';
      case '무승부':
        return 'bg-[#E9B500] border border-[#E9B500]';
      case '판결 종료':
        return 'bg-[#333333] border border-[#333333]';
      case '판결 중':
        return 'bg-[#00AE07] border border-[#00AE07]';
      default:
        return '';
    }
  };
  return (
    <div
      className={`text-[#333333] font-medium text-[12px] rounded-[50px] px-[10px] py-[5px] bg-opacity-30 ${textClass()} h-[21px] flex justify-center items-center `}
    >
      {text}
    </div>
  );
}

export default VoteStatusCircle;
