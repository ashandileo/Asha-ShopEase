"use client";

import { motion } from "framer-motion";

interface IAnimatePage {
  children: React.ReactNode;
}

export const AnimatePage = ({ children }: IAnimatePage) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};
