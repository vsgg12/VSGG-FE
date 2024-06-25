import api from "@/_lib/fetcher";

export default async function getPostItem(postId:string) {
    const data  = await api.get({ endpoint: `/post/${postId}` });
    return data;
}