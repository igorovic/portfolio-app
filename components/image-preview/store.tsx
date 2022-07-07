import { atom, useAtom } from "jotai";
import { ParsedImage } from "./types";

const imageData = atom<ParsedImage | null>(null);
const imageIsLoading = atom<boolean>(false);
export const useImage = () => useAtom(imageData);
export const useImageIsLoading = () => useAtom(imageIsLoading);
