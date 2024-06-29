import api from '@/_lib/fetcher';

interface IPostPostWrite {
  body: IPostWriteType;
  authorization: string;
}

export default async function postPostWrite({ body, authorization }: IPostPostWrite) {
  const data = await api.post({ endpoint: '/post', body, authorization });
  return data;
}
