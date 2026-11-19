'use client';

import React, { useEffect, useState } from 'react';

export default function GeminiAmbientGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 50;
    let targetY = 30;
    let currentX = 50;
    let currentY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMousePosition({
        x: Math.round(currentX * 10) / 10,
        y: Math.round(currentY * 10) / 10,
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden -z-20"
      style={{ background: '#030712' }}
    >
      {/* 1. Primary Deep Lavender & Violet Blob (Slow organic float) */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[140px] opacity-35 mix-blend-screen animate-gemini-drift-1"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(196, 181, 253, 0.4), rgba(167, 139, 250, 0.28) 40%, rgba(124, 58, 237, 0.14) 70%, transparent 90%)',
          top: '5%',
          left: '18%',
        }}
      />

      {/* 2. Deep Royal Purple & Muted Amethyst Blob (Counter-rotating drift) */}
      <div
        className="absolute w-[740px] h-[740px] rounded-full blur-[150px] opacity-35 mix-blend-screen animate-gemini-drift-2"
        style={{
          background:
            'radial-gradient(circle at 60% 50%, rgba(147, 51, 234, 0.35), rgba(139, 92, 246, 0.25) 45%, rgba(76, 29, 149, 0.14) 75%, transparent 95%)',
          top: '30%',
          right: '12%',
        }}
      />

      {/* 3. Soft Luminous Lavender & Pearlescent Specular Highlight */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full blur-[130px] opacity-25 mix-blend-screen animate-gemini-drift-3"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(245, 243, 255, 0.3) 0%, rgba(221, 214, 254, 0.26) 35%, rgba(167, 139, 250, 0.15) 65%, transparent 85%)',
          bottom: '15%',
          left: '30%',
        }}
      />

      {/* 4. Mouse-reactive subtle Lavender spotlight halo */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full blur-[110px] opacity-25 mix-blend-screen transition-transform duration-300 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(196, 181, 253, 0.32) 0%, rgba(167, 139, 250, 0.18) 40%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 5. Delicate Micro-Dot Matrix Layer */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(196, 181, 253, 0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* 6. Soft Perimeter Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #030712 100%)',
        }}
      />
    </div>
  );
}
