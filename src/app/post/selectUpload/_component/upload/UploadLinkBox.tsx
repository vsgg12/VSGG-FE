import { ChangeEventHandler, useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../../../../../public/svg/postWrite/linkIcon.svg';
import searchIcon from '../../../../../../public/svg/postWrite/searchIcon.svg';
import loadingSpinner from '../../../../../../public/svg/postWrite/loadingSpinner.svg';
import ConfirmButton from '../button/ConfirmButton';
import { useWriteStore } from '@/store/write/useWriteStore';
import { YOUTUBE_REGEX } from '@/constants/regex';

interface IProps {
  onClose?: () => void;
}

export const UploadLinkBox = ({ onClose }: IProps) => {
  const { postAddRequest, setData, setPostAddRequest, videoId, thumbnail } = useWriteStore();

  // 전역 상태가 아닌 모달 내부에서만 사용할 지역 상태 (Local State) 선언
  // 모달을 열었을 때 기존 데이터가 있다면 초기값으로 세팅
  const [localVideoLink, setLocalVideoLink] = useState<string>(postAddRequest.videoLink ?? '');
  const [localVideoId, setLocalVideoId] = useState<string>(videoId ?? '');
  const [localThumbnail, setLocalThumbnail] = useState<Blob | null>(thumbnail);

  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(!!videoId); // 수정모드에서는 바로 확인버튼 유효해야함

  const onClickSearchBtn = async () => {
    if (!localVideoLink) {
      setIsError(true);
      return;
    }

    const match = localVideoLink.match(YOUTUBE_REGEX);
    if (!match) {
      setIsError(true);
      setData('videoId', '');
      setIsValid(false);
      return;
    }

    setIsError(false);

    const extractedId = match[4];
    setLocalVideoId(extractedId); // 전역이 아닌 지역 상태에 임시 저장

    // 유튜브 기본 썸네일 URL
    const thumbnailUrl = `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;

    try {
      setCheckLoading(true);

      // Blob으로 변환하여 setThumbnail에 저장
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      setLocalThumbnail(blob); // 썸네일도 지역 상태에 임시 저장
      setIsValid(true);
    } catch (err) {
      console.error('썸네일 Blob 변환 실패:', err);
      setIsError(true);
      setIsValid(false);
    } finally {
      setCheckLoading(false);
    }
  };

  const onClickConfirmBtn = () => {
    if (!isValid) {
      return;
    }
    // "확인" 버튼을 눌렀을 때 비로소 지역 상태의 값들을 전역 스토어에 덮어씌움
    setPostAddRequest('videoLink', localVideoLink);
    setPostAddRequest('videoType', 'LINK');
    setData('videoId', localVideoId);
    if (localThumbnail) {
      setData('thumbnail', localThumbnail);
    }
    setData('isSelectCategoryScreenShow', true);
    setLocalVideoLink('');
    setLocalVideoId('');
    setLocalThumbnail(null);

    // 저장 완료 후 모달 닫기
    if (onClose) {
      onClose();
    }
  };

  const onChangeVideoLink: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    const trimValue = currentTarget.value.trim();
    setLocalVideoLink(trimValue); // 입력할 때도 전역이 아닌 지역 상태만 변경
    setIsValid(false); // 링크가 변경되면 다시 검색(검증)을 해야 하므로 false로 변경
  };

  return (
    <div className='w-[794px] bg-white rounded-[10px] border border-gray-150 flex flex-col gap-[20px] justify-center items-center px-[10px] py-[30px]'>
      {/* input박스 */}
      <div className='flex flex-row justify-between w-[754px] h-[60px] border border-gray-150 rounded-[10px] gap-[10px] px-[20px] py-[10px] shadow-[0px_3px_3px_0px_var(--color-shadow-soft)]'>
        {/* input */}
        <div className='flex flex-row w-full'>
          <Image width={30} height={30} alt={'linkIcon'} src={linkIcon} />
          <input
            className='w-full font-semibold text-[16px] px-[15px] outline-none'
            value={localVideoLink ?? ''}
            placeholder={'https://youtu.be'}
            onChange={onChangeVideoLink}
          />
        </div>

        <div className='flex gap-[10px] items-center'>
          {/* 로딩스피너 */}
          {checkLoading && (
            <Image
              width={30}
              height={30}
              alt={'loadingSpinner'}
              src={loadingSpinner}
              className='animate-spinCustom'
            />
          )}
          {/* 검색아이콘 */}
          <Image
            width={30}
            height={30}
            alt={'searchIcon'}
            src={searchIcon}
            className='cursor-pointer'
            onClick={onClickSearchBtn}
          />
        </div>
      </div>
      {/* 미리보기도 지역 상태(localVideoId)를 기준으로 보여줌 */}
      {!isError && localVideoId && (
        <div className={`flex justify-center w-full h-[250px]`}>
          <iframe
            width='438'
            height='243'
            src={`https://www.youtube.com/embed/${localVideoId}`}
            title='YouTube video preview'
            className='rounded-[10px]'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}
      {/* 에러 메시지 */}
      {isError && (
        <div className='text-special-warning text-[16px] font-semibold'>
          링크 정보를 불러오는 데 실패했습니다. 링크를 다시 확인해주세요.
        </div>
      )}

      {/* 확인버튼 */}
      <ConfirmButton onClick={onClickConfirmBtn} isDisabled={!isValid} />
    </div>
  );
};
