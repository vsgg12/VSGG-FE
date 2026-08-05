import React from 'react';

interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

function ConfirmButton({ onClick, isDisabled }: Props) {
  const btnBgColor = isDisabled ? 'bg-gray-100' : 'bg-primary-500 hover:bg-primary-600 cursor-pointer';

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
