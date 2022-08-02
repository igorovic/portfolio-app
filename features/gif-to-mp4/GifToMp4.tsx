import { Button } from "@mantine/core";
import UrlInput from "components/inputs/UrlInput";
import { useTranslation } from "next-i18next";
import React, { ChangeEventHandler } from "react";
import { z } from "zod";
const urlSchemaGifs = z
  .string()
  .refine((val) => /[htps:\/]{7,8}giphy.com\/.*/gm.test(val));

function GifToMp4() {
  const { t } = useTranslation("common");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { t: t2 } = useTranslation("validation-errors");
  const invalid_url_message = t2("invalid url");
  const changeHandler: ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      const value = e.target.value;
      if (value === undefined || value.length === 0) {
        setError(null);
        setUrl("");
        return;
      }
      const error = urlSchemaGifs.safeParseAsync(e.target.value, {
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

  const fetchMedia = () => {
    fetch("/api/gif", { method: "POST", body: JSON.stringify({ url }) })
      .then((r) => r.json())
      .then((json) => {
        fetch(json.gif.mp4)
          .then((r) => r.blob())
          .then((blob) => {
            const f = new File([blob], json.filename, {
              type: "application/mp4",
            });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(f);
            a.style.display = "none";
            a.download = f.name;
            document.body.appendChild(a);
            a.click();
          });
      });
  };
  return (
    <div className="flex flex-col">
      <UrlInput
        error={error}
        label={<span className="capitalize">{t("link")}</span>}
        onChange={changeHandler}
      />
      <div className="w-min">
        <Button
          className={"mt-10"}
          disabled={!url}
          onClick={fetchMedia}
          loading={loading}
        >
          {t("download")}
        </Button>
      </div>
    </div>
  );
}

export default GifToMp4;
