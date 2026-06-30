import React, { useState, useEffect, useRef } from "react";
import { Zap, ShieldAlert, Award, Compass, RefreshCw, Flame } from "lucide-react";

interface Fish {
  id: string;
  type: "Gold" | "Blue" | "Octo" | "Dragon";
  x: number;
  y: number;
  speed: number;
  direction: number; // 1 = right, -1 = left
  worth: number;
  size: number;
  emoji: string;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface FishingArcadeProps {
  balance: number;
  onUpdateBalance: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

export default function FishingArcade({ balance, onUpdateBalance, onTriggerNotification }: FishingArcadeProps) {
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1); // Cannon size 1x to 5x
  const [isGameOver, setIsGameOver] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Sea fish list
  const spawnFish = (customX?: number): Fish => {
    const types = [
      { type: "Blue" as const, worth: 15, emoji: "🐟", size: 28 },
      { type: "Gold" as const, worth: 30, emoji: "🐠", size: 32 },
      { type: "Octo" as const, worth: 60, emoji: "🐙", size: 40 },
      { type: "Dragon" as const, worth: 250, emoji: "🐉", size: 60 },
    ];
    // Weighted spawns
    const roll = Math.random();
    const chosenType = roll > 0.95 
      ? types[3] 
      : roll > 0.8 
        ? types[2] 
        : roll > 0.4 
          ? types[1] 
          : types[0];

    const dir = Math.random() > 0.5 ? 1 : -1;
    return {
      id: Math.random().toString(),
      type: chosenType.type,
      x: customX !== undefined ? customX : (dir === 1 ? -10 : 105), // relative coordinates in percentage
      y: Math.random() * 60 + 15, // between 15% and 75%
      speed: Math.random() * 1.5 + 0.5,
      direction: dir,
      worth: chosenType.worth,
      size: chosenType.size,
      emoji: chosenType.emoji,
    };
  };

  useEffect(() => {
    // Spawn initial 8 fish
    const initialFishes = Array.from({ length: 7 }, () => spawnFish(Math.random() * 80 + 10));
    setFishes(initialFishes);

    // Active frame render simulation
    const gameLoop = setInterval(() => {
      // 1. Move fish
      setFishes((prevList) => {
        const moved = prevList.map((f) => ({
          ...f,
          x: f.x + f.speed * f.direction * 0.5,
        }));
        // Filter out-of-screen and spawn new ones
        const visible = moved.filter((f) => f.x >= -30 && f.x <= 130);
        while (visible.length < 8) {
          visible.push(spawnFish());
        }
        return visible;
      });

      // 2. Move active bullets
      setBullets((prevBullets) => {
        const movedBullets = prevBullets.map((b) => {
          const rad = (b.angle * Math.PI) / 180;
          return {
            ...b,
            x: b.x + Math.sin(rad) * b.speed,
            y: b.y - Math.cos(rad) * b.speed,
          };
        });
        // Filter out elements hitting wall
        return movedBullets.filter((b) => b.x >= 0 && b.x <= 100 && b.y >= 0 && b.y <= 100);
      });
    }, 45);

    return () => clearInterval(gameLoop);
  }, []);

  // Collision checks
  useEffect(() => {
    if (bullets.length === 0 || fishes.length === 0) return;

    bullets.forEach((b) => {
      fishes.forEach((f) => {
        // Calculate basic relative distances
        const dist = Math.hypot(b.x - f.x, b.y - f.y);
        // Collision threshold based on fish size relative aspect
        if (dist < 6.5) {
          // HIT!
          const winAmount = f.worth * multiplier;
          onUpdateBalance(winAmount);
          setScore((s) => s + winAmount);
          onTriggerNotification(`🐠 Big Catch! Caught ${f.type} fish! (+${winAmount} credits)`, "success");

          // Remove hit fish & bullet
          setFishes((prev) => prev.filter((p) => p.id !== f.id));
          setBullets((prev) => prev.filter((bl) => bl.id !== b.id));
        }
      });
    });
  }, [bullets, fishes]);

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    if (balance < 5 * multiplier) {
      onTriggerNotification("Insufficient Credits! Please choose lower cannon or top up.", "error");
      return;
    }

    const cost = 5 * multiplier;
    onUpdateBalance(-cost);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Calculate angle towards tap from bottom center (x=50, y=95)
    const dx = clickX - 50;
    const dy = 95 - clickY;
    let angle = (Math.atan2(dx, dy) * 180) / Math.PI;

    const newBullet: Bullet = {
      id: Math.random().toString(),
      x: 50,
      y: 90,
      angle,
      speed: 4.5,
    };

    setBullets((prev) => [...prev, newBullet]);
  };

