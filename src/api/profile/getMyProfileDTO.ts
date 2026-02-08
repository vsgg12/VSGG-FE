import api from "@/_lib/fetcher";

export default async function getMyProfileDTO(token: string) {
    const data = await api.get<IGetMyPageType>({ endpoint: "/mypage", authorization: token });
    return data;
}