import useConvertHTML from '@/hooks/useConvertHTML';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon_heart from '../../../../public/svg/postItem/heart.svg';
import Icon_heart_hover from '../../../../public/svg/postItem/heart_hover.svg';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_vote_hover from '../../../../public/svg/postItem/vote_hover.svg';
import Icon_view from '../../../../public/svg/postItem/view.svg';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import patchCancelLike from '@/api/like/patchCancelLike';
import { useLoginStore } from '@/store/login/useLoginStore';
import ChampionVoteBox from '@/app/home/_component/vote/champion/ChampionVoteBox';

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
  const [heartIcon, setHeartIcon] = useState<string>(Icon_heart);

  useEffect(() => {
    setIsLiked(post.liked);

    if (post.liked) {
      setHeartIcon(Icon_heart_hover);
    }
  }, [post]);

  useEffect(() => {
    if (!isLiked) {
      if (isHovered == 'like') {
        setHeartIcon(Icon_heart_hover);
      } else {
        setHeartIcon(Icon_heart);
      }
    }
  }, [isHovered, isLiked]);

  useEffect(() => {
    if (isLiked) {
      setHeartIcon(Icon_heart_hover);
    } else {
      setHeartIcon(Icon_heart);
    }
  }, [isLiked]);

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

  const handleVoteClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsVoteClicked(!isVoteClicked);
  };

  const buttons = [
    {
      name: 'like',
      icon: heartIcon,
      data:
        (updatedLikeCount ?? post.likeCount) < 1000 ? updatedLikeCount ?? post.likeCount : '999+',
      onclick: handleLikePost,
    },
    {
      name: 'vote',
      icon: isHovered == 'vote' ? Icon_vote_hover : Icon_vote,
      data: post.voteCount < 1000 ? post.voteCount : '999+',
      onclick: handleVoteClick,
    },
    {
      name: 'view',
      icon: Icon_view,
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
            <div
              className='flex w-[182px] cursor-pointer items-center justify-center gap-[6px]'
              onClick={button.onclick}
              onMouseEnter={() => setIsHovered(button.name)}
              onMouseLeave={() => setIsHovered('')}
            >
              <Image src={button.icon} alt={button.name} width={24} height={24} />
              {button.data && (
                <p
                  className={`text-[14px] ${(button.name === 'like' && isLiked) || (isHovered === button.name && button.name !== 'view') ? 'text-primary-500' : 'text-semantic-text-secondary'}`}
                >
                  {button.data}
                </p>
              )}
            </div>
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
