import { atom } from "recoil";

export const historyStackState = atom<boolean>({
  key: "historyStackState",
  default: true,
});
