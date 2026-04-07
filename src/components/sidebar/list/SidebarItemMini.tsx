import React from 'react';
import { sidebarListType } from './SidebarList';
import { useSidebarItem } from '@/hooks/sidebar/useSidebarItem';

interface Props {
  item: sidebarListType;
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
}

function SidebarItemMini({ item, setIsLoginModalOpen }: Props) {
  const { getIcon, handleClick, disabled } = useSidebarItem({
    item,
    setIsLoginModalOpen,
  });

  return (
    <div
      className={`flex gap-[40px] items-center w-[80%] h-[50px] cursor-pointer
      transition-transform duration-200 ease-in-out       
      ${disabled && 'hover:translate-y-[-5px]'}`}
      onClick={handleClick}
    >
      {getIcon()}
    </div>
  );
}

export default SidebarItemMini;
