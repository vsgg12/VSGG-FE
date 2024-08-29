import api from "@/_lib/fetcher";

export default async function getMyPostLists(token: string) {
    const data = await api.get<IGetMyPostsType>({
        endpoint: "/users/post", authorization: token
    });
    return data;
}