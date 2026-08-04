'use client';

import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import { useTempStore } from '@/store/temp/useTempStore';
import React from 'react';

interface Props {
  title: '저장' | '등록';
  onClickTempSaveBtn?: () => void;
  onClickRegisterBtn?: () => void;
}

const WriteFooterButton = ({ title, onClickTempSaveBtn, onClickRegisterBtn }: Props) => {
  const { setData: setTempData, tempNum } = useTempStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  const buttonClass =
    title === '저장'
      ? isDarkMode
        ? 'bg-[#484B4D] text-[#F1F2F2] justify-center gap-[18px]'
        : 'bg-[#E5E6E6] text-[#242526] justify-center gap-[18px]'
      : 'bg-primary-500 text-white justify-center';

  const onClickBtnClick = () => {
    if (title === '등록') {
      onClickRegisterBtn && onClickRegisterBtn();
    } else {
      onClickTempSaveBtn && onClickTempSaveBtn();
    }
  };

  const onClickTempNumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTempData('tempModalOpen', true);
  };

  return (
    <div
      className={`${buttonClass} w-[134px] h-full py-[20px] rounded-[10px] text-[20px] flex items-center cursor-pointer`}
      onClick={onClickBtnClick}
    >
      <div>{title}</div>
      {title === '저장' && (
        <>
          <div className='h-[24px] w-[1px] bg-current' />
          <div onClick={onClickTempNumClick}>{tempNum}</div>
        </>
      )}
    </div>
  );
};

export default WriteFooterButton;
