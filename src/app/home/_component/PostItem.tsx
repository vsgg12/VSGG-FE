import PostDeadLine from '@/components/PostDeadLine';
import React, { Dispatch, SetStateAction } from 'react';
import Icon_share from '../../../../public/svg/postItem/arrow-share.svg';
import Icon_comment from '../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import PostContentArea from './PostContentArea';
import { toast } from 'react-hot-toast';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
  showCommentPostId: number;
  setShowCommentPostId: Dispatch<SetStateAction<number>>;
}

function PostItem({ post, voteInfos, showCommentPostId, setShowCommentPostId }: Props) {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const ONE_MONTH = 2592000000;
  const ONE_YEAR = 31557600000;

  function timeDifferenceFromNow(pastTime: string) {
    const currentTime = new Date();
    const pastDate = new Date(pastTime);

    const diffMs: number = currentTime.getTime() - pastDate.getTime(); // 밀리초 단위 시간 차이 (number 타입)

    if (diffMs < ONE_MINUTE) return '방금 전';
    if (diffMs < ONE_HOUR) return `${Math.floor(diffMs / ONE_MINUTE)}분 전`;
    if (diffMs < ONE_DAY) return `${Math.floor(diffMs / ONE_HOUR)}시간 전`;
    if (diffMs < ONE_MONTH) return `${Math.floor(diffMs / ONE_DAY)}일 전`;
    if (diffMs < ONE_YEAR) return `${Math.floor(diffMs / ONE_MONTH)}개월 전`;
    return `${Math.floor(diffMs / ONE_YEAR)}년 전`;
  }

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
                post.memberDTO.profileImage === null
                  ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                  : post.memberDTO.profileImage
              }
              className='mr-[0.625rem] h-[48px] w-[48px] rounded-full text-[#D9D9D9]'
            />
            <p>{post.memberDTO.nickname}</p>
            <p className='text-[#C8C8C8] ml-[7px]'>{timeDifferenceFromNow(post.createdAt)}</p>
          </div>
          <PostDeadLine deadLine={post.daysUntilEnd} />
        </div>
        <div className='self-end '>
          <PostContentArea post={post} voteInfos={voteInfos} />
        </div>
      </div>
      <div className='flex flex-col gap-[5px] justify-end'>
        <div className='w-[44px] h-[44px] bg-[#FFFFFF] rounded-[10px] flex items-center justify-center cursor-pointer shadow'>
          <Image
            src={Icon_share}
            width={24}
            height={24}
            alt='shareIcon'
            onClick={handleSharePost}
          />
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
