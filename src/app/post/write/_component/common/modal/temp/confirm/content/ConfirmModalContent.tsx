'use client';

import Image from 'next/image';
import loadTempIcon from '../../../../../../../../../../public/svg/postWrite/temp/loadTempIcon.svg';
import deleteTempIcon from '../../../../../../../../../../public/svg/postWrite/temp/deleteTempIcon.svg';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  type: 'delete' | 'load';
}

const ConfirmModalContent = ({ type }: Props) => {
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const iconClass = isDarkMode ? 'brightness-0 invert' : 'brightness-0';
  const descriptionClass = isDarkMode ? 'text-[#AEB1B2]' : 'text-[#787C80]';

  return (
    <div className={'flex w-full flex-col gap-[10px]'}>
      <div className={'w-full text-[24px] font-bold leading-[30px]'}>
        {type === 'load' ? (
          <div className={'flex items-center gap-[10px]'}>
            <Image
              src={loadTempIcon}
              alt={'불러오기 아이콘'}
              width={30}
              height={30}
              className={iconClass}
            />
            <div>임시저장 글 불러오기</div>
          </div>
        ) : (
          <div className={'flex items-center gap-[10px]'}>
            <Image
              src={deleteTempIcon}
              alt={'삭제 아이콘'}
              width={30}
              height={30}
              className={iconClass}
            />
            <div>임시저장 글 작성하기</div>
          </div>
        )}
      </div>
      <div className={`w-full text-[18px] font-medium leading-[28px] ${descriptionClass}`}>
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
