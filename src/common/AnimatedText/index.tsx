import { motion } from "framer-motion";
import React from "react";

type Props = {
  text: string;
};

const AnimatedText: React.FC<Props> = ({ text }) => {
  const letters = text.split("").map((letter, index) => (
    <motion.div
      key={index}
      initial={{ fontSize: "1rem" }}
      animate={{
        fontSize: ["1rem", "3rem", "1rem"],
      }}
      transition={{
        duration: 2,
        ease: [0.68, -0.55, 0.27, 1.55], // Cubic Bezier for ease in and out
        times: [0, 0.5, 1], // Specifies at what proportion of the duration the keyframes should be
        delay: index * 0.1, // Adding delay for each letter
        repeat: Infinity, // Infinite loop
        repeatType: "loop", // Loop type
      }}
      style={{
        fontVariationSettings: '"wght" 400, "wdth" 100',
      }}
      className="font-nanum-variable inline-block"
    >
      {letter}
    </motion.div>
  ));

  return <>{letters}</>;
};

export default AnimatedText;
