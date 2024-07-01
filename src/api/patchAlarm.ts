import api from '@/_lib/fetcher';

export interface IPatchAlarm {
  accessToken: string;
  alarmId: number;
  alarmType: string;
}

type IPatchAlarmType = {
  resultCode: number;
  resultMsg: string;
};

export async function patchAlarm({ accessToken, alarmId, alarmType }: IPatchAlarm) {
  const data = await api.patch<IPatchAlarmType>({
    endpoint: `/alarm/${alarmType}/${alarmId}`,
    authorization: accessToken,
  });
  return data;
}
