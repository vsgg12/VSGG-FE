import React from 'react';
import ViewMobileIcon from '../../../public/svg/mobile/viewMobileIcon.svg';
import Image from 'next/image';

function ViewMobileButton({ handleClick }: { handleClick: () => void }) {
  return (
    <div
      className='w-[180.6px] h-[37px] rounded-[30px] bg-black flex justify-center items-center cursor-pointer gap-[4px] fixed bottom-[30px] left-[50%] z-10 translate-x-[-50%]'
      onClick={handleClick}
    >
      <Image src={ViewMobileIcon} alt='mobileIcon' width={16} height={16} />
      <div className='text-white font-bold text-[14px]'>모바일 버전으로 보기</div>
    </div>
  );
}

export default ViewMobileButton;
