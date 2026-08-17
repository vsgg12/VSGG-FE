import React, { Dispatch, SetStateAction, useState } from 'react';
import Icon_time from '../../../../public/svg/main/time.svg';
import Icon_time_disabled from '../../../../public/svg/main/time_disabled.svg';
import Icon_time_hover from '../../../../public/svg/main/time_hover.svg';
import Icon_flame from '../../../../public/svg/main/flame.svg';
import Icon_flame_hover from '../../../../public/svg/main/flame_hover.svg';
import Icon_flame_disabled from '../../../../public/svg/main/flame_disabled.svg';
import Image from 'next/image';

interface INewPopularToggleButton {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
  isMobile?: boolean;
}

const buttonClass = 'flex justify-center items-center gap-[6px] relative cursor-pointer';

function NewPopularToggleButton({
  activeButton,
  setActiveButton,
  isMobile,
}: INewPopularToggleButton) {
  const [isHovered, setIsHovered] = useState<string>('');

  return (
    <div className='flex text-[16px] gap-[16px]'>
      <div
        className={buttonClass}
        onClick={() => setActiveButton('createdatetime')}
        onMouseEnter={() => setIsHovered('time')}
        onMouseLeave={() => setIsHovered('')}
      >
        <div className={`relative ${isMobile ? 'w-[16px] h-[16px]' : 'w-[24px] h-[24px]'}`}>
          <Image
            src={Icon_time}
            alt='time'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton === 'createdatetime' ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={Icon_time_hover}
            alt='time_hover'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton !== 'createdatetime' && isHovered === 'time'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
          <Image
            src={Icon_time_disabled}
            alt='time_disabled'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton !== 'createdatetime' && isHovered !== 'time'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
        </div>
        <p
          className={`${isMobile ? 'text-[12px]' : 'text-[16px]'} transition-colors duration-300 ease-in-out font-semibold ${
            activeButton === 'createdatetime'
              ? 'text-primary-500'
              : isHovered === 'time'
                ? 'text-semantic-text-muted'
                : 'text-semantic-text-disabled'
          }`}
        >
          최신
        </p>
      </div>
      <div
        className={buttonClass}
        onClick={() => setActiveButton('view')}
        onMouseEnter={() => setIsHovered('view')}
        onMouseLeave={() => setIsHovered('')}
      >
        <div className={`relative ${isMobile ? 'w-[16px] h-[16px]' : 'w-[24px] h-[24px]'}`}>
          <Image
            src={Icon_flame}
            alt='view'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton === 'view' ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={Icon_flame_hover}
            alt='flame_hover'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton !== 'view' && isHovered === 'view' ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={Icon_flame_disabled}
            alt='flame_disabled'
            fill
            className={`transition-opacity duration-300 ease-in-out ${
              activeButton !== 'view' && isHovered !== 'view' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <p
          className={`${isMobile ? 'text-[12px]' : 'text-[16px]'} transition-colors duration-300 ease-in-out font-semibold ${
            activeButton === 'view'
              ? 'text-primary-500'
              : isHovered === 'view'
                ? 'text-semantic-text-muted'
                : 'text-semantic-text-disabled'
          }`}
        >
          인기
        </p>
      </div>
    </div>
  );
}

export default NewPopularToggleButton;
