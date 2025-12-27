export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute w-24 h-24 border-4 border-neon/20 border-t-neon rounded-full animate-spin" />
        {/* Inner Ring */}
        <div className="absolute w-16 h-16 border-4 border-neon/20 border-b-neon rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
        {/* Core */}
        <div className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
        
        {/* Text */}
        <div className="absolute top-32 text-neon font-mono text-xs tracking-[0.2em] animate-pulse">
            INITIALIZING...
        </div>
      </div>
    </div>
  );
}
