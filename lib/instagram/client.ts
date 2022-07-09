import axios from "axios";

export const instagramApiUrl = "https://api.instagram.com";
export const instagramClient = axios.create({
  baseURL: instagramApiUrl,
});

export const instagramGraphClient = axios.create({
  baseURL: "https://graph.instagram.com",
});

interface GetUserMediaResponse {
  data?: Array<{ id: string }>;
}

export interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  username: string;
}

export async function getMedia(
  id: string,
  access_token: string
): Promise<InstagramMedia> {
  const R = await instagramGraphClient.get<InstagramMedia>(`/${id}`, {
    params: {
      access_token,
      fields:
        "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username",
    },
  });
  return R.data;
}

export async function getUserMedia(
  uid: string,
  access_token: string
): Promise<InstagramMedia[]> {
  let media: InstagramMedia[] = [];
  const R = await instagramGraphClient.get<GetUserMediaResponse>(
    `${uid}/media`,
    {
      params: { access_token },
    }
  );
  if (R.data.data) {
    const allMediaFetch = R.data.data.map(({ id: media_id }) =>
      getMedia(media_id, access_token)
    );
    const _media = (await Promise.allSettled(allMediaFetch)).map((P) => {
      if (P.status === "fulfilled") {
        return P.value;
      }
    });
    media = _media.filter(Boolean) as InstagramMedia[];
  }
  return media;
}
