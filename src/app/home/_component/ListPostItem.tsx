import React from 'react';
import Default_Profile from '../../../../public/svg/defaultProfile.svg';
import useTimeDifferenceFromNow from '@/hooks/useTimeDifferenceFromNow';
import useConvertHTML from '@/hooks/useConvertHTML';
import useProfileTierIcon from '@/hooks/sidebar/useProfileTierIcon';
import Icon_vote from '../../../../public/svg/postItem/vote.svg';
import Icon_heart_white from '../../../../public/svg/postItem/heart_white.svg';
import Icon_comment from '../../../../public/svg/postItem/chatbox.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
        <div className='absolute top-[5px] right-[8px] flex gap-[4px]'>
          <Image src={Icon_heart_white} width={16} height={16} alt='like' />
          <p
            className='text-[12px] text-white'
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
          <p className='ml-[5px] text-[12px] text-semantic-text-primary'>{post.memberDTO.nickname}</p>
        </div>
        <div className='flex gap-[8px] text-[14px]'>
          <div className='flex gap-[4px]'>
            <Image src={Icon_vote} width={18} height={18} alt='vote_icon' />
            <p>{post.voteCount > 999 ? '999+' : post.voteCount}</p>
          </div>
          <div className='flex gap-[4px]'>
            <Image src={Icon_comment} width={18} height={18} alt='comment_icon' />
            <p>{post.commentCount > 999 ? '999+' : post.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPostItem;
