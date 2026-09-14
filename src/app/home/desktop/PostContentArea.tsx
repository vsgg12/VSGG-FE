import useConvertHTML from '@/hooks/useConvertHTML';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import patchCancelLike from '@/api/like/patchCancelLike';
import { useLoginStore } from '@/store/login/useLoginStore';
import ChampionVoteBox from '@/app/home/_component/vote/champion/ChampionVoteBox';
import {
  LikeActionIcon,
  ViewActionIcon,
  VoteActionIcon,
} from '@/components/common/icons/PostActionIcons';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}

const videoStyle = 'w-[526px] h-[296px] rounded-[20px] aspect-video ';

function PostContentArea({ post, voteInfos }: Props) {
  const router = useRouter();
  const { accessToken, user, isLogin } = useAuthStore();
  const { setIsLoginModalOpen } = useLoginStore();
  const contentsArr = useConvertHTML(post.content);
  const [isImageClick, setIsImageClick] = useState<boolean>(false);
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number | null>(null);
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);
  const [isVoteClicked, setIsVoteClicked] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(post.liked);
  }, [post]);

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const response = await postPostLike(accessToken, post.id);
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
      const response = await patchCancelLike(accessToken, post.id);
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

  const handleLikePost = async (e: React.MouseEvent<HTMLElement>) => {
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

  const handleVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsVoteClicked(!isVoteClicked);
  };

  const buttons = [
    {
      name: 'like',
      data:
        (updatedLikeCount ?? post.likeCount) < 1000 ? updatedLikeCount ?? post.likeCount : '999+',
      onclick: handleLikePost,
    },
    {
      name: 'vote',
      data: post.voteCount < 1000 ? post.voteCount : '999+',
      onclick: handleVoteClick,
    },
    {
      name: 'view',
      data: post.viewCount < 1000 ? post.viewCount : '999+',
      onclick: () => {
        return;
      },
    },
  ];

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsImageClick(true);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div
      className='flex h-fit min-h-[448px] w-[586px] cursor-pointer flex-col gap-[12px] rounded-[20px] bg-semantic-background-surface px-[30px] py-[20px] text-semantic-text-primary shadow transition-shadow duration-300 hover:shadow-xl'
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <div className='flex flex-col h-[60px]'>
        <p className='text-[20px] font-bold'>{post.title}</p>
        <p className='text-[16px] w-full whitespace-nowrap overflow-hidden truncate'>
          {contentsArr.pTags[0]}
        </p>
      </div>
      <div>
        {isImageClick ? (
          <video
            muted
            controls
            autoPlay
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
            onClick={(e) => e.stopPropagation}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : post.thumbnailURL ? (
          <img
            className={videoStyle}
            src={post.thumbnailURL}
            onClick={handleImageClick}
            alt={'thumbnail'}
          />
        ) : post.video.type === 'FILE' ? (
          <video
            muted
            controls
            playsInline
            poster={post.thumbnailURL}
            className={`block visible ${videoStyle}`}
          >
            <source src={post.video.url} type='video/mp4' />
            <source src={post.video.url} type='video/webm' />
          </video>
        ) : (
          //외부영상 첨부할 때 사용
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(post.video.url)}`}
            width='526'
            height='296'
            allowFullScreen
            className='rounded-[10px] block visible'
          />
        )}
      </div>
      <div className='flex h-[24px]'>
        {buttons.map((button, idx) => (
          <React.Fragment key={idx}>
            {(() => {
              const isActive = button.name === 'like' && (isLiked || isHovered === button.name);
              const colorClass = isActive ? 'text-primary-500' : 'text-semantic-icon-action';

              return (
                <div
                  className='flex w-[182px] cursor-pointer items-center justify-center gap-[6px]'
                  onClick={button.onclick}
                  onMouseEnter={() => setIsHovered(button.name)}
                  onMouseLeave={() => setIsHovered('')}
                >
                  {button.name === 'like' ? (
                    <LikeActionIcon className='h-[24px] w-[24px]' alt='like' />
                  ) : button.name === 'vote' ? (
                    <span className='flex h-[24px] w-[24px] items-center justify-center'>
                      <VoteActionIcon className='h-[24px] w-[24px]' />
                    </span>
                  ) : (
                    <span className='flex h-[24px] w-[24px] items-center justify-center'>
                      <ViewActionIcon className='h-[24px] w-[24px]' alt='view' />
                    </span>
                  )}
                  {button.data && <p className={`text-[14px] ${colorClass}`}>{button.data}</p>}
                </div>
              );
            })()}
            {idx !== 2 && <div className='h-[20px] w-[1px] bg-semantic-border-strong'></div>}
          </React.Fragment>
        ))}
      </div>
      {isVoteClicked && (
        <div className='relative flex h-[253px] items-center justify-center rounded-[20px] '>
          <ChampionVoteBox
            voteData={voteInfos}
            voteCount={post.voteCount}
            daysUntilEnd={post.daysUntilEnd}
            isOwner={post.memberDTO.nickname === user?.nickname}
            isVote={post.isVote}
            isHome={true}
          />
        </div>
      )}
    </div>
  );
}

export default PostContentArea;
