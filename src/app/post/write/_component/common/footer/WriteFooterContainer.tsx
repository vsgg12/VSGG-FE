'use client';

import WriteFooterButton from '@/app/post/write/_component/common/footer/WriteFooterButton';

interface Props {
  onClickRegisterBtn?: () => void;
  onClickTempSaveBtn?: () => void;
}

const WriteFooterContainer = ({ onClickTempSaveBtn, onClickRegisterBtn }: Props) => {
  return (
    <div className={'w-full h-[53px] flex gap-[20px] justify-end'}>
      <WriteFooterButton title={'저장'} onClickTempSaveBtn={onClickTempSaveBtn} />
      <WriteFooterButton title={'등록'} onClickRegisterBtn={onClickRegisterBtn} />
    </div>
  );
};

export default WriteFooterContainer;
