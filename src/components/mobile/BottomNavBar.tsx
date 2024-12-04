import React from 'react';
import homeIcon from '../../../public/svg/mobile/homeIcon.svg';
import postWriteIcon from '../../../public/svg/mobile/postWriteIcon.svg';
import alertIcon from '../../../public/svg/mobile/alertIcon.svg';
import myPageIcon from '../../../public/svg/mobile/myPageIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function BottomNavBar() {
  const router = useRouter();

  const handleIconClick = (icon: 'home' | 'postWrite' | 'alert' | 'myPage') => {
    switch (icon) {
      case 'home':
        router.push('/home');
        break;
      case 'postWrite':
        router.push('/post/write');
        break;
      case 'alert':
        router.push('/alert');
        break;
      case 'myPage':
        router.push('/myPage');
        break;
      default:
        return;
    }
  };

  return (
    <div className='flex justify-between w-full items-center fixed bottom-0 z-[50] bg-white h-[60px] px-[40px]'>
      <Image
        src={homeIcon}
        alt='homeIcon'
        width={32}
        height={32}
        onClick={() => handleIconClick('home')}
        className='cursor-pointer'
      />
      <Image
        src={postWriteIcon}
        alt='postWriteIcon'
        width={32}
        height={32}
        onClick={() => handleIconClick('postWrite')}
        className='cursor-pointer'
      />
      <Image
        src={alertIcon}
        alt='alertIcon'
        width={32}
        height={32}
        onClick={() => handleIconClick('alert')}
        className='cursor-pointer'
      />
      <Image
        src={myPageIcon}
        alt='myPageIcon'
        width={32}
        height={32}
        onClick={() => handleIconClick('myPage')}
        className='cursor-pointer'
      />
    </div>
  );
}

export default BottomNavBar;
