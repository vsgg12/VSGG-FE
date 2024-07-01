import api from '@/_lib/fetcher';

interface IPostPostWrite {
  body: IPostWriteType;
  authorization: string;
}

type IPostResult = {
  resultCode: number;
  resultMsg: string;
};

export default async function postPostWrite({ body, authorization }: IPostPostWrite) {
  const data = await api.post<IPostWriteType, IPostResult>({
    endpoint: '/post',
    body,
    authorization,
  });
  return data;
}
