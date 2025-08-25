import React, { Dispatch, SetStateAction } from 'react';
import SidebarItem from './SidebarItem';

export type sidebarListType = '홈' | '검색' | '글 작성' | '마이페이지' | '알림';
const sidebarList: sidebarListType[] = ['홈', '검색', '글 작성', '마이페이지', '알림'];

interface Props{
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function SidebarList({ setIsLoginModalOpen }: Props) {
  
  return (
    <div className='flex flex-col gap-[20px] px-[10px] w-full'>
      {sidebarList.map((item) => (
        <SidebarItem item={item} setIsLoginModalOpen={setIsLoginModalOpen}  />
      ))}
    </div>
  );
}

export default SidebarList;
