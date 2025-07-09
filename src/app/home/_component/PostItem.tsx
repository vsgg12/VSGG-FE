import PostDeadLine from '@/components/PostDeadLine';
import React, { Dispatch, SetStateAction } from 'react';
import Icon_share from '../../../../public/svg/postItem/arrow-share.svg';
import Icon_comment from '../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import PostContentArea from './PostContentArea';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
  showCommentPostId: number;
  setShowCommentPostId: Dispatch<SetStateAction<number>>;
}

function PostItem({ post, voteInfos, showCommentPostId, setShowCommentPostId }: Props) {
  const handleOpenComment = () => {
    if (showCommentPostId == post.id) {
      setShowCommentPostId(-1);
    } else {
      setShowCommentPostId(post.id);
    }
  };

  return (
    <div className='flex w-[698px] gap-[10px] justify-end '>
      <div className='flex flex-col w-full'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <img
              src={
                post.memberDTO.profileImage === null
                  ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                  : post.memberDTO.profileImage
              }
              className='mr-[0.625rem] h-[48px] w-[48px] rounded-full text-[#D9D9D9]'
            />
            <p>{post.memberDTO.nickname}</p>
          </div>
          <PostDeadLine deadLine={post.daysUntilEnd} />
        </div>
        <div className='self-end '>
          <PostContentArea post={post} />
        </div>
      </div>
      <div className='flex flex-col gap-[5px] justify-end'>
        <div className='w-[44px] h-[44px] bg-[#FFFFFF] rounded-[10px] flex items-center justify-center cursor-pointer shadow'>
          <Image src={Icon_share} width={24} height={24} alt='shareIcon' />
        </div>
        <div
          className='w-[44px] h-[44px] bg-[#FFFFFF] rounded-[10px] flex flex-col justify-center items-center cursor-pointer text-[12px] shadow'
          onClick={handleOpenComment}
        >
          <Image src={Icon_comment} width={20} height={20} alt='commentIcon' />
          <p>{post.commentCount < 1000 ? post.commentCount : '999+'}</p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
