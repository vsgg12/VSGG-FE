import React from 'react';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

function DarkMode() {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const setIsDarkMode = useSidebarStore((state) => state.setIsDarkMode);

  return (
    <div
      className='
        flex gap-[10px] w-[111px] h-[38px] items-center justify-center cursor-pointer
        hover:bg-semantic-background-subtle transition-colors duration-400
        rounded-[12px]
      '
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <img src='/svg/sidebar/darkmodeIcon.svg' width={16} height={16} />
      <div className='text-[14px] text-semantic-text-secondary'>{isDarkMode ? '밝은 테마' : '어두운 테마'}</div>
    </div>
  );
}

export default DarkMode;
