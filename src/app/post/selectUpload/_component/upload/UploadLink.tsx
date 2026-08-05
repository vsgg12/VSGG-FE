'use client';

import React from 'react';
import Image from 'next/image';
import youTubeIcon from '../../../../../../public/svg/postWrite/youtubeIcon.svg';
import { UploadLinkBox } from './UploadLinkBox';

function UploadLink() {
  return (
    <div className='w-full h-[202px] flex flex-col gap-[40px] justify-center items-center'>
      <Image width={138} height={138} alt={'videoIcon'} src={youTubeIcon} />
      <div className='text-[32px] font-bold text-gray-900'>유튜브 영상 링크를 입력해주세요.</div>
      <UploadLinkBox />
    </div>
  );
}

export default UploadLink;
