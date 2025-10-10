'use client'

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { useState } from 'react';

function SelectUpload() {

    const { isLogin, accessToken } = useAuthStore();
    const router = useRouter();

    const [uploadedVideo, setUploadedVideo] = useState<File | undefined>(undefined);
    const [thumbnail, setThumbnail] = useState<Blob | undefined>(undefined);
    const [uploadedThumbnail, setUploadedThumbnail] = useState<File | undefined>(undefined);
    const [videoLink, setVideoLink] = useState<string>('');

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);


  return (
    <div>SelectUpload</div>
  )
}

export default SelectUpload