import React from 'react';

interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

function ConfirmButton({ onClick, isDisabled }: Props) {
  const btnColor = isDisabled
    ? 'bg-semantic-button-disabled-fill text-semantic-button-disabled-text'
    : 'cursor-pointer bg-primary-500 text-white hover:bg-primary-600';

  return (
    <button
      className={`h-[53px] w-[134px] rounded-[10px] text-[20px] font-bold ${btnColor}`}
      onClick={onClick}
    >
      확인
    </button>
  );
}

export default ConfirmButton;
