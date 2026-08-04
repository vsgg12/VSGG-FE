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
    <div className={'flex h-[40px] w-full items-center justify-between'}>
      <div className={'flex gap-[6px] text-[24px] font-bold'}>
        <div className={'text-semantic-text-primary'}>임시 저장</div>
        <div className={'text-primary-500'}>{tempNum}</div>
      </div>
      <Image
        src={XIcon}
        alt={'닫기 아이콘'}
        width={30}
        height={30}
        onClick={onCloseModal}
        className={'cursor-pointer opacity-80 hover:opacity-100'}
      />
    </div>
  );
};

export default TempModalHeader;
