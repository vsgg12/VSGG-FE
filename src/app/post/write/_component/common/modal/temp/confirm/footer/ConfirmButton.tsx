'use client';

import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  title: '확인' | '취소';
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

const ConfirmButton = ({ title, onClickConfirm, onClickCancel }: Props) => {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const buttonClass =
    title === '확인'
      ? 'border-primary-500 bg-primary-500 text-[#111111]'
      : isDarkMode
        ? 'border-[#484B4D] bg-[#242526] text-[#D7D8D9]'
        : 'border-[#E5E6E6] bg-white text-[#242526]';

  const onClickBtnClick = () => {
    if (title === '확인') {
      onClickConfirm?.();
    } else {
      onClickCancel?.();
    }
  };

  return (
    <button
      className={`flex h-[41px] w-[72px] items-center justify-center rounded-[5px] border-[0.5px] text-[18px] font-semibold ${buttonClass}`}
      onClick={onClickBtnClick}
    >
      {title}
    </button>
  );
};

export default ConfirmButton;
