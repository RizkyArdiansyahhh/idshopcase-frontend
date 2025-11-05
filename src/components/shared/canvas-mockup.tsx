"use client";

import { useRef, useEffect } from "react";

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasPreviewProps {
  mockupUrl: string;
  imageUrl?: string; // gambar user
  canvasWidth: number;
  canvasHeight: number;
  areas?: Area[]; // array area custom
}

export default function CanvasPreview({
  mockupUrl,
  imageUrl,
  canvasWidth,
  canvasHeight,
  areas = [],
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const mockupImg = new Image();
    mockupImg.src = mockupUrl;
    mockupImg.onload = () => {
      ctx.drawImage(mockupImg, 0, 0, canvasWidth, canvasHeight);

      if (!imageUrl || areas.length === 0) return;

      const userImg = new Image();
      userImg.src = imageUrl;
      userImg.onload = () => {
        areas.forEach((area) => {
          const ratio = Math.min(
            area.width / userImg.width,
            area.height / userImg.height
          );
          const w = userImg.width * ratio;
          const h = userImg.height * ratio;
          const posX = area.x + (area.width - w) / 2;
          const posY = area.y + (area.height - h) / 2;
          ctx.drawImage(userImg, posX, posY, w, h);
        });
      };
    };
  }, [mockupUrl, imageUrl, canvasWidth, canvasHeight, areas]);

  return <canvas ref={canvasRef} className="border border-gray-300" />;
}
