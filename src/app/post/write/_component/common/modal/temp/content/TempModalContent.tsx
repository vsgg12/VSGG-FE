'use client';

import TempList from '@/app/post/write/_component/common/modal/temp/content/TempList';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

const TempModalContent = () => {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const noticeClass = isDarkMode
    ? 'bg-primary-800 text-[#F9CED4]'
    : 'bg-primary-100 text-primary-500';

  return (
    <div className={'flex h-full w-full flex-col gap-[20px]'}>
      <div
        className={`${noticeClass} flex h-[44px] w-full items-center rounded-[10px] px-[20px] py-[10px] text-[16px] font-medium`}
      >
        60일동안 저장됩니다
      </div>
      <TempList />
    </div>
  );
};

export default TempModalContent;
