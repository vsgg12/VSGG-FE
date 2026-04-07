import api from '@/_lib/fetcher';

interface IGetMyJudgeListsProps {
  token: string;
  size: string;
  page: string;
}

export default async function getMyJudgeList({ token, size, page }: IGetMyJudgeListsProps) {
  const data = await api.get<IGetMyJudgeType>({
    endpoint: `/mypage/vote?size=${size}&page=${page}`,
    authorization: token,
  });
  return data;
}
