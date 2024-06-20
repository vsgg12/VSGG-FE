"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 탭 전환
          retryOnMount: true, // 컴포넌트가 unmouned됭 이후 mount 되었을때
          refetchOnReconnect: true, // 인터넷 연결 재접속시
          retry: false, // 데티어 실패시 재 도전
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

export default RQProvider;
