// Recoil State
import { atom } from "recoil";

export const folderOpenState = atom<Record<string, boolean>>({
  key: "folderIsOpenState",
  default: {},
});
