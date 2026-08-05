import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsAdditionalModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddtionalModalOpen: boolean;
}

function AdditionalOption({ setIsAdditionalModalOpen, isAddtionalModalOpen }: Props) {
  return (
    <div
      className={`
        flex gap-[10px] w-[111px] h-[38px] items-center justify-center cursor-pointer
        transition-colors duration-400 rounded-[12px]
        ${isAddtionalModalOpen ? 'bg-semantic-background-subtle' : 'hover:bg-semantic-background-subtle'}
      `}
      onClick={() => {
        setIsAdditionalModalOpen((prev) => !prev);
      }}
    >
      <img src={'/svg/sidebar/settingIcon.svg'} width={16} height={16} />
      <div className='text-[14px] text-semantic-text-secondary'>추가옵션</div>
    </div>
  );
}

export default AdditionalOption;
