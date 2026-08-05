import PostDeadLine from '@/components/PostDeadLine';
import React, { Dispatch, SetStateAction } from 'react';
import Icon_share from '../../../../public/svg/postItem/arrow-share.svg';
import Icon_comment from '../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import PostContentArea from './PostContentArea';
import { toast } from 'react-hot-toast';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
  showCommentPostId: number;
  setShowCommentPostId: Dispatch<SetStateAction<number>>;
}

function PostItem({ post, voteInfos, showCommentPostId, setShowCommentPostId }: Props) {
  const timeAgo = useTimeDifferenceFromNow(post.createdAt);
  const { getIcon } = useProfileTierIcon({ size: 16 });

  const handleSharePost = async () => {
    try {
      await navigator.clipboard.writeText(`vsgg.co.kr/post/${post.id}`);
      toast.success('링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

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
                !post.memberDTO.profileImage
                  ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                  : post.memberDTO.profileImage
              }
              className='mr-[0.625rem] h-[48px] w-[48px] rounded-full text-gray-100'
            />
            <div className='flex gap-[5px] text-semantic-text-primary'>
              {getIcon(post.memberDTO.tier)}
              <p>{post.memberDTO.nickname}</p>
              <p className='ml-[px] text-semantic-text-disabled'>{timeAgo}</p>
            </div>
          </div>
          <PostDeadLine deadLine={post.daysUntilEnd} />
        </div>
        <div className='self-end '>
          <PostContentArea post={post} voteInfos={voteInfos} />
        </div>
      </div>
      <div className='flex flex-col gap-[5px] justify-end'>
        <div className='flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-semantic-background-surface shadow'>
          <Image
            src={Icon_share}
            width={24}
            height={24}
            alt='shareIcon'
            onClick={handleSharePost}
          />
        </div>
        <div
          className='flex h-[44px] w-[44px] cursor-pointer flex-col items-center justify-center rounded-[10px] bg-semantic-background-surface text-[12px] shadow'
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
