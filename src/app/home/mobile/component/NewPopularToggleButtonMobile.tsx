import React, { Dispatch, SetStateAction } from 'react';

interface INewPopularToggleButton {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

export default function NewPopularToggleButtonMobile({
  activeButton,
  setActiveButton,
}: INewPopularToggleButton) {
  const commonStyle =
    'toggle-button flex-1 h-full rounded-[100px] w-[50px] transition-all duration-300';

  return (
    <div className='flex h-[27px] w-[97px] border-2 border-[#8A1F21] rounded-[100px] text-[12px] relative bg-[#FFFFFF]'>
      <button
        className={`${commonStyle} ${
          activeButton === 'createdatetime' ? 'bg-[#8A1F21] text-white' : 'bg-white text-[#8A1F21]'
        }`}
        onClick={() => setActiveButton('createdatetime')}
        style={{
          zIndex: activeButton === 'createdatetime' ? 2 : 1,
          position: 'absolute',
        }}
      >
        최신순
      </button>
      <button
        className={`${commonStyle} ${
          activeButton === 'view' ? 'bg-[#8A1F21] text-white' : 'bg-white text-[#8A1F21]'
        }`}
        onClick={() => setActiveButton('view')}
        style={{
          zIndex: activeButton === 'view' ? 2 : 1,
          position: 'absolute',
          left: '43px',
        }}
      >
        인기순
      </button>
    </div>
  );
}
