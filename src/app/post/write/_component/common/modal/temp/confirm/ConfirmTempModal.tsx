'use client';

import ModalOverlay from '@/app/post/write/_component/common/modal/ModalOverlay';
import { useTempStore } from '@/store/temp/useTempStore';
import ConfirmFooter from '@/app/post/write/_component/common/modal/temp/confirm/footer/ConfirmFooter';
import { YOUTUBE_REGEX } from '@/constants/regex';
import { useWriteStore } from '@/store/write/useWriteStore';
import ConfirmModalContent from '@/app/post/write/_component/common/modal/temp/confirm/content/ConfirmModalContent';

interface Props {
  type: 'load' | 'delete';
}

const ConfirmTempModal = ({ type }: Props) => {
  const { setData: setTempData, deleteTempItem, selectedTempId, fetchAllTempList } = useTempStore();
  const { setData: setWriteData, clearAll } = useWriteStore();

  const onCloseModal = () => {
    setTempData(type === 'delete' ? 'deleteTempItemModalOpen' : 'loadTempDetailModalOpen', false);
  };

  const onClickConfirm = () => {
    if (type === 'load') {
      clearAll();
      const videoLink =
        'https://www.youtube.com/watch?v=xYFH5kgEnMg&list=RDxYFH5kgEnMg&start_radio=1';
      setWriteData('selectedMethod', '유튜브 링크');
      setWriteData('postRequestData', {
        title: '테스트 목 데이터 제목',
        videoType: 'LINK',
        inGameInfoRequests: [
          {
            inGameInfoId: 1,
            championName: '나르',
            position: '서폿',
            tier: '그랜드마스터',
          },
          {
            inGameInfoId: 2,
            championName: '자헨',
            position: '미드',
            tier: '브론즈',
          },
        ],
        videoLink,
        voteEndDate: '20260101',
      });
      setWriteData('isSelectJudgeTypeScreenShow', true);
      setWriteData('content', '<p>이건 좀 아니지 않냐</p><p>인정?</p>');
      setWriteData('videoId', videoLink.match(YOUTUBE_REGEX)![4]);
    } else {
      // 삭제 api 호출
      deleteTempItem(selectedTempId!);
      fetchAllTempList();
    }
  };

  return (
    <ModalOverlay onClose={onCloseModal}>
      <div
        className={
          'w-[443px] h-[229px] pb-[34px] pt-[30px] px-[50px] rounded-[10px] bg-white shadow-md z-[60] gap-[24px] flex flex-col'
        }
      >
        <ConfirmModalContent type={type} />

        <ConfirmFooter onClickCancel={onCloseModal} onClickConfirm={onClickConfirm} />
      </div>
    </ModalOverlay>
  );
};

export default ConfirmTempModal;
