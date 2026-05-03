import { useWriteStore } from '@/store/write/useWriteStore';

export const useWriteValidation = () => {
  const { postAddRequest, content, setData } = useWriteStore();

  const validate = () => {
    /** 1. 제목 검사 */
    if (!postAddRequest.title.trim()) {
      setData('errMsg', '제목을 입력해주세요.');
      return false;
    }

    /** 2. 본문 검사 */
    if (!content.trim()) {
      setData('errMsg', '본문을 작성해주세요.');
      return false;
    }

    /** 3. inGameInfoRequests 검사 */
    for (const info of postAddRequest.inGameInfoRequests) {
      if (!info.championName.trim()) {
        setData('errMsg', '소환사의 챔피언을 선택해주세요.');
        return false;
      }

      if (!info.position.trim()) {
        setData('errMsg', '소환사의 포지션을 선택해주세요.');
        return false;
      }

      if (!info.tier.trim()) {
        setData('errMsg', '소환사의 티어를 선택해주세요.');
        return false;
      }

      if (postAddRequest.category === 'CHAMPION' && !info.claim) {
        setData('errMsg', '소환사의 주장을 입력해주세요.');
        return false;
      }
    }

    /** 통과 */
    setData('errMsg', '');
    return true;
  };

  return { validate };
};
