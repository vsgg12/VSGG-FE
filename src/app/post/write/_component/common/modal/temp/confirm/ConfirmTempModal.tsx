'use client';

import ModalOverlay from '@/app/post/write/_component/common/modal/ModalOverlay';
import { useTempStore } from '@/store/temp/useTempStore';
import ConfirmFooter from '@/app/post/write/_component/common/modal/temp/confirm/footer/ConfirmFooter';
import { useWriteStore } from '@/store/write/useWriteStore';
import ConfirmModalContent from '@/app/post/write/_component/common/modal/temp/confirm/content/ConfirmModalContent';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'load' | 'delete';
}

const ConfirmTempModal = ({ type }: Props) => {
  const { setData: setTempData, deleteTemp, getTempDetail, selectedTempId } = useTempStore();
  const { clearAll } = useWriteStore();
  const router = useRouter();

  const onCloseModal = () => {
    setTempData(type === 'delete' ? 'deleteTempItemModalOpen' : 'loadTempDetailModalOpen', false);
  };

  const onClickConfirm = async () => {
    if (!selectedTempId) {
      alert('임시글이 유효하지 않아 불러올 수 없습니다.');
      return;
    }

    if (type === 'load') {
      clearAll();
      try {
        const category = await getTempDetail(selectedTempId);
        console.log('category', category);

        if (category === 'CHAMPION') {
          router.push('/post/write/champion');
        } else if (category === 'FAULT') {
          router.push('/post/write/fault');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      await deleteTemp(selectedTempId);
    }
  };

  return (
    <ModalOverlay onClose={onCloseModal}>
      <div
        className={
          'w-[443px] h-[229px] pb-[34px] pt-[30px] px-[50px] rounded-[10px] bg-white shadow-md z-[60] flex flex-col justify-between'
        }
      >
        <ConfirmModalContent type={type} />

        <ConfirmFooter onClickCancel={onCloseModal} onClickConfirm={onClickConfirm} />
      </div>
    </ModalOverlay>
  );
};

export default ConfirmTempModal;
