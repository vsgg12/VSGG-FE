import Image from 'next/image';
import loadTempIcon from '../../../../../../../../../../public/svg/postWrite/temp/loadTempIcon.svg';
import deleteTempIcon from '../../../../../../../../../../public/svg/postWrite/temp/deleteTempIcon.svg';

interface Props {
  type: 'delete' | 'load';
}

const ConfirmModalContent = ({ type }: Props) => {
  return (
    <div className={'w-full gap-[10px] flex flex-col'}>
      <div className={'w-full gap-[10px] text-black font-bold text-[24px]'}>
        {type === 'load' ? (
          <div className={'flex gap-[10px] items-center'}>
            <Image src={loadTempIcon} alt={'불러오기 아이콘'} width={30} height={30} />
            <div>임시저장 글 불러오기</div>
          </div>
        ) : (
          <div className={'flex gap-[10px] items-center'}>
            <Image src={deleteTempIcon} alt={'삭제 아이콘'} width={30} height={30} />
            <div>임시저장 글 작성하기</div>
          </div>
        )}
      </div>
      <div className={'w-full text-[18px] text-[#777777]'}>
        {type === 'load' ? (
          <>
            <p>임시저장된 글을 불러오시겠습니까?</p>
            <p>현재 작성중인 글은 자동으로 저장되지 않습니다.</p>
          </>
        ) : (
          <p>임시저장된 글을 삭제하시겠습니까?</p>
        )}
      </div>
    </div>
  );
};
export default ConfirmModalContent;
