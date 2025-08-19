'use client';
import { useEffect, useState } from 'react';

export default function useTimeDifferenceFromNow(pastTime: string) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const ONE_MINUTE = 60000;
      const ONE_HOUR = 3600000;
      const ONE_DAY = 86400000;
      const ONE_MONTH = 2592000000;
      const ONE_YEAR = 31557600000;

      const currentTime = new Date();
      const pastDate = new Date(pastTime);
      const diffMs = currentTime.getTime() - pastDate.getTime();

      if (diffMs < ONE_MINUTE) setTimeAgo('방금 전');
      else if (diffMs < ONE_HOUR) setTimeAgo(`${Math.floor(diffMs / ONE_MINUTE)}분 전`);
      else if (diffMs < ONE_DAY) setTimeAgo(`${Math.floor(diffMs / ONE_HOUR)}시간 전`);
      else if (diffMs < ONE_MONTH) setTimeAgo(`${Math.floor(diffMs / ONE_DAY)}일 전`);
      else if (diffMs < ONE_YEAR) setTimeAgo(`${Math.floor(diffMs / ONE_MONTH)}개월 전`);
      else setTimeAgo(`${Math.floor(diffMs / ONE_YEAR)}년 전`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // 1분마다 업데이트

    return () => clearInterval(interval); // cleanup
  }, [pastTime]);

  return timeAgo;
}
