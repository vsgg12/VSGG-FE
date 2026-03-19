import React from 'react';
import SidebarItemMini from './SidebarItemMini';

export type sidebarListType = '홈' | '검색' | '글 작성' | '마이페이지' | '알림';
const sidebarList: sidebarListType[] = ['홈', '검색', '글 작성', '마이페이지', '알림'];

interface Props {
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
}

function SidebarListMini({ setIsLoginModalOpen }: Props) {
  return (
    <div className='flex flex-col gap-[20px] px-[10px] w-full mt-[150px]'>
      {sidebarList.map((item) => (
        <SidebarItemMini key={item} item={item} setIsLoginModalOpen={setIsLoginModalOpen} />
      ))}
    </div>
  );
}

export default SidebarListMini;
