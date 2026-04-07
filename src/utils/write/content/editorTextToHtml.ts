/**
 * textarea 텍스트 → HTML
 * @param text
 */
const editorTextToHtml = (text: string) => {
  if (!text) return '';

  const lines = text.split('\n');

  return lines
    .map((line) => {
      // 일반 텍스트
      return `<p>${line}</p>`;
    })
    .join('');
};

export default editorTextToHtml;
