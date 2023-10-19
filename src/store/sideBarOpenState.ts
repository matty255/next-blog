// Recoil State
import { atom } from "recoil";

export const sideBarOpenState = atom<{
  isOpen: boolean;
  category: string | null;
}>({
  key: "sideBarOpenState",
  default: {
    isOpen: true,
    category: "folder",
  },
});
