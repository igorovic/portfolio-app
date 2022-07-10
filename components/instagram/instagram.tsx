import useSWR from "swr";
import Image from "next/image";
import type { InstagramMedia, InstagramUser } from "lib/instagram";
import { Button, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  errorDetails?: string;
}
const mediaFetcher = async () =>
  fetch("/api/instagram/mymedia", { credentials: "same-origin" }).then((r) =>
    r.json()
  );
const userFetcher = async () =>
  fetch("/api/instagram/me", { credentials: "same-origin" }).then((r) =>
    r.json()
  );

function Instagram() {
  const { t } = useTranslation("instagram");
  const router = useRouter();
  const { data, error } = useSWR<ApiResponse<InstagramMedia[]>>(
    "mymedia",
    mediaFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: user } = useSWR<ApiResponse<InstagramUser>>(
    "instagram_user",
    userFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const loading = !data && !error;
  console.debug("instagram media", data);
  console.debug("instagram user", user);
  if (loading) {
    return <Loader />;
  }
  if (data?.error && data?.code === "ACCESSTOKEN_MISSING") {
    return (
      <p>
        <Button
          onClick={() => {
            router.push("/api/instagram/authorize");
          }}
        >
          {t("connect to instagram")}
        </Button>
      </p>
    );
  }

  return (
    <div>
      {data?.error ? (
        <>
          <p>{data?.error}</p>
          <p>{data?.errorDetails}</p>
        </>
      ) : null}
      {user?.data?.username ? (
        <p className="text-md font-semibold py-2">@{user?.data?.username}</p>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {data?.data?.map((media, idx) => {
          if (media.media_type === "IMAGE") {
            return (
              <div key={media.id}>
                <Image
                  src={media.media_url}
                  unoptimized={true}
                  alt={media.id}
                  width={400}
                  height={400}
                  layout="responsive"
                ></Image>
                {media.caption ? <p>{media.caption}</p> : null}
              </div>
            );
          } else if (media.media_type === "VIDEO") {
            return (
              <video key={media.id} src={media.media_url} controls></video>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Instagram;
