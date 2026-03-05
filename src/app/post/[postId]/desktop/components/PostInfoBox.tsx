import React, { useEffect, useState } from 'react';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import PostDeadLine from '@/components/PostDeadLine';
import Icon_eye from '../../../../../../public/svg/postItem/eye.svg';
import Icon_more from '../../../../../../public/svg/postItem/Icon_more.svg';
import Image from 'next/image';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import MoreModal from '@/components/modals/MoreModal';

interface Props {
  post: IGetPostItemType;
}

function PostInfoBox({ post }: Props) {
  const { user } = useAuthStore();
  const timeAgo = useTimeDifferenceFromNow(post.postDTO.createdAt);
  const { getIcon } = useProfileTierIcon({ size: 18 });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

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
              post.postDTO.memberDTO.profileImage === null
                ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                : post.postDTO.memberDTO.profileImage
            }
            className='w-[52px] h-[52px] rounded-full  text-[#D9D9D9]'
          />
          <div className='flex flex-col'>
            <div className='flex gap-[3px] text-[#333333] text-[18px]'>
              {getIcon(post.postDTO.memberDTO.tier)}
              <p className='font-bold'>{post.postDTO.memberDTO.nickname}</p>
            </div>
            <div className='flex text-[#C8C8C8] items-center gap-[3px]'>
              <p>{timeAgo} ・ </p>
              <Image src={Icon_eye} width={16} height={16} alt='eyeIcon' />
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
        <Image src={Icon_more} width={30} height={30} alt='more' />
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
