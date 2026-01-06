'use client';

import { TempItemType, useTempStore } from '@/store/temp/useTempStore';
import { formatDateTime } from '@/utils/formatDate';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import grayDeleteIcon from '../../../../../../../../../public/svg/postWrite/grayDeleteIcon.svg';
import redDeleteIcon from '../../../../../../../../../public/svg/postWrite/redDeleteIcon.svg';
import { truncateText } from '@/utils/truncateText';

interface Props {
  item: TempItemType;
  isHover: number | null;
  setIsHover: Dispatch<SetStateAction<number | null>>;
}

const TempItem = ({ item, isHover, setIsHover }: Props) => {
  const { setData: setTempData } = useTempStore();

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
      className={
        'w-full h-[101px] flex justify-between items-center p-[20px] hover:bg-[#F3F3F3] rounded-[10px] cursor-pointer'
      }
      onMouseEnter={() => setIsHover(item.id)}
      onMouseLeave={() => setIsHover(null)}
      onClick={onClickTempItem}
    >
      <div className={'w-fit h-full flex flex-col justify-between'}>
        <div className={'text-[20px] font-bold text-[#333333]'}>{truncateText(item.title, 29)}</div>
        <div className={'flex gap-[10px] text-[18px]'}>
          <div className={'font-bold text-[#777777]'}>{item.judgeType}판결</div>
          <div className={'text-[#999999]'}>{formatDateTime(item.updatedAt)} 저장</div>
        </div>
      </div>
      <Image
        src={isHover === item.id ? redDeleteIcon : grayDeleteIcon}
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
