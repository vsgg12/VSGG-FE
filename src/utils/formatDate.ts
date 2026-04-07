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
