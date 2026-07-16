"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const translateY = useSpring(0, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    translateY.set(-6);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    translateY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, y: translateY, transformStyle: "preserve-3d" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
