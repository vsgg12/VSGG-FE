'use server';

import api from '@/_lib/fetcher';

export default async function getComments(postId: string) {
  const data = await api.get({ endpoint: `/post/${postId}/comment` });
  return data;
}
