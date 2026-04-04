import ConfirmButton from '@/app/post/write/_component/common/modal/temp/confirm/footer/ConfirmButton';

interface Props {
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

const ConfirmFooter = ({ onClickConfirm, onClickCancel }: Props) => {
  return (
    <div className={'w-full flex justify-end gap-[10px]'}>
      <ConfirmButton title={'취소'} onClickCancel={onClickCancel} />
      <ConfirmButton title={'확인'} onClickConfirm={onClickConfirm} />
    </div>
  );
};

export default ConfirmFooter;
