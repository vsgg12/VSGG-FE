import React, { Dispatch, SetStateAction } from 'react';

interface INewPopularToggleButton {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

function NewPopularToggleButton({ activeButton, setActiveButton }: INewPopularToggleButton) {
  return (
    <div className='flex h-[34px] w-[184.5px] border-2 border-[#8A1F21] rounded-[150px] relative bg-[#FFFFFF]'>
      <button
        className={`toggle-button flex-1 h-full w-[94px] rounded-[150px] transition-all duration-300 ${
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
        className={`toggle-button flex-1 h-full rounded-[150px] w-[94px] transition-all duration-300 ${
          activeButton === 'view' ? 'bg-[#8A1F21] text-white' : 'bg-white text-[#8A1F21]'
        }`}
        onClick={() => setActiveButton('view')}
        style={{
          zIndex: activeButton === 'view' ? 2 : 1,
          position: 'absolute',
          left: '87.55px',
        }}
      >
        인기순
      </button>
    </div>
  );
}

export default NewPopularToggleButton;
