import api from '@/_lib/fetcher';

export default async function getAlarms(token: string) {
  const data = await api.get({ endpoint: `/alarm`, authorization: token });
  return data;
}
