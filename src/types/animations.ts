import { Dispatch, SetStateAction } from "react";

interface TypingAnimationTextProps {
  words: string[];
  wordIndex: number;
  setWordIndex: Dispatch<SetStateAction<number>>;
}

export type { TypingAnimationTextProps };
