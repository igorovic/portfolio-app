import { ChangeEventHandler, useCallback, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { IconBrandTwitter } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import { z } from "zod";
import DownloadButtons from "./DownloadButtons";
const urlSchemaTwitter = z
  .string()
  .url()
  .refine((val) => /http.?:\/\/twitter.com\/.*/gm.test(val));
function TwitterDl() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tweet, setTweet] = useState<any>(null);

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
    fetch(`/api/twitter/get/${tweetId}`)
      .then((response) => response.json())
      .then((tweet) => {
        console.debug(tweet);
        setTweet(tweet);
      });
  }, [url]);
  return (
    <div>
      <TextInput
        error={error}
        icon={<IconBrandTwitter />}
        label={<span className="capitalize">{t("link")}</span>}
        onChange={changeHandler}
      />
      <Button disabled={!url} className="mt-4" onClick={fetchMedia}>
        {t("prepare")}
      </Button>
      <div>
        <DownloadButtons tweet={tweet} />
      </div>
    </div>
  );
}

export default TwitterDl;
