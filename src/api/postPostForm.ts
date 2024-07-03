import { ICreateImageData } from "@/types/form";

export async function createPost(body: FormData, authorization: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/post`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${authorization}`,
            },
            body
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log(result);
            return result;
        } else {
            const text = await response.text();
            throw new Error(`Expected JSON response, got: ${text}`);
        }
    }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export async function saveImageAndRequestUrlToS3(formdata: FormData, authorization: string){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/image/upload`, {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function sendDeleteRequestToS3(imgUrls: ICreateImageData, authorization: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/image`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`,
      },
      body: JSON.stringify(imgUrls),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
