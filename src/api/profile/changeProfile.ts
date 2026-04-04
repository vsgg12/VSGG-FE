import api from '@/_lib/fetcher';

interface IPatchMyProfileImageProps {
  token: string;
  profile: FormData;
}

interface IPatchMyNicknameProps {
  token: string;
  nickName: string;
}

export async function PatchMyProfileImage({ token, profile }: IPatchMyProfileImageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/mypage/profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: profile,
  });
  if (!response.ok) {
    throw new Error('Failed to patch profile image');
  }
  const data = await response.json();
  return data;
}

export async function PatchMyNickname({ token, nickName }: IPatchMyNicknameProps) {
  const data = await api.patch({
    endpoint: '/mypage/nickname',
    authorization: token,
    body: { nickName: nickName },
  });
  return data;
}

export async function DeleteMyProfileImage(token: string) {
  const data = await api.delete({ endpoint: '/mypage/profile', authorization: token });
  return data;
}
