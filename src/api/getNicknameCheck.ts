import api from '@/_lib/fetcher';

export default async function getNicknameCheck(nickname: string) {
  const data = await api.get({ endpoint: `/users/nicknamecheck?nickname=${nickname}` });
  return data;
}
