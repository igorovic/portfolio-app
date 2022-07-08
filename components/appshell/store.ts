import { atom, useAtom } from "jotai";

const navbarOpened = atom(false);

export const useNavbarOpened = () => useAtom(navbarOpened);
