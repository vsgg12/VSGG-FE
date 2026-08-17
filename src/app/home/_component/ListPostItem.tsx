import React from 'react';
import Default_Profile from '../../../../public/svg/defaultProfile.svg';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useConvertHTML from '@/hooks/useConvertHTML';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import { useRouter } from 'next/navigation';
import {
  CommentActionIcon,
  MediaLikeActionIcon,
  VoteActionIcon,
} from '@/components/common/icons/PostActionIcons';

interface Props {
  post: IGetPostDTOType;
}
const videoStyle = 'w-[286px] h-[166px] rounded-[10px] aspect-video';

function ListPostItem({ post }: Props) {
  const timeAgo = useTimeDifferenceFromNow(post.createdAt);
  const contentsArr = useConvertHTML(post.content);
  const { getIcon } = useProfileTierIcon({ size: 12 });
  const router = useRouter();

  const handleClickPost = () => {
    router.push(`post/${post.id}`);
  };

  return (
    <div
      className='flex h-[368px] w-[326px] cursor-pointer flex-col gap-[10px] rounded-[10px] bg-semantic-background-surface p-[20px] text-semantic-text-primary shadow transition-transform duration-300 hover:-translate-y-[5px]'
      onClick={handleClickPost}
    >
      <div className='relative'>
        {post.thumbnailURL ? (
          <img className={videoStyle} src={post.thumbnailURL} />
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
        <div className='absolute top-[5px] right-[8px] flex items-center gap-[4px] text-semantic-icon-on-media'>
          <MediaLikeActionIcon className='h-[16px] w-[16px]' alt='like' />
          <p
            className='text-[12px]'
            style={{ textShadow: '1px 1px 3px var(--color-shadow-medium)' }}
          >
            {post.likeCount > 999 ? '999+' : post.likeCount}
          </p>
        </div>
      </div>

      <div className='flex flex-col h-[117px] justify-between gap-[4px]'>
        <div>
          <p className='text-[14px] font-bold'>{post.title}</p>
          <p className='text-[12px] w-full whitespace-nowrap overflow-hidden truncate'>
            {contentsArr.pTags[0]}
          </p>
        </div>
        <p className='text-[12px] text-semantic-text-disabled'>{timeAgo}</p>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={
              post.memberDTO.profileImage == null || post.memberDTO.profileImage == ''
                ? Default_Profile
                : post.memberDTO.profileImage
            }
            className='h-[24px] w-[24px] rounded-full mr-[10px]'
          />
          {getIcon(post.memberDTO.tier)}
          <p className='ml-[5px] text-[12px] text-semantic-text-primary'>
            {post.memberDTO.nickname}
          </p>
        </div>
        <div className='flex gap-[8px] text-[14px] text-semantic-icon-action'>
          <div className='flex items-center gap-[4px]'>
            <span className='flex h-[24px] w-[24px] items-center justify-center'>
              <VoteActionIcon />
            </span>
            <p>{post.voteCount > 999 ? '999+' : post.voteCount}</p>
          </div>
          <div className='flex items-center gap-[4px]'>
            <span className='flex h-[24px] w-[24px] items-center justify-center'>
              <CommentActionIcon />
            </span>
            <p>{post.commentCount > 999 ? '999+' : post.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPostItem;
