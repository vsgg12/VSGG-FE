import React from 'react';
import { sidebarListType } from './SidebarList';
import { useSidebarItem } from '@/hooks/sidebar/useSidebarItem';

interface Props {
  item: sidebarListType;
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
}

function SidebarItem({ item, setIsLoginModalOpen }: Props) {
  const { getIcon, handleClick, disabled } = useSidebarItem({
    item,
    setIsLoginModalOpen,
  });

  return (
    <div
      className={`
      flex gap-[40px] items-center pl-[40px] w-[80%] h-[50px] cursor-pointer
      transition-transform duration-200 ease-in-out
      
      ${!disabled ? 'border-l-[4px] border-l-primary-500' : 'hover:translate-x-[15px]'}
      ${disabled ? 'text-semantic-icon-default' : 'text-primary-500'}
    `}
      onClick={handleClick}
    >
      {getIcon()}
      <span>{item}</span>
    </div>
  );
}

export default SidebarItem;
