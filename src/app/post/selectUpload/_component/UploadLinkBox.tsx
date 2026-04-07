import { useState } from 'react';
import Image from 'next/image';
import linkIcon from '../../../../../public/svg/postWrite/linkIcon.svg';
import searchIcon from '../../../../../public/svg/postWrite/searchIcon.svg';
import loadingSpinner from '../../../../../public/svg/postWrite/loadingSpinner.svg';
import ConfirmButton from './ConfirmButton';
import { useWriteStore } from '@/store/write/useWriteStore';
import { YOUTUBE_REGEX } from '@/constants/regex';

export const UploadLinkBox = () => {
  const { postAddRequest, setData, setPostAddRequest, videoId } = useWriteStore();

  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onClickSearchBtn = async () => {
    const videoLink = postAddRequest.videoLink;
    if (!videoLink) {
      setIsError(true);
      return;
    }

    const match = videoLink.match(YOUTUBE_REGEX);
    if (!match) {
      setIsError(true);
      setData('videoId', '');
      setIsValid(false);
      return;
    }

    setIsError(false);

    const extractedId = match[4];
    setData('videoId', extractedId);

    // 유튜브 기본 썸네일 URL
    const thumbnailUrl = `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`;

    try {
      setCheckLoading(true);

      // Blob으로 변환하여 setThumbnail에 저장
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      setData('thumbnail', blob);
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
    setPostAddRequest('videoType', 'LINK');
    setData('isSelectCategoryScreenShow', true);
  };

  const onChangeVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimValue = e.target.value.trim();
    setPostAddRequest('videoLink', trimValue);
  };

  return (
    <div className='w-[794px] bg-white rounded-[10px] border border-1/2-[#C8C8C8] flex flex-col gap-[20px] justify-center items-center px-[10px] py-[30px]'>
      {/* input박스 */}
      <div className='flex flex-row justify-between w-[754px] h-[60px] border border-1/2-[#C8C8C8] rounded-[10px] gap-[10px] px-[20px] py-[10px] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.1)]'>
        {/* input */}
        <div className='flex flex-row w-full'>
          <Image width={30} height={30} alt={'linkIcon'} src={linkIcon} />
          <input
            className='w-full font-semibold text-[16px] px-[15px] outline-none'
            value={postAddRequest.videoLink ?? ''}
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
      {/* 링크 미리보기 or 에러메시지 */}
      {!isError && videoId && (
        <div className={`flex justify-center w-full h-[250px]`}>
          <iframe
            width='438'
            height='243'
            src={`https://www.youtube.com/embed/${videoId}`}
            title='YouTube video preview'
            className='rounded-[10px]'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}
      {/* 에러 메시지 */}
      {isError && (
        <div className='text-[#D63111] text-[16px] font-semibold'>
          링크 정보를 불러오는 데 실패했습니다. 링크를 다시 확인해주세요.
        </div>
      )}

      {/* 확인버튼 */}
      <ConfirmButton onClick={onClickConfirmBtn} isDisabled={!isValid} />
    </div>
  );
};
