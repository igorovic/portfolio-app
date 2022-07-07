import { Stack, Title, Button } from "@mantine/core";
import { useContextState } from "./store";

function UnspashRandomImage() {
  const [_, dispatch] = useContextState();
  const setImage = (width: number, height: number) =>
    dispatch({
      type: "SET_CURRENT_IMAGE",
      payload: {
        url: `https://source.unsplash.com/random/${width}x${height}`,
        meta: { width, height },
      },
    });
  return (
    <Stack>
      <Title order={3}>Select random image</Title>
      <Button variant="subtle" onClick={() => setImage(1024, 800)}>
        1024x800
      </Button>
      <Button variant="subtle" onClick={() => setImage(600, 800)}>
        600x800
      </Button>
      <Button variant="subtle" onClick={() => setImage(300, 300)}>
        300x300
      </Button>
    </Stack>
  );
}

export default UnspashRandomImage;
