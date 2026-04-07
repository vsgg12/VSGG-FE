import editorTextToHtml from '@/utils/write/content/editorTextToHtml';

export interface IProps {
  isDraft: boolean;
  postAddRequest: IPostAddTempRequestType;
  content: string;
  uploadVideos?: File | null;
  thumbnail?: Blob | null;
  postId?: string;
}

/**
 * 게시글 생성 및 임시저장용 FormData를 생성하는 유틸 함수
 */
export const createPostFormData = ({
  isDraft,
  postAddRequest,
  content,
  uploadVideos,
  thumbnail,
  postId,
}: IProps): FormData => {
  const formData = new FormData();

  if (uploadVideos && uploadVideos instanceof File && !postId) {
    formData.append('uploadVideos', uploadVideos);
  }

  if (thumbnail) {
    formData.append('thumbnailImage', thumbnail);
  }

  if (content) {
    const htmlContent = editorTextToHtml(content);
    const contentBlob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
    formData.append('content', contentBlob, 'content.html');
  }

  const requestJson = {
    ...postAddRequest,
    draft: isDraft,
    inGameInfoRequests: postAddRequest.inGameInfoRequests.map((item) => ({
      tier: item.tier,
      championName: item.championName,
      position: item.position,
      claim: item.claim ?? null,
    })),
  };

  console.log(requestJson);

  formData.append(
    'postAddRequest',
    new Blob([JSON.stringify(requestJson)], { type: 'application/json' }),
  );

  return formData;
};
