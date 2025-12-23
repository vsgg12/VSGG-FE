import React from 'react';

interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

function ConfirmButton({ onClick, isDisabled }: Props) {
  const btnBgColor = isDisabled ? 'bg-[#ececec]' : 'bg-[#8A1F21] hover:bg-[#571415] cursor-pointer';

  return (
    <button
      className={`w-[134px] h-[53px] rounded-[10px] text-[20px] font-bold text-white ${btnBgColor}`}
      onClick={onClick}
    >
      확인
    </button>
  );
}

export default ConfirmButton;
