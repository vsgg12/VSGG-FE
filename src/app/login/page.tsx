'use client';

import { useMediaQuery } from 'react-responsive';
import LoginMobile from './mobile/LoginMobile';

export default function Login() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return <>{isMobile && <LoginMobile />}</>;
}
