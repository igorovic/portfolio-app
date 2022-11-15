import { ChangeEventHandler, useCallback, useState } from "react";
import { Button } from "@mantine/core";
import { IconBrandTwitter } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import { z } from "zod";
import DownloadButtons from "./DownloadButtons";
import UrlInput from "components/inputs/UrlInput";
const urlSchemaTwitter = z
  .string()
  .refine((val) => /[htps:\/]{7,8}twitter.com\/.*/gm.test(val));
function TwitterDl() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tweet, setTweet] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("common");
  const { t: t2 } = useTranslation("validation-errors");
  const invalid_url_message = t2("invalid url");
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === undefined || value.length === 0) {
        setError(null);
        setUrl("");
        return;
      }
      const error = urlSchemaTwitter.safeParseAsync(e.target.value, {
        errorMap: () => ({ message: invalid_url_message }),
      });
      error.then((validation) => {
        console.debug(validation);
        if (!validation.success) {
          setError(validation.error.issues[0].message);
          setUrl("");
        } else {
          setError(null);
          setUrl(value);
        }
      });
    },
    [invalid_url_message]
  );

  const fetchMedia = useCallback(async () => {
    const u = new URL(url);
    const tweetId = u.pathname.split("/").at(-1);
    console.debug(tweetId);
    setLoading(true);
    fetch(`/api/twitter/get/${tweetId}`)
      .then((response) => response.json())
      .then((tweet) => {
        console.debug(tweet);
        setTweet(tweet);
        setLoading(false);
      });
  }, [url]);
  return (
    <div>
      <UrlInput
        icon={<IconBrandTwitter />}
        label={<span className="capitalize">{t("link")}</span>}
        error={error}
        onChange={changeHandler}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            fetchMedia();
          }
        }}
      />
      <Button
        disabled={!url}
        className="mt-4"
        onClick={fetchMedia}
        loading={loading}
        sx={{ backgroundColor: "rebeccapurple" }}
      >
        {t("prepare")}
      </Button>
      <div>
        <DownloadButtons tweet={tweet} />
      </div>
    </div>
  );
}

export default TwitterDl;
