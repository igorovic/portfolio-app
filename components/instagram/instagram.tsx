import useSWR from "swr";
import Image from "next/image";
import type { InstagramMedia } from "lib/instagram";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
interface ApiResponse {
  data?: InstagramMedia[];
  error?: string;
  code?: string;
  errorDetails?: string;
}
const mediaFetcher = async () =>
  (
    await fetch("/api/instagram/mymedia", { credentials: "same-origin" })
  ).json();

function Instagram() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { data, error } = useSWR<ApiResponse>("mymedia", mediaFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.debug("instagram media", data);
  if (data?.error && data?.code === "ACCESSTOKEN_MISSING") {
    return (
      <p>
        <Button
          onClick={() => {
            router.push("/api/instagram/authorize");
          }}
        >
          request Instagram authorization
        </Button>
      </p>
    );
  }
  if (data?.error && data?.code === "AUTHENTICATION_REQUIRED") {
    return (
      <div>
        <p>To use this page you need to authenticate first.</p>
        <Button onClick={() => signIn()}>{t("signin")}</Button>
      </div>
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
      <div className="grid grid-cols-4 gap-2">
        {data?.data?.map((media, idx) => {
          if (media.media_type === "IMAGE") {
            return (
              <div key={media.id + idx}>
                <Image
                  src={media.media_url}
                  loader={({ src }) => src}
                  alt={media.id}
                  width={400}
                  height={400}
                  layout="responsive"
                ></Image>
              </div>
            );
          } else if (media.media_type === "VIDEO") {
            return <video src={media.media_url} controls></video>;
          }
        })}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default Instagram;
