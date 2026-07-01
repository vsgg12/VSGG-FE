import MoreModal from '@/components/modals/MoreModal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Icon_more from '../../../../../../public/svg/Icon_more.svg';
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import DOMPurify from 'dompurify';
import usePostIdStore from '../../store/usePostIdStore';
import PostDeadLineMobile from '@/app/home/mobile/component/PostDeadLineMobile';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import Icon_eye from '../../../../../../public/svg/postItem/eye.svg';
import Icon_heart from '../../../../../../public/svg/postItem/heart.svg';
import Icon_heart_hover from '../../../../../../public/svg/postItem/heart_hover.svg';
import postPostLike from '@/api/like/postPostLike';
import patchCancelLike from '@/api/like/patchCancelLike';
import { useMutation } from '@tanstack/react-query';
import { useLoginStore } from '@/store/login/useLoginStore';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';

interface IContentArea {
  isOwner: boolean;
  post: IGetPostItemType;
}

const videoStyle = 'w-full rounded-[20px] block visible aspect-video bg-black object-contain';

function ContentAreaMobile({ isOwner, post }: IContentArea) {
  const { user, accessToken, isLogin } = useAuthStore();
  const { voteResult, setPostVoteResult } = usePostIdStore();
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
  const timeAgo = useTimeDifferenceFromNow(post.postDTO.createdAt);
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [heartIcon, setHeartIcon] = useState<string>(Icon_heart);
  const { setIsLoginModalOpen } = useLoginStore();
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);
  const { getIcon } = useProfileTierIcon({ size: 14 });

  useEffect(() => {
    if (post && user) {
      const sanitize = DOMPurify.sanitize(post.postDTO.content);
      setSanitizedHtml(sanitize);

      const newPostVoteResult = post.postDTO.inGameInfoList.map(
        (ingameInfo: IGetInGameInfoType, idx: number) => ({
          inGameInfoId: ingameInfo.inGameInfoId,
          ratio: voteResult[idx] || 0,
        }),
      );
      setPostVoteResult(newPostVoteResult);
    }
  }, [post, voteResult, setPostVoteResult, user]);

  useEffect(() => {
    setIsLiked(post.postDTO.liked);

    if (post.postDTO.liked == true) {
      setHeartIcon(Icon_heart_hover);
    }
  }, [post]);

  useEffect(() => {
    if (isLiked) {
      setHeartIcon(Icon_heart_hover);
    } else {
      setHeartIcon(Icon_heart);
    }
  }, [isLiked]);

  useEffect(() => {
    if (!isLiked) {
      if (isHovered == 'like') {
        setHeartIcon(Icon_heart_hover);
      } else {
        setHeartIcon(Icon_heart);
      }
    }
  }, [isHovered, isLiked]);

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const response = await postPostLike(accessToken, post.postDTO.id);
      return response.postLikeDTO.likeCount;
    },
    onMutate: () => {
      setIsLikeInProgress(true);
    },
    onSuccess: (likeCount) => {
      setIsLiked(true);
      setIsLikeInProgress(false);
      setUpdatedLikeCount(likeCount);
    },
    onError: (error) => {
      console.error(error.message);
      setIsLikeInProgress(false);
    },
  });

  const { mutate: unlikePost } = useMutation({
    mutationFn: async () => {
      const response = await patchCancelLike(accessToken, post.postDTO.id);
      return response.postLikeDTO.likeCount;
    },
    onMutate: () => {
      setIsLikeInProgress(true);
    },
    onSuccess: (likeCount) => {
      setIsLiked(false);
      setIsLikeInProgress(false);
      setUpdatedLikeCount(likeCount);
    },
    onError: (error) => {
      console.error(error.message);
      setIsLikeInProgress(false);
    },
  });

  const handleLikePost = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (isLikeInProgress) {
      return;
    }

    if (isLiked) {
      await unlikePost();
    } else {
      await likePost();
    }
  };

  const handleMoreIconClick = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div className='h-fit w-full'>
      {post && (
        <div className='h-fit w-full rounded-[30px] bg-[#ffffff] flex flex-col mb-[35px] gap-[15px]'>
          <div className='flex w-full'>
            <div className='flex gap-[10px] w-full justify-between items-center'>
              <div className='flex gap-[10px]'>
                <img
                  className='h-[32px] w-[32px] rounded-full'
                  src={
                    post.postDTO.memberDTO.profileImage === null
                      ? 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
                      : post.postDTO.memberDTO.profileImage
                  }
                />
                <div className='flex flex-col'>
                  <div className='flex gap-[3px]'>
                    {getIcon(post.postDTO.memberDTO.tier)}
                    <p className='text-[12px] text-[#333333] font-bold'>
                      {post.postDTO.memberDTO.nickname}
                    </p>
                  </div>
                  <div className='flex text-[12px] text-[#C8C8C8] items-center gap-[3px]'>
                    <p>{timeAgo} ・ </p>
                    <Image src={Icon_eye} width={16} height={16} alt='eyeIcon' />
                    <p> {formatNumberWithCommas(post.postDTO.viewCount)}</p>
                  </div>
                </div>
              </div>
              <PostDeadLineMobile deadLine={post.postDTO.daysUntilEnd} />
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-[#242526] text-[20px] font-bold whitespace-nowrap'>
              {post.postDTO.title}
            </p>
            <div className='flex'>
              {isMoreModalOpen && (
                <div className='absolute right-[45px] translate-y-[2px]'>
                  {isOwner ? (
                    <MoreModal type='owner' where='post' postId={post.postDTO.id} />
                  ) : (
                    <MoreModal type='user' where='post' />
                  )}
                </div>
              )}
              <Image
                className='cursor-pointer'
                alt='moreIcon'
                width={20}
                height={20}
                src={Icon_more}
                onClick={handleMoreIconClick}
              />
            </div>
          </div>
          <div className='flex flex-col w-full'>
            {post.postDTO.video.type === 'FILE' ? (
              <video
                muted
                controls
                playsInline
                poster={post.postDTO.thumbnailURL}
                className={videoStyle}
                onClick={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) {
                    video.play();
                  }
                }}
              >
                <source src={post.postDTO.video.url} type='video/mp4' />
                <source src={post.postDTO.video.url} type='video/webm' />
              </video>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(post.postDTO.video.url)}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className={videoStyle}
                title='YouTube video preview'
              />
            )}

            <div className='flex flex-col w-full gap-[20px]'>
              <div
                className='w-full mt-[10px] p-1 break-words line-clamp-[8] h-fit text-ellipsis decoration-solid'
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              ></div>
            </div>
          </div>
          <div
            className='flex cursor-pointer items-center justify-center'
            onClick={handleLikePost}
            onMouseEnter={() => setIsHovered('like')}
            onMouseLeave={() => setIsHovered('')}
          >
            <Image src={heartIcon} width={20} height={20} alt='like' />
            <p className={isLiked ? 'text-[#E20A29]' : 'text-[#555555] text-[14px]'}>
              {(updatedLikeCount ?? post.postDTO.likeCount) < 1000
                ? updatedLikeCount ?? post.postDTO.likeCount
                : '999+'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentAreaMobile;
