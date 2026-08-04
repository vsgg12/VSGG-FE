'use client';

import ModalOverlay from '@/app/post/write/_component/common/modal/ModalOverlay';
import { useTempStore } from '@/store/temp/useTempStore';
import ConfirmFooter from '@/app/post/write/_component/common/modal/temp/confirm/footer/ConfirmFooter';
import { useWriteStore } from '@/store/write/useWriteStore';
import ConfirmModalContent from '@/app/post/write/_component/common/modal/temp/confirm/content/ConfirmModalContent';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  type: 'load' | 'delete';
}

const ConfirmTempModal = ({ type }: Props) => {
  const { setData: setTempData, deleteTemp, getTempDetail, selectedTempId } = useTempStore();
  const { clearAll } = useWriteStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
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
          `z-[60] flex h-[229px] w-[443px] flex-col justify-between rounded-[10px] px-[50px] pb-[34px] pt-[30px] shadow-md ${
            isDarkMode
              ? 'bg-[#303233] text-[#F1F2F2]'
              : 'bg-white text-[#242526]'
          }`
        }
      >
        <ConfirmModalContent type={type} />

        <ConfirmFooter onClickCancel={onCloseModal} onClickConfirm={onClickConfirm} />
      </div>
    </ModalOverlay>
  );
};

export default ConfirmTempModal;
