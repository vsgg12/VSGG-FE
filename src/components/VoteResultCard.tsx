import React from 'react';

interface Props {
  name: string | null;
  value: number | null;
  position: string | null;
}

const VoteResultCard: React.FC<Props> = ({ name, value, position }) => {
  return (
    <div className='flex bg-[#F8F8F8] border-1 border-[#ECECEC] h-[46px] w-[172px] absolute left-[230px] top-[70px] gap-[10px] p-[10px] items-center'>
      <p className='text-[#8A1F21] text-[12px] flex items-center'>과실 {value}</p>
      <div className='flex flex-col text-[#333333]'>
        <p className='text-[12px] font-bold'>{name}</p>
        <p className='text-[10px]'>{position}</p>
      </div>
    </div>
  );
};

export default VoteResultCard;
