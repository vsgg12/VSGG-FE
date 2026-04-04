import api from '@/_lib/fetcher';

export type IGetNickNameCheckType = {
  resultCode: number;
  resultMsg: string;
  nicknameCheck: boolean;
};

export default async function getNicknameCheck(nickname: string) {
  const data = await api.get<IGetNickNameCheckType>({
    endpoint: `/users/nicknamecheck?nickname=${nickname}`,
  });
  return data;
}
