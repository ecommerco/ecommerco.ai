"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|;:,.<>?";

export const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Initial scramble on mount
    scramble();
    
    // Optional: periodic scramble or on hover? Let's stick to mount + hover for now.
    // Cleanup
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.span
      onMouseEnter={scramble}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};
