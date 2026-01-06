'use client';

interface Props {
  title: '확인' | '취소';
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

const ConfirmButton = ({ title, onClickConfirm, onClickCancel }: Props) => {
  const buttonClass = title === '확인' ? 'bg-[#8A1F21] text-white' : 'bg-white text-[#555555]';

  const onClickBtnClick = () => {
    if (title === '확인') {
      onClickConfirm?.();
    } else {
      onClickCancel?.();
    }
  };

  return (
    <button
      className={`w-[72px] h-[41px] rounded-[5px] font-semibold text-[18px] flex items-center justify-center border-[#C8C8C8] border-[0.5px] ${buttonClass}`}
      onClick={onClickBtnClick}
    >
      {title}
    </button>
  );
};

export default ConfirmButton;
