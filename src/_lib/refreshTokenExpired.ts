'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';

const RefreshTokenExpired = () => {
  console.log('refreshTokenExpired 함수 시작점 도달 성공');
  useAuthStore.setState({ isLogin: false, accessToken: '', refreshToken: '' });
  localStorage.clear();
  console.log('로컬은 초기화 완료했고 로그인 페이지로 이동하기 전 콘솔');
  window.location.href = `${window.location.origin}/login`;
};

export default RefreshTokenExpired;
