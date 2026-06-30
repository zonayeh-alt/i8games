import React, { useState, useEffect } from "react";
import { Trophy, Coins, Zap } from "lucide-react";

export default function JackpotTicker() {
  const [jackpots, setJackpots] = useState({
    grand: 45829103.50,
    major: 8219485.20,
    minor: 349182.40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpots((prev) => ({
        grand: prev.grand + Math.random() * 2.85,
        major: prev.major + Math.random() * 0.95,
        minor: prev.minor + Math.random() * 0.25,
      }));
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (val: number) => {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Grand Jackpot */}
      <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-b from-yellow-950/40 to-slate-950 p-4 md:p-5 flex items-center justify-between shadow-[0_0_15px_rgba(234,179,8,0.06)]">
        <div className="absolute -right-8 -bottom-8 opacity-5 text-yellow-500 pointer-events-none">
          <Trophy className="w-32 h-32" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-yellow-400 uppercase">
              MEGA GRAND JACKPOT
            </span>
          </div>
          <div className="text-xl md:text-3xl font-display font-black text-yellow-400 tracking-tight gold-text-glow">
            $<span className="font-mono">{formatCurrency(jackpots.grand)}</span>
          </div>
        </div>
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      {/* Major Jackpot */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-950 p-4 md:p-5 flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.05)]">
        <div className="absolute -right-8 -bottom-8 opacity-5 text-emerald-500 pointer-events-none">
          <Coins className="w-32 h-32" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              MAJOR MYSTERY JACKPOT
            </span>
          </div>
          <div className="text-xl md:text-2xl font-display font-black text-emerald-400 tracking-tight green-text-glow">
            $<span className="font-mono">{formatCurrency(jackpots.major)}</span>
          </div>
        </div>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <Coins className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      {/* Minor Jackpot */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/30 to-slate-950 p-4 md:p-5 flex items-center justify-between">
        <div className="absolute -right-8 -bottom-8 opacity-5 text-blue-500 pointer-events-none">
          <Zap className="w-32 h-32" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
              DAILY RAPID JACKPOT
            </span>
          </div>
          <div className="text-xl md:text-2xl font-display font-black text-blue-400 tracking-tight">
            $<span className="font-mono">{formatCurrency(jackpots.minor)}</span>
          </div>
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Zap className="w-5 h-5 text-blue-500" />
        </div>
      </div>
    </div>
  );
}
