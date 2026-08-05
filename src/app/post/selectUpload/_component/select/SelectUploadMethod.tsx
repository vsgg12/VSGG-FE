'use client';

import Image from 'next/image';
import React from 'react';
import DescriptionBox from '../DescriptionBox';
import SelectUploadButton from '../button/SelectUploadButton';
import videoIcon from '../../../../../../public/svg/postWrite/videoIcon.svg';

interface Props {
  onClickUploadFileBtn: () => void;
  onClickUploadLinkBtn: () => void;
}

function SelectUploadMethod({ onClickUploadFileBtn, onClickUploadLinkBtn }: Props) {
  return (
    <>
      <div className='w-full h-[202px] flex flex-col gap-[40px] justify-center items-center'>
        <Image width={138} height={138} alt={'videoIcon'} src={videoIcon} />
        <div className='text-[32px] font-bold text-gray-900'>동영상 첨부 방법을 선택해주세요.</div>
      </div>
      <DescriptionBox type={'selectMethod'} />
      <div className='w-full flex justify-between'>
        <SelectUploadButton btnTitle={'파일 첨부'} onClick={onClickUploadFileBtn} />
        <SelectUploadButton btnTitle={'유튜브 링크'} onClick={onClickUploadLinkBtn} />
      </div>
      <div className='w-full text-[12px] text-gray-300 text-center flex-col absolute bottom-[36px]'>
        <p>
          정보통신망을 통하여 저작권 침해, 명예훼손, 청소년 유해물, 음란, 불법 영상 등 위법 자료를
          게시 또는 배포하면
        </p>
        <p>해당 게시물은 경고없이 삭제되며, 법률에 따라 징역형 또는 벌금형에 처해질 수 있습니다.</p>
      </div>
    </>
  );
}

export default SelectUploadMethod;
