import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { sidebarListType } from './SidebarList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSidebarItem } from '@/hooks/sidebar/useSidebarItem';

interface Props {
  item: sidebarListType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsAlarmModalOpen: Dispatch<SetStateAction<boolean>>;
}

function SidebarItem({ item, setIsLoginModalOpen, setIsAlarmModalOpen }: Props) {
  const { route: routeName, isNotificationOpen, isSearchOpen } = useSidebarStore();
  const { getIcon, handleClick, disabled, setDisabled } = useSidebarItem({
    item,
    setIsLoginModalOpen,
    setIsAlarmModalOpen,
  });

  useEffect(() => {
    const result = (() => {
      switch (item) {
        case '홈':
          return routeName !== 'HOME';
        case '검색':
          return !isSearchOpen;
        case '글 작성':
          return routeName !== 'WRITE';
        case '마이페이지':
          return routeName !== 'PROFILE';
        case '알림':
          return !isNotificationOpen;
        default:
          return true;
      }
    })();
    setDisabled(result);
  }, [isNotificationOpen, isSearchOpen, item, routeName, setDisabled]);

  return (
    <div
      className={`
      flex gap-[40px] items-center pl-[40px] w-[80%] h-[50px] cursor-pointer
      transition-transform duration-200 ease-in-out
      
      ${!disabled ? 'border-l-[4px] border-l-[#8A1F21]' : 'hover:translate-x-[15px]'}
    `}
      onClick={handleClick}
    >
      {getIcon()}
      <span style={{ color: disabled ? '#888888' : '#8A1F21' }}>{item}</span>
    </div>
  );
}

export default SidebarItem;
