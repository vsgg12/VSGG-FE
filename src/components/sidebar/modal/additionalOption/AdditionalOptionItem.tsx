import React from 'react';
import { AdditionalOptionItemType } from './AdditionalOptionList';
import { useAdditionalOptionItem } from '@/hooks/sidebar/useAddtionalOptionItem';
import ModalLayout from '@/components/modals/ModalLayout';
import LoginModal from '@/components/modals/login/LoginModal';

interface Props {
  item: AdditionalOptionItemType;
}

function AdditionalOptionItem({ item }: Props) {
  const { getIcon, handleClick, isLoginModalOpen, setIsLoginModalOpen } =
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
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <LoginModal />
        </ModalLayout>
      )}
    </>
  );
}

export default AdditionalOptionItem;
