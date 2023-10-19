import React from "react";
import { animated, useSpring } from "react-spring";

type Props = {
  text: string;
};

const AnimatedText: React.FC<Props> = ({ text }) => {
  const props = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "#ffaaee" },
      { opacity: 0, color: "rgb(14,26,19)" },
    ],
    from: { opacity: 0, color: "red" },
  });

  return (
    <animated.h1 style={props} className="font-nanum-variable">
      {text}
    </animated.h1>
  );
};

export default AnimatedText;
