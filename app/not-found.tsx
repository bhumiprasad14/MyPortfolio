import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-100/80 border border-white/10 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            HTTP 404 • Coordinate Void
          </span>
          <h1 className="text-3xl font-extrabold text-white">System Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested resource or project route does not exist in this sector of the grid.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-glow-cyan"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Headquarters</span>
        </Link>
      </div>
    </div>
  );
}
