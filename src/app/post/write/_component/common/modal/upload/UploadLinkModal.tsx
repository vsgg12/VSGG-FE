import React from 'react';
import ModalOverlay from '@/app/post/write/_component/common/modal/ModalOverlay';
import { UploadLinkBox } from '@/app/post/selectUpload/_component/upload/UploadLinkBox';

interface UploadLinkModalProps {
  onClose: () => void;
}

const UploadLinkModal = ({ onClose }: UploadLinkModalProps) => {
  return (
    <ModalOverlay onClose={onClose}>
      <UploadLinkBox onClose={onClose} />
    </ModalOverlay>
  );
};

export default UploadLinkModal;
