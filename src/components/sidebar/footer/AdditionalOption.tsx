import React from 'react';

function AdditionalOption() {
  return (
    <div
      className='flex gap-[10px] w-[111px] h-[38px] items-center justify-center cursor-pointer
        hover:bg-[#eeeeee] transition-colors duration-400
        rounded-[12px]'
    >
      <img src={'/svg/sidebar/settingIcon.svg'} width={16} height={16} />
      <div className='text-[14px] text-[#555555]'>추가옵션</div>
    </div>
  );
}

export default AdditionalOption;
