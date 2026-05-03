export const formatDate = (dateString: string): string => {
  if (dateString.length !== 8) {
    throw new Error('Invalid date string. It must be in the format YYYYMMDD.');
  }

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return `${year}.${month}.${day}`;
};

/**
 * 오늘 날짜 기준으로 days일 뒤 날짜를 YYYYMMDD로 반환
 */
export const getFormattedDateAfterDays = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

/**
 * 백엔드에서 오는 ISO 문자열을 'YYYY.MM.DD HH:MM' 형식으로 포매팅
 * 2025-09-30T10:49:41.877407 -> 2025.09.30 10:49
 */
// utils/formatDate.ts
export const formatDateTime = (isoString: string): string => {
  if (!isoString) return '';

  const date = new Date(isoString);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};

/**
 * 임시저장 당시 작성일(savedAt)과 마감일(voteEndDate)을 비교하여 설정했던 일수 반환
 * @param savedAt "2026.04.07 23:00"
 * @param voteEndDate "20260411"
 */
export const getOriginalDaysDiff = (savedAt: string, voteEndDate: string): number => {
  if (!savedAt || !voteEndDate || voteEndDate.length !== 8) return 1;

  try {
    // savedAt "2026.04.07 23:00"에서 날짜 부분만 추출
    const datePart = savedAt.split(' ')[0];
    const [sYear, sMonth, sDay] = datePart.split('.');
    const savedDate = new Date(Number(sYear), Number(sMonth) - 1, Number(sDay));

    // voteEndDate "YYYYMMDD" 파싱
    const eYear = voteEndDate.slice(0, 4);
    const eMonth = voteEndDate.slice(4, 6);
    const eDay = voteEndDate.slice(6, 8);
    const endDate = new Date(Number(eYear), Number(eMonth) - 1, Number(eDay));

    const diffTime = endDate.getTime() - savedDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // 계산된 일수가 1 미만일 경우 기본값 1 보장
    return diffDays > 0 ? diffDays : 1;
  } catch (error) {
    console.error('날짜 계산 중 오류 발생:', error);
    return 1; // 파싱 실패 시 기본값 반환
  }
};
