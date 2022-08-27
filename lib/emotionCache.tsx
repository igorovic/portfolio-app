import { createEmotionCache, EmotionCache } from "@mantine/core";
import { last } from "remeda";
let cache: EmotionCache | undefined;

const creatCache = () =>
  createEmotionCache({
    key: "mantine",
    insertionPoint:
      typeof document !== "undefined"
        ? last([
            ...(document
              .querySelector("head")
              ?.querySelectorAll<HTMLElement>(`style`) ??
              document
                .querySelector("head")
                ?.querySelectorAll<HTMLElement>(`link[rel="stylesheet"]`) ??
              []),
          ])
        : undefined,
  });

export const emCache = () => {
  if (!cache) {
    cache = creatCache();
  }
  if (process.env.NODE_ENV !== "production") {
    cache = creatCache();
  }

  return cache;
};
