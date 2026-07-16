"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollFrameSequenceProps {
  frameCount: number;
  basePath: string;
  /** e.g. (i) => `frame-${String(i).padStart(3, "0")}.webp` */
  frameName?: (index: number) => string;
  /** how many viewport-heights of scroll the sequence plays across */
  scrollLength?: number;
  /** renders full-bleed (fills the viewport, cropping the image) instead of a centered contained box */
  fullBleed?: boolean;
  aspectRatio?: number;
  /** content pinned on top of the canvas, e.g. hero headline + CTAs */
  overlay?: React.ReactNode;
  /** [start, end] scroll progress (0-1) over which the overlay fades from visible to hidden */
  overlayFadeRange?: [number, number];
}

const defaultFrameName = (index: number) => `frame-${String(index).padStart(3, "0")}.webp`;

export default function ScrollFrameSequence({
  frameCount,
  basePath,
  frameName = defaultFrameName,
  scrollLength = 3,
  fullBleed = false,
  aspectRatio = 916 / 718,
  overlay,
  overlayFadeRange,
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesReady, setImagesReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    overlayFadeRange ? [overlayFadeRange[0], overlayFadeRange[1]] : [0, 1],
    overlayFadeRange ? [1, 0] : [1, 1]
  );

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = `${basePath}/${frameName(i)}`;
      images.push(img);
    }
    imagesRef.current = images;

    const firstImage = images[0];
    const markReady = () => {
      if (!cancelled) setImagesReady(true);
    };
    if (firstImage.complete) markReady();
    else firstImage.onload = markReady;

    return () => {
      cancelled = true;
    };
  }, [basePath, frameCount, frameName]);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[Math.min(Math.max(index - 1, 0), frameCount - 1)];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // fill-and-crop (cover) fit: the box is filled entirely, overflow is cropped
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = cssWidth / cssHeight;
    let drawWidth, drawHeight, offsetX, offsetY;
    if (imgRatio > boxRatio) {
      drawHeight = cssHeight;
      drawWidth = drawHeight * imgRatio;
      offsetX = (cssWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = cssWidth;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (cssHeight - drawHeight) / 2;
    }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [frameCount]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (imagesReady) draw(Math.round(latest));
  });

  useEffect(() => {
    if (imagesReady) draw(Math.round(frameIndex.get()));
  }, [imagesReady, frameIndex, draw]);

  useEffect(() => {
    const handleResize = () => draw(Math.round(frameIndex.get()));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, draw]);

  return (
    <div ref={containerRef} style={{ height: `${scrollLength * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {fullBleed ? (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: imagesReady ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imagesReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-3xl mx-auto px-6"
            style={{ aspectRatio }}
          >
            <canvas ref={canvasRef} className="h-full w-full" />
          </motion.div>
        )}

        {fullBleed && overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        )}

        {overlay && (
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="relative z-10 flex h-full w-full items-center justify-center px-6"
          >
            {overlay}
          </motion.div>
        )}
      </div>
    </div>
  );
}
