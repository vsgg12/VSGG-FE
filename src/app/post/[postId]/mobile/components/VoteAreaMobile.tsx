import React, { Dispatch, SetStateAction } from 'react';
import VoteResult from './VoteResultMobile';
import PostVote from '@/api/postVote';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import usePostIdStore from '../../store/usePostIdStore';
import VoteForm from './VoteFormMobile';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

function VoteAreaMobile({ voteData, isOwner, post, setIsLoginModalOpen }: IVoteArea) {
  const queryClient = useQueryClient();
  const { postVoteResult } = usePostIdStore();
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin } = useAuthStore.getState();

  const { mutate: postVote } = useMutation({
    mutationFn: () => PostVote(id, { voteList: postVoteResult }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['POST_ITEM', id] });
      await queryClient.invalidateQueries({ queryKey: ['VOTE_RESULT', id] });
    },
    onError: (err) => alert(err.message),
  });

  const handleVoteSubmit = () => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    postVote();
  };

  return (
    <div className='h-fit w-full rounded-[30px] bg-[#ffffff] flex flex-col p-[30px] gap-[15px]'>
      {(voteData && isOwner) || post?.postDTO.isVote || post?.postDTO.status === 'FINISHED' ? (
        <VoteResult
          voteInfos={voteData}
          isOwner={isOwner}
          isFinished={post?.postDTO.status === 'FINISHED'}
        />
      ) : (
        post &&
        !isOwner &&
        post.postDTO.status === 'PROGRESS' && (
          <VoteForm voteInfo={voteData} handleVoteSubmit={handleVoteSubmit} />
        )
      )}
    </div>
  );
}

export default VoteAreaMobile;
