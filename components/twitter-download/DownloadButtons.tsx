import { Button } from "@mantine/core";

interface Variant {
  content_type: string;
  url: string;
  filename?: string;
  width?: number;
  height?: number;
}
interface Media {
  preview_image_url: string;
  variants: Variant[];
}
interface DownloadButtonsProps {
  tweet?:
    | {
        includes: {
          media: Media[];
        };
      }
    | null
    | undefined;
}
function DownloadButtons({ tweet }: DownloadButtonsProps) {
  if (!tweet) return null;

  let variants: Variant[] = [];
  tweet.includes.media.forEach((media) => {
    if (media && Array.isArray(media.variants)) {
      variants.push(...media.variants);
    }
  });
  variants = variants.map((V) => {
    const pathname = new URL(V.url).pathname;
    const filename =
      pathname.split("/").at(-1) ?? `video-${new Date().getMilliseconds()}`;
    const R = pathname.match(/.*\/(?<size>[0-9]{1,4}x[0-9]{1,4}).*/);
    let width: number | undefined = undefined;
    let height: number | undefined = undefined;
    if (R && R.groups && R.groups?.size) {
      const [w, h] = R.groups.size.toLowerCase().split("x");
      width = parseInt(w);
      height = parseInt(h);
    }
    return { ...V, filename, width, height };
  });

  const downloadHandler = async (variant: Variant) => {
    fetch(variant.url)
      .then((r) => r.blob())
      .then((b) => {
        const f = new File([b], variant.filename ?? "video");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(f);
        a.download = variant.filename as string;
        document.body.appendChild(a);
        a.click();
      });
  };
  if (variants.length === 0) {
    return (
      <p>
        Something went wrong. We could not find any suitable media file to
        download.
      </p>
    );
  }
  return (
    <div>
      {variants.map((variant, idx) => {
        if (/video\/.*/gm.test(variant.content_type)) {
          return (
            <div className="flex flex-shrink-0 basis-0 py-4">
              <span className="mx-4">{variant.filename}</span>
              <span className="mx-2">
                {variant.width}x{variant.height}
              </span>
              <Button
                key={variant.url}
                onClick={() => {
                  downloadHandler(variant);
                }}
              >
                download
              </Button>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default DownloadButtons;
