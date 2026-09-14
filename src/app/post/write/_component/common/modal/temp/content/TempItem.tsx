'use client';

import { TempItemSummaryType, useTempStore } from '@/store/temp/useTempStore';
import { formatDateTime } from '@/utils/formatDate';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import grayDeleteIcon from '../../../../../../../../../public/svg/postWrite/grayDeleteIcon.svg';
import { truncateText } from '@/utils/truncateText';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  item: TempItemSummaryType;
  isHover: number | null;
  setIsHover: Dispatch<SetStateAction<number | null>>;
}

const TempItem = ({ item, isHover, setIsHover }: Props) => {
  const { setData: setTempData } = useTempStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  const isItemHover = isHover === item.id;
  const itemClass = isDarkMode
    ? isItemHover
      ? 'bg-[#484B4D]'
      : 'bg-transparent'
    : isItemHover
      ? 'bg-[#F1F2F2]'
      : 'bg-transparent';
  const titleClass = isDarkMode ? 'text-[#D7D8D9]' : 'text-[#242526]';
  const categoryClass = isDarkMode ? 'text-[#D7D8D9]' : 'text-[#484B4D]';
  const savedAtClass = isDarkMode ? 'text-[#AEB1B2]' : 'text-[#787C80]';

  const onClickTempItem = () => {
    setTempData('loadTempDetailModalOpen', true);
    setTempData('selectedTempId', item.id);
  };

  const onClickDeleteItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // 여기서는 삭제모달 열기만 하면 됨
    setTempData('deleteTempItemModalOpen', true);
    setTempData('selectedTempId', item.id);
  };

  return (
    <div
      className={`flex h-[101px] w-full cursor-pointer items-center justify-between rounded-[10px] p-[20px] ${itemClass}`}
      onMouseEnter={() => setIsHover(item.id)}
      onMouseLeave={() => setIsHover(null)}
      onClick={onClickTempItem}
    >
      <div className={'flex h-full min-w-0 flex-col justify-between'}>
        <div className={`truncate text-[20px] font-bold leading-[24px] ${titleClass}`}>
          {item.title ? truncateText(item.title, 29) : '제목 없음'}
        </div>
        <div className={'flex gap-[10px] text-[18px] leading-[24px]'}>
          <div className={`font-bold ${categoryClass}`}>
            {item.category === 'FAULT' ? '과실' : '주장'}판결
          </div>
          <div className={savedAtClass}>{formatDateTime(item.savedAt)} 저장</div>
        </div>
      </div>
      <Image
        src={grayDeleteIcon}
        alt={'삭제'}
        width={24}
        height={24}
        onClick={onClickDeleteItem}
        className={'cursor-pointer'}
      />
    </div>
  );
};

export default TempItem;
