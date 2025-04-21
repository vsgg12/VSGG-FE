import api from '@/_lib/fetcher';

export default async function getGoogleURL() {
  const data = await api.get<ILoginUrlType>({ endpoint: `/auth/google` });
  return data;
}
