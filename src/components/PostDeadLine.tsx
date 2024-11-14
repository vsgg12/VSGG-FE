import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import timerIcon from '../../public/svg/timer.svg';

function PostDeadLine({deadLine}:{deadLine: number}) {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        if (deadLine === 0) {
            setMessage("오늘 투표 마감!")
        }
        else if (deadLine < 0) {
            setMessage("투표 마감")
        }
        else {
            setMessage(`투표 마감까지 ${deadLine}일`)
        }
    }, [deadLine])

  return (
    <div className='flex items-center justify-center gap-[4px] max-w-[190px] px-[10px] py-[4px] h-[28px] rounded-[20px] bg-[#8A1F21]'>
      <Image src={timerIcon} width={20} height={20} alt='timer' />
      <span className='text-white text-[18px]'>{message}</span>
    </div>
  );
}

export default PostDeadLine;