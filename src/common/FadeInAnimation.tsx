import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface FadeInAnimationProps {
  icons: ReactNode[];
  isShown: boolean;
}

const iconVariants: Variants = {
  hidden: (custom: number) => ({
    x: 10,
    opacity: 0,
    transition: { delay: custom * 0.2 },
  }),
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
  slideIn: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, type: "spring", stiffness: 80 },
  }),
};

const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
  icons,
  isShown,
}) => {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate={isShown ? "slideIn" : "visible"}
          variants={iconVariants}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FadeInAnimation;
