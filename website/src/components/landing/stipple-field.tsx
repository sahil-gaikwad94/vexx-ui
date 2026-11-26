'use client';

import { useEffect, useRef } from 'react';

type Dot = { x: number; y: number; vx: number; vy: number; r: number; hue: number };

/**
 * A quiet particle field that lives over the stippled interlock artwork.
 * Dots drift slowly and are pushed aside by the pointer — the negative space
 * becomes the set of tokens the decoder refuses.
 */
export function StippleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, active: false };
    const dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const COLORS = ['rgba(244,248,255,0.85)', 'rgba(189,185,255,0.7)', 'rgba(210,244,91,0.6)'];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(230, Math.max(70, Math.round((width * height) / 4200)));
      dots.length = 0;
      for (let i = 0; i < count; i += 1) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.25 + 0.45,
          hue: Math.random() < 0.14 ? 1 : Math.random() < 0.06 ? 2 : 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        if (!reduce) {
          if (pointer.active) {
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110 && dist > 0) {
              const force = (1 - dist / 110) * 1.4;
              dot.vx += (dx / dist) * force * 0.1;
              dot.vy += (dy / dist) * force * 0.1;
            }
          }
          dot.vx *= 0.985;
          dot.vy *= 0.985;
          dot.x += dot.vx;
          dot.y += dot.vy;
          if (dot.x < -8) dot.x = width + 8;
          if (dot.x > width + 8) dot.x = -8;
          if (dot.y < -8) dot.y = height + 8;
          if (dot.y > height + 8) dot.y = -8;
        }
        ctx.beginPath();
        ctx.fillStyle = COLORS[dot.hue];
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) frame = window.requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    observer.observe(canvas);
    resize();
    draw();
    const surface = canvas.parentElement ?? canvas;
    surface.addEventListener('pointermove', onMove);
    surface.addEventListener('pointerleave', onLeave);

    return () => {
      observer.disconnect();
      surface.removeEventListener('pointermove', onMove);
      surface.removeEventListener('pointerleave', onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-60 mix-blend-screen" />;
}
