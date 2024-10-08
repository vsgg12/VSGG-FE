import api from '@/_lib/fetcher';

interface IPatchMyProfileImageProps {
  token: string;
  profile: string;
}

interface IPatchMyNicknameProps {
  token: string;
  nickName: string;
}

export async function PatchMyProfileImage({ token, profile }: IPatchMyProfileImageProps) {
  const data = await api.patch({
    endpoint: '/mypage/profile',
    authorization: token,
    body: { profile: profile },
  });
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
