"use client";

import React, { useState, useEffect } from "react";
import { TypingAnimationTextProps } from "../types/animations";

const TypingAnimationText = ({
  words,
  wordIndex,
  setWordIndex,
}: TypingAnimationTextProps) => {
  const [visibleText, setVisibleText] = useState("");

  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeTimeout = setTimeout(() => {
      setCharIndex((prevCharIndex) => prevCharIndex + 1);
      setVisibleText(words[wordIndex].slice(0, charIndex + 1));
    }, 70);

    if (charIndex === words[wordIndex].length) {
      clearTimeout(typeTimeout);
      const wordTimeout = setTimeout(() => {
        setWordIndex((prevWordIndex) => (prevWordIndex + 1) % words.length);
        setCharIndex(0);
        setVisibleText("");
      }, 3000);
      return () => clearTimeout(wordTimeout);
    }

    return () => clearTimeout(typeTimeout);
  }, [charIndex, wordIndex, words, setWordIndex]);

  return (
    <div className="prose dark:prose-invert h-32  md:h-auto">
      <h1>
        {visibleText}
        <span className="cursor animate-blink">|</span>
      </h1>
    </div>
  );
};

export default TypingAnimationText;
