import { Stack, Title, UnstyledButton } from "@mantine/core";
import { useContextState } from "./store";

function UnspashRandomImage() {
  const [state, dispatch] = useContextState();
  console.debug(state);
  const setImageSise = (size: string) =>
    dispatch({ type: "SET_UNSPLASH_IMAGE_WIDTH", payload: size });
  return (
    <Stack>
      <Title>Select random image</Title>
      <UnstyledButton onClick={() => setImageSise("1024x800")}>
        1024x800
      </UnstyledButton>
      <UnstyledButton onClick={() => setImageSise("600x800")}>
        600x800
      </UnstyledButton>
      <p>selected {state.unsplashImageW}</p>
    </Stack>
  );
}

export default UnspashRandomImage;
