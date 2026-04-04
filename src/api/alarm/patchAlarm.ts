import api from '@/_lib/fetcher';

type IPatchAlarmType = {
  resultCode: number;
  resultMsg: string;
};

export async function patchAlarm(accessToken: string, alarmId: number, alarmType: string) {
  alarmType === 'COMMENT' ? (alarmType = 'comment') : (alarmType = 'post');
  const data = await api.patch<IPatchAlarmType>({
    endpoint: `/alarm/${alarmType}/${alarmId}`,
    authorization: accessToken,
  });
  return data;
}