  return (
    <div className="bg-slate-900 border border-slate-805 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl" id="fishing-hunter-block">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-900 text-[10px] font-mono font-bold uppercase rounded tracking-widest">
              i8 PREMIUM FISH SHOOTER
            </span>
            <div className="text-[10px] text-yellow-400 font-bold bg-yellow-950/40 border border-yellow-900/60 px-1.5 py-0.5 rounded flex items-center">
              <Compass className="w-3.5 h-3.5 mr-0.5 animate-spin" /> Auto-aim Locked
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight mt-1 font-display">
            Siam Golden Fishing Hunter
          </h3>
        </div>

        <div className="bg-slate-950 border border-slate-850/80 rounded-xl px-4 py-2 flex items-center justify-between gap-4 w-full sm:w-auto h-12">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold text-slate-400">CREDITS</span>
          <div className="text-sm font-mono font-bold text-cyan-400 flex items-center gap-1">
            <span>$</span>
            <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="bg-cyan-950/20 border border-cyan-800/10 p-3 rounded-xl flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
          <strong>How to Play:</strong> Select Cannon Power (1x to 5x) below, then **Click or Tap inside the Blue Sea Arena** to target and capture the swimming fish! Shots cost Credits but bring huge payout multiplication!
        </p>
      </div>

      {/* The shooting Arena (absolute coordination block) */}
      <div 
        ref={containerRef}
        onClick={handleShoot}
        className="w-full h-80 md:h-110 bg-gradient-to-b from-blue-950 via-slate-950 to-slate-950 border-4 border-slate-800 rounded-2xl relative overflow-hidden cursor-crosshair shadow-inner"
      >
        {/* Ocean Background grid lights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic fish listing */}
        {fishes.map((f) => (
          <div
            key={f.id}
            style={{ 
              left: `${f.x}%`, 
              top: `${f.y}%`, 
              transition: "transform 0.15s ease-out",
              transform: f.direction === -1 ? `translate(-50%, -50%) scaleX(-1)` : `translate(-50%, -50%)`
            }}
            className="absolute select-none pointer-events-none flex flex-col items-center"
          >
            <div className={`filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]`} style={{ fontSize: `${f.size}px` }}>
              {f.emoji}
            </div>
            {f.type === "Dragon" && (
              <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[9px] font-black px-1.5 py-0.2 rounded mt-1">
                MEGA Boss
              </span>
            )}
          </div>
        ))}

        {/* Cannon bullets */}
        {bullets.map((b) => (
          <div
            key={b.id}
            style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
            className="absolute w-3.5 h-3.5 bg-cyan-400 rounded-full border border-white pointer-events-none shadow-[0_0_8px_#38bdf8]"
          />
        ))}

        {/* Cannon Stand (bottom center) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-14 h-14 bg-slate-800 border-2 border-slate-705 rounded-full flex items-center justify-center relative shadow-lg">
            <div className="w-3 h-8 bg-cyan-500 rounded-t-md absolute -top-4 shadow-[0_0_8px_#06b6d4]" />
            <div className="text-[10px] font-mono font-black text-slate-100">
              {multiplier}x
            </div>
          </div>
        </div>

        {/* Score indicator overlays */}
        <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-800/80 p-2 rounded-lg pointer-events-none">
          <p className="text-[9px] font-mono text-slate-500 leading-none">TOTAL SESSION CATCH</p>
          <p className="text-sm font-mono font-bold text-yellow-400 mt-1">+{score} Credits</p>
        </div>
      </div>

      {/* Arena Footer: Cannon Multipliers Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-slate-805 pt-5">
        
        {/* Multiplier Toggles */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-bold font-mono">CANNON MULTIPLIER:</span>
          <div className="grid grid-cols-5 gap-1.5 bg-slate-950 border border-slate-850 p-1 rounded-xl w-full sm:w-auto">
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-lg transition-all ${
                  multiplier === m 
                    ? "bg-cyan-550 border border-cyan-400/40 text-white font-extrabold shadow" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {m}x
              </button>
            ))}
          </div>
        </div>

        {/* Quick summary line */}
        <div className="text-right flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">COST PER SHOT:</span>
          <span className="text-xs font-mono font-bold text-yellow-400">{5 * multiplier} Credits</span>
        </div>
      </div>
    </div>
  );
}
