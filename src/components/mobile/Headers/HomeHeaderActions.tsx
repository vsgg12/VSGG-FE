'use client';

import Image from 'next/image';
import React from 'react';
import alarmIcon from '../../../../public/svg/mobile/home/alarmIcon.svg';
import noAlarmIcon from '../../../../public/svg/mobile/home/noAlarmIcon.svg';
import searchIcon from '../../../../public/svg/mobile/home/searchIcon.svg';
import hamburgerIcon from '../../../../public/svg/mobile/home/hamburgerIcon.svg';

interface IProps {
  hasUnreadAlarm: boolean;
  onAlarmClick: () => void;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

const HomeHeaderActions = ({
  hasUnreadAlarm,
  onAlarmClick,
  onSearchClick,
  onMenuClick,
}: IProps) => {
  const actionItems = [
    {
      icon: hasUnreadAlarm ? alarmIcon : noAlarmIcon,
      alt: '알림',
      onClick: onAlarmClick,
      width: 44,
      height: 44,
    },
    {
      icon: searchIcon,
      alt: '검색',
      onClick: onSearchClick,
      width: 44,
      height: 44,
    },
    {
      icon: hamburgerIcon,
      alt: '메뉴',
      onClick: onMenuClick,
      width: 44,
      height: 44,
    },
  ];

  return (
    <div className='flex h-[44px] items-center justify-end'>
      {actionItems.map((item) => (
        <button
          key={item.alt}
          type='button'
          aria-label={item.alt}
          onClick={item.onClick}
          className='flex shrink-0 items-center justify-center'
        >
          <Image
            src={item.icon}
            alt={`${item.alt} 아이콘`}
            width={item.width}
            height={item.height}
          />
        </button>
      ))}
    </div>
  );
};

export default HomeHeaderActions;
