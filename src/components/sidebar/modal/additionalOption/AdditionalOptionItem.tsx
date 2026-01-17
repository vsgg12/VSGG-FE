import React from 'react';
import { AdditionalOptionItemType } from './AdditionalOptionList';
import { useAdditionalOptionItem } from '@/hooks/sidebar/useAddtionalOptionItem';

interface Props {
  item: AdditionalOptionItemType;
}

function AdditionalOptionItem({ item }: Props) {
  const { getIcon, handleClick } =
    useAdditionalOptionItem(item);

  return (
    <>
      <div
        className='w-[160px] h-[37px] flex gap-[10px] items-center pl-[10px] cursor-pointer hover:bg-[#eeeeee] transition-colors duration-300 rounded-[8px]'
        onClick={handleClick}
      >
        {getIcon()}
        <div className='text-[14px] font-semibold text-[#555555]'>{item}</div>
      </div>
    </>
  );
}

export default AdditionalOptionItem;
