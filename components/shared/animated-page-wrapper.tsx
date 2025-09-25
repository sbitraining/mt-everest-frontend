"use client";

import { motion } from "framer-motion";
import {
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  CSSProperties,
} from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5,
};

interface ChildProps {
  style?: CSSProperties & { "--motion-delay"?: string };
  [key: string]: any;
}

export function AnimatedPageWrapper({ children }: { children: ReactNode }) {
  const staggeredChildren = Children.map(children, (child, index) => {
    if (isValidElement<ChildProps>(child)) {
      return cloneElement(child, {
        ...child.props,
        style: {
          ...(child.props.style || {}),
          "--motion-delay": `${index * 0.1}s`,
        } as CSSProperties & { "--motion-delay": string },
      });
    }
    return child;
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {staggeredChildren}
    </motion.div>
  );
}
