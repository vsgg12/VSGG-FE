'use client';

import { useTempStore } from '@/store/temp/useTempStore';
import React from 'react';

interface Props {
  title: '저장' | '등록';
  onClickTempSaveBtn?: () => void;
  onClickRegisterBtn?: () => void;
}

const WriteFooterButton = ({ title, onClickTempSaveBtn, onClickRegisterBtn }: Props) => {
  const { setData: setTempData, tempNum } = useTempStore();

  const buttonClass =
    title === '저장'
      ? 'bg-gray-100 text-gray-850 justify-between pl-[20px]'
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
      className={`${buttonClass} w-[134px] h-full py-[20px] rounded-[10px]  text-[20px]  flex  items-center cursor-pointer`}
      onClick={onClickBtnClick}
    >
      <div>{title}</div>
      {title === '저장' && (
        <div
          className={'pr-[20px] pl-[25px] border-1.5 border-l-black'}
          onClick={onClickTempNumClick}
        >
          {tempNum}
        </div>
      )}
    </div>
  );
};

export default WriteFooterButton;
