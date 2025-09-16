import useConvertHTML from '@/hooks/useConvertHTML';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon_heart from '../../../../public/svg/postItem/heart.svg';
import Icon_heart_hover from '../../../../public/svg/postItem/heart_hover.svg';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_vote_hover from '../../../../public/svg/postItem/vote_hover.svg';
import Icon_view from '../../../../public/svg/postItem/view.svg';
import Doughnut from '../../../../public/svg/Douhnut_small.svg';
import postPostLike from '@/api/like/postPostLike';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import HomeVoted from './HomeVoted';
import HomeNotVoted from './HomeNotVoted';
import patchCancelLike from '@/api/like/patchCancelLike';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';

interface Props {
  post: IGetPostDTOType;
  voteInfos: IGetInGameInfoType[];
}

const videoStyle = 'w-[526px] h-[296px] rounded-[20px] aspect-video ';

function PostContentArea({ post, voteInfos }: Props) {
  const router = useRouter();
  const { accessToken, user, isLogin } = useAuthStore();
  const contentsArr = useConvertHTML(post.content);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isImageClick, setIsImageClick] = useState<boolean>(false);
  const [updatedLikeCount, setUpdatedLikeCount] = useState<number | null>(null);
  const [isLikeInProgress, setIsLikeInProgress] = useState<boolean>(false);
  const [isVoteClicked, setIsVoteClicked] = useState<boolean>(false);
  const [isNoOneVoted, setIsNoOneVoted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [heartIcon, setHeartIcon] = useState<string>(Icon_heart);

  useEffect(() => {
    setIsLiked(post.liked);

    if (post.voteCount === 0) {
      setIsNoOneVoted(true);
    }

    if (post.liked == true) {
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

  return (
    <div
      className='bg-[#FFFFFF] w-[586px] h-fit min-h-[448px] rounded-[20px] px-[30px] py-[20px] cursor-pointer flex flex-col gap-[12px] shadow hover:shadow-xl transition-shadow duration-300'
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
          <img className={videoStyle} src={post.thumbnailURL} onClick={handleImageClick} />
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
            className={videoStyle}
            src={post.video.url}
            title={post.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
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
                  className={`text-[14px] ${(button.name === 'like' && post.liked == true) || (isHovered === button.name && isHovered !== 'view') ? 'text-[#8A1F21]' : 'text-[#555555]'}`}
                >
                  {button.data}
                </p>
              )}
            </div>
            {idx !== 2 && <div className='h-[20px] w-[1px] bg-[#555555]'></div>}
          </React.Fragment>
        ))}
      </div>
      {isVoteClicked && (
        <div className='relative flex h-[167px] items-center justify-center rounded-[20px] '>
          {(post.status === 'FINISHED' && isNoOneVoted) || post.memberDTO.email === user?.email ? (
            <div className='flex w-full relative justify-center'>
              <p className='flex justify-center items-center absolute text-[16px] inset-0 text-[#828282]'>
                {post.status === 'FINISHED'
                  ? '투표한 사람이 없는 게시글입니다.'
                  : '아직 투표한 사람이 없는 게시글입니다.'}
              </p>
              <Image src={Doughnut} width={146} height={146} alt='doughnut' />
            </div>
          ) : post.isVote || post.status === 'FINISHED' ? (
            <HomeVoted voteInfos={voteInfos} />
          ) : (
            <HomeNotVoted voteInfos={voteInfos} />
          )}
        </div>
      )}
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}

export default PostContentArea;
