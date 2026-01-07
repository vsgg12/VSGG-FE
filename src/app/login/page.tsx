'use client';

import { useMediaQuery } from 'react-responsive';
import Login_Mobile from './mobile/LoginMobile';

export default function Login() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return <>{isMobile && <Login_Mobile />}</>;
}
