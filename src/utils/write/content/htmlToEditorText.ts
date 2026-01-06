/**
 * html → textarea용 텍스트
 * @param html
 */
const htmlToEditorText = (html: string) => {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const lines: string[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeName === 'P') {
      lines.push(node.textContent ?? '');
    }
  });

  return lines.join('\n');
};

export default htmlToEditorText;
