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
          'h-[786px] w-[650px] rounded-[30px] bg-semantic-background-elevated px-[30px] py-[40px] text-semantic-text-primary shadow-[8px_8px_16px_rgba(0,0,0,0.16)] flex flex-col gap-[27px]'
        }
      >
        <TempModalHeader />
        <TempModalContent />
      </div>
    </ModalOverlay>
  );
};

export default TempModal;
