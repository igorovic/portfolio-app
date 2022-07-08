import { atom, useAtom } from "jotai";
import { ImageWithMeta } from "./types";
import { useAtomDevtools } from "jotai/devtools";
export const imageData = atom<ImageWithMeta | null>(null);
imageData.debugLabel = "imageData";
const imageIsLoading = atom<boolean>(false);
export const useImage = () => useAtom(imageData);
export const useImageIsLoading = () => useAtom(imageIsLoading);

export const useImageDataDevTools = () => useAtomDevtools(imageData);
