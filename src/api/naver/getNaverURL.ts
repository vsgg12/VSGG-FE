import api from '@/_lib/fetcher';

export default async function getNaverURL() {
  const data = await api.get({ endpoint: `/oauth/naver` });
  return data;
}
