import React, { Dispatch, SetStateAction } from 'react';

interface INewPopularToggleButton {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

const style = 'toggle-button flex-1 h-[33px] w-[69px] rounded-[10px] transition-all duration-300 ';

function NewPopularToggleButton({ activeButton, setActiveButton }: INewPopularToggleButton) {
  return (
    <div className='flex h-[36px] w-[142px] border-2 border-[#8A1F21] rounded-[12px] relative bg-[#8A1F21]'>
      <button
        className={`${style} ${
          activeButton === 'createdatetime' ? 'bg-white text-[#8A1F21]' : 'bg-[#8A1F21] text-white'
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
        className={`${style} ${
          activeButton === 'view' ? 'bg-white text-[#8A1F21]' : 'bg-[#8A1F21] text-white'
        }`}
        onClick={() => setActiveButton('view')}
        style={{
          zIndex: activeButton === 'view' ? 2 : 1,
          position: 'absolute',
          left: '70px',
        }}
      >
        인기순
      </button>
    </div>
  );
}

export default NewPopularToggleButton;
