interface Props {
  title: '저장' | '등록';
  onClickTempSaveBtn?: () => void;
  onClickRegisterBtn?: () => void;
  tempNum?: number;
}

const WriteFooterButton = ({ title, onClickTempSaveBtn, onClickRegisterBtn, tempNum }: Props) => {
  const buttonClass =
    title === '저장'
      ? 'bg-[#ECECEC] text-[#333333] justify-between'
      : 'bg-[#8A1F21] text-white justify-center';

  const onClickBtnClick = () => {
    if (title === '등록') {
      onClickRegisterBtn && onClickRegisterBtn();
    } else {
      onClickTempSaveBtn && onClickTempSaveBtn();
    }
  };

  return (
    <div
      className={`${buttonClass} w-[134px] h-full px-[30px] py-[20px] rounded-[10px]  text-[20px]  flex  items-center cursor-pointer`}
      onClick={onClickBtnClick}
    >
      <div>{title}</div>
      {title === '저장' && tempNum && tempNum > 0 && (
        <div className={'pl-[15px] border-1.5 border-l-black '}>{tempNum}</div>
      )}
    </div>
  );
};

export default WriteFooterButton;
