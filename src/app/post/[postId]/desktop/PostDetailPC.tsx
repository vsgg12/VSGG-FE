import React, { useEffect, useState } from 'react';
import PostInfoBox from './components/PostInfoBox';
import ContentArea from './components/ContentArea';
import CommentArea from './components/Comment/CommentArea';
import { useLoginStore } from '@/store/login/useLoginStore';
import VoteArea from './components/vote/VoteArea';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface Props {
  post: IGetPostItemType;
  voteData: IGetInGameInfoType[];
}

export default function PostDetailPC({ post, voteData }: Props) {
  const { user } = useAuthStore();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (post?.postDTO?.memberDTO?.email === user?.email) {
      setIsOwner(true);
    }
  }, [post, user]);

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
