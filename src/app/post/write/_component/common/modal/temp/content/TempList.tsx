'use client';

import { useTempStore } from '@/store/temp/useTempStore';
import TempItem from '@/app/post/write/_component/common/modal/temp/content/TempItem';
import { useState } from 'react';

const TempList = () => {
  const { list: tempList } = useTempStore();
  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <div className={'scrollbar-hidden flex h-[585px] w-full flex-col gap-[18px] overflow-y-auto'}>
      {tempList.map((item) => (
        <TempItem
          item={item}
          key={`temp-item-${item.id}`}
          isHover={isHover}
          setIsHover={setIsHover}
        />
      ))}
    </div>
  );
};

export default TempList;
