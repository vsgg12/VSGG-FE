import WriteFooterButton from '@/app/post/write/_component/common/footer/WriteFooterButton';

interface Props {
  tempNum?: number;
  onClickRegisterBtn?: () => void;
  onClickTempSaveBtn?: () => void;
}

const WriteFooterContainer = ({ tempNum, onClickTempSaveBtn, onClickRegisterBtn }: Props) => {
  return (
    <div className={'w-full h-[53px] flex gap-[20px] justify-end'}>
      <WriteFooterButton title={'저장'} tempNum={tempNum} onClickTempSaveBtn={onClickTempSaveBtn} />
      <WriteFooterButton title={'등록'} onClickRegisterBtn={onClickRegisterBtn} />
    </div>
  );
};

export default WriteFooterContainer;
