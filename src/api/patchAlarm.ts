import api from '@/_lib/fetcher';

interface IPatchAlarm {
  accessToken: string;
  alarmId: number;
}

export async function patchPostAlarm({ accessToken, alarmId }: IPatchAlarm) {
  const data = await api.patch({
    endpoint: '/alarm/post',
    authorization: accessToken,
    body: alarmId,
  });
  return data;
}

export async function patchCommentAlarm({ accessToken, alarmId }: IPatchAlarm) {
  const data = await api.patch({
    endpoint: '/alarm/comment',
    authorization: accessToken,
    body: alarmId,
  });
  return data;
}
