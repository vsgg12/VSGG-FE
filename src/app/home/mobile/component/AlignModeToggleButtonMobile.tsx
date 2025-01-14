import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import videoPostListsIcon from '../../../../../public/svg/videoPostListsIcon.svg';
import Icon_ListedIcon from '../../../../../public/svg/Icon_ListedPost.svg';

interface IAlignModeToggleButton {
  isListed: boolean;
  setIsListed: Dispatch<SetStateAction<boolean>>;
}

export default function AlignModeToggleButtonMobile({
  isListed,
  setIsListed,
}: IAlignModeToggleButton) {
  return (
    <div>
      <button onClick={() => setIsListed(!isListed)}>
        <Image
          src={isListed ? Icon_ListedIcon : videoPostListsIcon}
          width={24}
          height={24}
          alt='영상게시글아이콘'
        />
      </button>
    </div>
  );
}
