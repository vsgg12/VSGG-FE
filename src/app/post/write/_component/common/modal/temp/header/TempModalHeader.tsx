'use client';

import { useTempStore } from '@/store/temp/useTempStore';
import Image from 'next/image';
import XIcon from '../../../../../../../../../public/svg/postWrite/XIcon.svg';

const TempModalHeader = () => {
  const { tempNum, setData: setTempData } = useTempStore();

  const onCloseModal = () => {
    setTempData('tempModalOpen', false);
  };

  return (
    <div className={'w-full h-[40px] flex justify-between items-center px-[20px]'}>
      <div className={'flex gap-[6px] text-[24px] font-bold'}>
        <div className={'text-[#333333]'}>임시 저장</div>
        <div className={'text-[#E20A29]'}>{tempNum}</div>
      </div>
      <Image
        src={XIcon}
        alt={'닫기 아이콘'}
        width={30}
        height={30}
        onClick={onCloseModal}
        className={'cursor-pointer'}
      />
    </div>
  );
};

export default TempModalHeader;
