import React, { useEffect, useState } from 'react';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import PostDeadLine from '@/components/PostDeadLine';
import Icon_eye from '../../../../../../public/svg/postItem/eye.svg';
import Icon_more from '../../../../../../public/svg/postItem/Icon_more.svg';
import Image from 'next/image';
import Default_Profile from '../../../../../../public/svg/defaultProfile.svg';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface Props {
  post: IGetPostItemType;
}

function PostInfoBox({ post }: Props) {
  const { user } = useAuthStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const timeAgo = useTimeDifferenceFromNow(post.postDTO.createdAt);
  const { getIcon } = useProfileTierIcon({ size: 18 });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
  const nicknameClass = isDarkMode ? 'text-[#F1F2F2]' : 'text-gray-850';
  const metaClass = isDarkMode ? 'text-[#484B4D]' : 'text-gray-150';
  const moreIconClass = isDarkMode ? 'opacity-70 brightness-0 invert' : '';

  useEffect(() => {
    if (post.postDTO.memberDTO.email == user?.email) {
      setIsOwner(true);
    }
  }, [user?.email, post.postDTO.memberDTO.email]);

  const handleMoreIconClick = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };
  return (
    <div className='w-full flex justify-between relative'>
      <div className='w-[720px] flex justify-between items-center'>
        <div className='flex gap-[10px]'>
          <img
            src={
              post.postDTO.memberDTO.profileImage == null ||
              post.postDTO.memberDTO.profileImage == ''
                ? Default_Profile
                : post.postDTO.memberDTO.profileImage
            }
            className='w-[52px] h-[52px] rounded-full  text-gray-100'
            width={52}
            height={52}
            alt='profile_image'
          />
          <div className='flex flex-col'>
            <div className={`flex gap-[3px] text-[18px] ${nicknameClass}`}>
              {getIcon(post.postDTO.memberDTO.tier)}
              <p className='font-bold'>{post.postDTO.memberDTO.nickname}</p>
            </div>
            <div className={`flex items-center gap-[3px] ${metaClass}`}>
              <p>{timeAgo} ・ </p>
              <Image
                src={Icon_eye}
                width={16}
                height={16}
                alt='eyeIcon'
                className={isDarkMode ? 'opacity-70' : ''}
              />
              <p className='text-[14px]'> {formatNumberWithCommas(post.postDTO.viewCount)}</p>
            </div>
          </div>
        </div>
        <PostDeadLine deadLine={post.postDTO.daysUntilEnd} />
      </div>
      <div
        className='w-[452px] cursor-pointer flex items-center justify-end'
        onClick={handleMoreIconClick}
      >
        <Image src={Icon_more} width={30} height={30} alt='more' className={moreIconClass} />
      </div>
      {isMoreModalOpen && (
        <div className='absolute right-0 top-[40px]'>
          {isOwner ? (
            <MoreModal
              type='owner'
              where='post'
              postId={post.postDTO.id}
              isEditPostPossible={post.postDTO.daysUntilEnd > 0}
            />
          ) : (
            <MoreModal type='user' where='post' />
          )}
        </div>
      )}
    </div>
  );
}

export default PostInfoBox;
