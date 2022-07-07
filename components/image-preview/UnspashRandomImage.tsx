import { Stack, Title, Button } from "@mantine/core";
import { useImage, useImageIsLoading } from "./store";

interface BtnLoadImageProps {
  text: string;
  width: number;
  height: number;
}
const BtnLoadImage = ({ text, width, height }: BtnLoadImageProps) => {
  const [_, setImageState] = useImage();
  const [imageIsLoading, setImageIsLoading] = useImageIsLoading();
  const setImage = (width: number, height: number) => {
    setImageIsLoading(true);
    setImageState({
      url: `https://source.unsplash.com/random/${width}x${height}`,
      //@ts-ignore
      meta: { width, height },
    });
  };
  return (
    <Button
      variant="subtle"
      disabled={imageIsLoading}
      loading={imageIsLoading}
      onClick={() => setImage(width, height)}
    >
      {text}
    </Button>
  );
};

function UnspashRandomImage() {
  return (
    <Stack>
      <Title order={3}>Select random image</Title>
      <BtnLoadImage text="1024x800" width={1024} height={800} />
      <BtnLoadImage text="600x800" width={600} height={800} />
      <BtnLoadImage text="300x300" width={300} height={300} />
    </Stack>
  );
}

export default UnspashRandomImage;
