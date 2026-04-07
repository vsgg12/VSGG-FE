'use client';

import TempModalHeader from '@/app/post/write/_component/common/modal/temp/header/TempModalHeader';
import ModalOverlay from '@/app/post/write/_component/common/modal/ModalOverlay';
import TempModalContent from '@/app/post/write/_component/common/modal/temp/content/TempModalContent';
import { useTempStore } from '@/store/temp/useTempStore';

const TempModal = () => {
  const { setData: setTempData } = useTempStore();

  const onCloseModal = () => {
    setTempData('tempModalOpen', false);
  };

  return (
    <ModalOverlay onClose={onCloseModal}>
      <div
        className={
          'w-[650px] h-[786px] px-[30px] py-[40px] flex flex-col gap-[27px] bg-white rounded-[30px]'
        }
      >
        <TempModalHeader />
        <TempModalContent />
      </div>
    </ModalOverlay>
  );
};

export default TempModal;
