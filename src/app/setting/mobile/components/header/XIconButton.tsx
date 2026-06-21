'use client';

import React from 'react';
import XIcon from '../../../../../../public/svg/postWrite/XIcon.svg';
import Image from 'next/image';

interface IProps {
  onClick: () => void;
  width: number;
  height: number;
}

const XIconButton = ({ onClick, width, height }: IProps) => {
  return (
    <div
      className={
        'absolute top-[53px] left-[20px] right-[20px] h-[44px] py-[13.5px] flex items-center justify-end'
      }
    >
      <div className={'flex'}>
        <Image
          src={XIcon}
          alt='X-Icon'
          width={width}
          height={height}
          className='cursor-pointer'
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default XIconButton;
