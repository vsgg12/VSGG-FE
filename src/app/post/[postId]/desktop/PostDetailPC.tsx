import React from 'react';
import PostInfoBox from './components/PostInfoBox';
import ContentArea from './components/ContentArea';
import CommentArea from './components/CommentArea';
import { useLoginStore } from '@/store/login/useLoginStore';

interface Props {
  post: IGetPostItemType;
}

export default function PostDetailPC({ post }: Props) {
  const { setIsLoginModalOpen } = useLoginStore();

  return (
    <div className='w-[1200px] flex flex-col justify-center items-center my-[30px] gap-[20px]'>
      <PostInfoBox post={post} />
      <div className='flex gap-[30px]'>
        <div className='flex flex-col gap-[30px]'>
          <ContentArea post={post.postDTO} setIsLoginModalOpen={setIsLoginModalOpen} />
          {/* <VoteArea /> */}
        </div>
        <div>
          <CommentArea id={post.postDTO.id} />
        </div>
      </div>
    </div>
  );
}
