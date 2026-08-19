import React from 'react';
import { sidebarListType } from './SidebarList';
import { useSidebarItem } from '@/hooks/sidebar/useSidebarItem';

interface Props {
  item: sidebarListType;
}

function SidebarItemMini({ item }: Props) {
  const { getIcon, handleClick, disabled } = useSidebarItem({
    item,
  });

  return (
    <div
      className={`flex items-center justify-center w-full h-[50px] cursor-pointer
      transition-transform duration-200 ease-in-out       
      ${disabled && 'hover:translate-y-[-5px]'}
      ${disabled ? 'text-semantic-icon-default' : 'text-primary-500'}`}
      onClick={handleClick}
    >
      {getIcon()}
    </div>
  );
}

export default SidebarItemMini;
