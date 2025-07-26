import React, { Dispatch, SetStateAction } from 'react';
import Icon_time from '../../../../public/svg/main/time.svg';
import Icon_time_disabled from '../../../../public/svg/main/time_disabled.svg';
import Icon_flame from '../../../../public/svg/main/flame.svg';
import Icon_flame_disabled from '../../../../public/svg/main/flame_disabled.svg';
import Image from 'next/image';

interface INewPopularToggleButton {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

const buttonClass = 'flex justify-center items-center gap-[6px] cursor-pointer';

function NewPopularToggleButton({ activeButton, setActiveButton }: INewPopularToggleButton) {
  return (
    <div className='flex text-[16px] gap-[16px]'>
      <div className={buttonClass} onClick={() => setActiveButton('createdatetime')}>
        <Image
          src={activeButton == 'createdatetime' ? Icon_time : Icon_time_disabled}
          width={24}
          height={24}
          alt='time'
        />
        <p className={activeButton == 'createdatetime' ? 'text-[#8A1F21]' : 'text-[#C8C8C8]'}>
          최신
        </p>
      </div>
      <div className={buttonClass} onClick={() => setActiveButton('view')}>
        <Image
          src={activeButton == 'view' ? Icon_flame : Icon_flame_disabled}
          width={24}
          height={24}
          alt='flame'
        />
        <p className={activeButton == 'view' ? 'text-[#8A1F21]' : 'text-[#C8C8C8]'}>인기</p>
      </div>
    </div>
  );
}

export default NewPopularToggleButton;
