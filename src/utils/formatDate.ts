const formatDate = (dateString: string): string => {
  if (dateString.length !== 8) {
    throw new Error('Invalid date string. It must be in the format YYYYMMDD.');
  }

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return `${year}.${month}.${day}`;
};

export default formatDate;
