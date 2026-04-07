export const convertFileToBlob = (file: File | null | undefined): Blob | null => {
  if (!file) {
    return null;
  }
  return new Blob([file], { type: file.type });
};
