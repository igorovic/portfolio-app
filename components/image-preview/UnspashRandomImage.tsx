import { Button } from "@mantine/core";
import React from "react";
import { useImage, useImageIsLoading } from "./store";

interface BtnLoadImageProps {
  text: string;
  width: number;
  height: number;
}
const BtnLoadImage = ({ text, width, height }: BtnLoadImageProps) => {
  const [_, setImageState] = useImage();
  const [imageIsLoading, setImageIsLoading] = useImageIsLoading();
  const [loading, setLoading] = React.useState(false);
  const setImage = async (width: number, height: number) => {
    setImageIsLoading(true);
    setLoading(true);
    let url = `https://source.unsplash.com/random/${width}x${height}`;
    const resp = await fetch(url);
    if (resp.redirected) {
      url = resp.url;
    }
    setImageState({
      url,
      meta: { width, height },
    });
  };

  if (!imageIsLoading && loading) {
    setLoading(false);
  }

  return (
    <Button
      variant="subtle"
      disabled={imageIsLoading}
      loading={loading}
      onClick={() => setImage(width, height)}
    >
      {text}
    </Button>
  );
};

function UnslpashRandomImage() {
  return (
    <div>
      <p>Select random image from unsplash.com</p>
      <div className="flex gap-1">
        <BtnLoadImage text="1024x800" width={1024} height={800} />
        <BtnLoadImage text="600x800" width={600} height={800} />
        <BtnLoadImage text="300x300" width={300} height={300} />
      </div>
    </div>
  );
}

export default UnslpashRandomImage;
