import api from '@/_lib/fetcher';

type IPostResult = {
  resultCode: number;
  resultMsg: string;
};

export default async function postPostWrite(body: IPostWriteType, authorization: string) {
  const data = await api.post<IPostWriteType, IPostResult>({
    endpoint: '/post',
    body,
    authorization,
  });
  return data;
}
