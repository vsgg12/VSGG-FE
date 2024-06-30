import api from '@/_lib/fetcher';

type IGetNaverUrl = {
  naverLoginUrl: string;
};

export default async function getNaverURL() {
  const data = await api.get<IGetNaverUrl>({ endpoint: `/oauth/naver` });
  return data;
}
