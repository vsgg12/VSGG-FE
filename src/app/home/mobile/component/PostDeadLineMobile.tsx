import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import timerIcon from '../../../../../public/svg/timer.svg';

function PostDeadLineMobile({ deadLine }: { deadLine: number }) {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (deadLine === 0) {
      setMessage('오늘 투표 마감!');
    } else if (deadLine < 0) {
      setMessage('투표 마감');
    } else {
      setMessage(`${deadLine}일`);
    }
  }, [deadLine]);

  return (
    <div className='flex items-center justify-center gap-[4px]  px-[10px] py-[2px] h-[22px] rounded-[20px] bg-[#8A1F21]'>
      <Image src={timerIcon} width={14} height={14} alt='timer' />
      <p className='text-white text-[12px] whitespace-nowrap'>{message}</p>
    </div>
  );
}

export default PostDeadLineMobile;
