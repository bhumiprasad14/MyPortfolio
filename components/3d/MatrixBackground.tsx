'use client';

import React from 'react';

export default function MatrixBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      {/* Subtle modern gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  );
}
