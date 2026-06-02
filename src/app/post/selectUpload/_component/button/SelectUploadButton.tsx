import React from 'react';

interface Props {
  onClick: () => void;
  btnTitle: '파일 첨부' | '유튜브 링크' | '파일 선택';
}

function SelectUploadButton({ onClick, btnTitle }: Props) {
  return (
    <button
      className={`w-[262.5px] h-[53px] rounded-[10px] text-[20px] font-bold text-white bg-[#E20A29] hover:bg-[#B50821]`}
      onClick={onClick}
    >
      {btnTitle}
    </button>
  );
}

export default SelectUploadButton;
