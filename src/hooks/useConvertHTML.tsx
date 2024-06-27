import { useEffect, useState } from 'react';

export default function useConvertHTML({ content }: any) {
  const [result, setResult] = useState<any>();

  useEffect(() => {
    setResult(content);
  }, []);

  return result ? result : '없어';
}
