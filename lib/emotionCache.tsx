import { createEmotionCache } from "@mantine/core";

const head = globalThis?.document?.querySelector("head");

// <meta name="emotion-insertion-point" content="">
const emotionInsertionPoint = globalThis?.document?.createElement("meta");
emotionInsertionPoint?.setAttribute("name", "emotion-insertion-point");
emotionInsertionPoint?.setAttribute("content", "");

head?.appendChild(emotionInsertionPoint);
export const emCache = createEmotionCache({
  key: "mantine",
  prepend: false,
  //@ts-ignore
  insertionPoint: globalThis.document?.querySelector(
    'meta[name="emotion-insertion-point"]'
  ),
});
