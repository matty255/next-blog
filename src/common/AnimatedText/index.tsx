import React, { useEffect } from "react";
import "splitting/dist/splitting-cells.css";
import "splitting/dist/splitting.css";

const Splitting: any = require("splitting");

type Props = {
  text: string;
};

const AnimatedText: React.FC<Props> = ({ text }) => {
  useEffect(() => {
    setTimeout(() => {
      Splitting({ target: "[data-splitting]" });
    }, 0);
  }, []);

  return (
    <h1 className="font-nanum-variable" data-splitting>
      {text}
    </h1>
  );
};

export default AnimatedText;
