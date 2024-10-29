import api from "@/_lib/fetcher";

export default async function deletePost(postId: string, token: string) {
    const data = await api.delete({
        endpoint: `/post/${postId}`,
        authorization: token
    })
    return data;
}