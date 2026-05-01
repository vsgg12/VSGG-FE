import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import videoPostListsIcon from '../../../../public/svg/main/videoPostListsIcon.svg';
import Icon_ListedIcon from '../../../../public/svg/main/Icon_ListedPost.svg';

interface IAlignModeToggleButton {
  isListed: boolean;
  setIsListed: Dispatch<SetStateAction<boolean>>;
  isHome?: boolean;
}

function AlignModeToggleButton({ isListed, setIsListed, isHome = false }: IAlignModeToggleButton) {
  return (
    <div>
      <button onClick={() => setIsListed(!isListed)}>
        <Image
          src={isListed ? Icon_ListedIcon : videoPostListsIcon}
          width={isHome ? 32 : 20}
          height={isHome ? 32 : 20}
          alt='영상게시글아이콘'
        />
      </button>
    </div>
  );
}

export default AlignModeToggleButton;
