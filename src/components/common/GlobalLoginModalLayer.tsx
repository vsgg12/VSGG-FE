'use client';

import React from 'react';
import { useLoginStore } from '@/store/login/useLoginStore';
import ModalLayout from '@/components/modals/ModalLayout';
import LoginModal from '@/components/modals/login/LoginModal';

const GlobalLoginModalLayer = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useLoginStore();

  if (!isLoginModalOpen) return null;

  return (
    <ModalLayout setIsLoginModalOpen={setIsLoginModalOpen}>
      <LoginModal />
    </ModalLayout>
  );
};

export default GlobalLoginModalLayer;