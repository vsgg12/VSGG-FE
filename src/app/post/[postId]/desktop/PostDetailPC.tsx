import React from 'react';
import PostInfoBox from './components/PostInfoBox';
import ContentArea from './components/ContentArea';
import CommentArea from './components/Comment/CommentArea';
import VoteArea from './components/vote/VoteArea';

interface Props {
  post: IGetPostItemType;
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
}

export default function PostDetailPC({ post, voteData, isOwner }: Props) {
  return (
    <div className='w-[1200px] flex flex-col justify-center items-center my-[30px] gap-[20px]'>
      <PostInfoBox post={post} />
      <div className='flex gap-[30px]'>
        <div className='flex flex-col gap-[30px]'>
          <ContentArea post={post.postDTO} />
          <VoteArea post={post} voteData={voteData} isOwner={isOwner} />
        </div>
        <div>
          <CommentArea id={post.postDTO.id} />
        </div>
      </div>
    </div>
  );
}
