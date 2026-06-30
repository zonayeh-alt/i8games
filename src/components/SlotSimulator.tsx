import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Award, HelpCircle, Flame, Star } from "lucide-react";

interface SlotSimulatorProps {
  balance: number;
  onUpdateBalance: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

const SLOT_SYMBOLS = [
  { char: "👑", val: 50, weight: 1, name: "Crown" },
  { char: "💎", val: 25, weight: 2, name: "Diamond" },
  { char: "💰", val: 15, weight: 3, name: "Gold Sack" },
  { char: "🎰", val: 10, weight: 4, name: "Seven" },
  { char: "🔔", val: 8, weight: 5, name: "Bell" },
  { char: "🍒", val: 5, weight: 6, name: "Cherry" },
  { char: "🍇", val: 3, weight: 8, name: "Grape" },
  { char: "🍋", val: 2, weight: 10, name: "Lemon" },
];

export default function SlotSimulator({ balance, onUpdateBalance, onTriggerNotification }: SlotSimulatorProps) {
  const [bet, setBet] = useState(50);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([SLOT_SYMBOLS[0], SLOT_SYMBOLS[1], SLOT_SYMBOLS[2]]);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [winAmount, setWinAmount] = useState<number | null>(null);

  const spin = () => {
    if (balance < bet) {
      onTriggerNotification("Insufficient Credits! Please top up.", "error");
      return;
    }

    setIsSpinning(true);
    setWinMessage(null);
    setWinAmount(null);
    onUpdateBalance(-bet);

    // Roll reels asynchronously with interval tick to simulate high-speed rolling
    let rollsCount = 0;
    const interval = setInterval(() => {
      setReels([
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      ]);
      rollsCount++;
      if (rollsCount > 12) {
        clearInterval(interval);
        finalizeResult();
      }
    }, 100);
  };

  const finalizeResult = () => {
    const finalReels = [
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    ];
    setReels(finalReels);
    setIsSpinning(false);

    // Calculate payouts
    // 3 matching symbols
    if (finalReels[0].char === finalReels[1].char && finalReels[1].char === finalReels[2].char) {
      const multiplier = finalReels[0].val;
      const payout = bet * multiplier;
      onUpdateBalance(payout);
      setWinAmount(payout);
      setWinMessage(`HUGE WIN! Triple ${finalReels[0].name} (${multiplier}x)`);
      onTriggerNotification(`🎰 MEGA WIN! You won +${payout} credits!`, "success");
    } 
    // 2 matching symbols (adjacent or any)
    else if (
      finalReels[0].char === finalReels[1].char || 
      finalReels[1].char === finalReels[2].char || 
      finalReels[0].char === finalReels[2].char
    ) {
      const matchSymbol = finalReels[1].char === finalReels[0].char || finalReels[1].char === finalReels[2].char 
        ? finalReels[1] 
        : finalReels[0];
      const payout = bet * 2;
      onUpdateBalance(payout);
      setWinAmount(payout);
      setWinMessage(`MINI WIN! Double ${matchSymbol.name} (2x)`);
      onTriggerNotification(`🎰 Nice! You won +${payout} credits!`, "success");
    } 
    // Chance of Random wild trigger
    else if (Math.random() > 0.88) {
      const payout = Math.floor(bet * 1.5);
      onUpdateBalance(payout);
      setWinAmount(payout);
      setWinMessage("WILD LUCK BONUS TRIGGERED!");
      onTriggerNotification(`🎰 Wild boost! Won +${payout} credits!`, "success");
    } else {
      setWinMessage("No Match. Spin again to win!");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden" id="slot-simulator-main">
      {/* Absolute glow design */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-950 text-yellow-400 border border-yellow-900 text-[10px] font-mono font-bold uppercase rounded tracking-widest">
              FUTURE GLOBAL MEGA-WAYS
            </span>
            <div className="flex items-center text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/60 px-1.5 py-0.5 rounded">
              <Flame className="w-3.5 h-3.5 text-emerald-400 mr-0.5" />
              <span>98.6% RTP</span>
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Golden Dragons Slot Machine
          </h3>
        </div>

        {/* Current user Balance display */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2 flex items-center justify-between gap-4 w-full sm:w-auto h-12">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">WALLET BALANCE</span>
          <div className="text-sm font-mono font-bold text-yellow-400 flex items-center gap-1.5">
            <span className="text-xs text-slate-500">$</span>
            <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Visual Slot reels box */}
      <div className="bg-slate-950 border-4 border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-5 shadow-inner">
        {/* LED Jackpot row banner */}
        <div className="w-full bg-yellow-950/40 border border-yellow-500/20 rounded-lg py-1 px-4 text-center">
          <p className="text-[10px] font-mono font-bold text-yellow-400 tracking-wider flex items-center justify-center gap-1.5">
            <Star className="w-3 h-3 animate-spin text-yellow-400" />
            <span>CONNECT 3 IDENTICAL SYMBOLS FOR JACKPOT REWARDS!</span>
            <Star className="w-3 h-3 animate-spin text-yellow-400" />
          </p>
        </div>

        {/* The reels container */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-md">
          {reels.map((symbol, idx) => (
            <div 
              key={idx}
              className={`aspect-square md:aspect-video md:h-28 bg-gradient-to-b from-slate-900 to-slate-950 border-2 ${
                isSpinning ? "border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)] animate-bounce" : "border-slate-800"
              } rounded-2xl flex flex-col items-center justify-center p-3 relative transition-all duration-150`}
            >
              {/* Glass glare effect */}
              <div className="absolute top-1 left-2 right-2 h-1/3 bg-white/[0.03] rounded-t-lg blur-[1px] pointer-events-none" />
              <span className={`text-4xl md:text-5xl select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
                isSpinning ? "blur-[1.2px]" : ""
              }`}>
                {symbol.char}
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
                {symbol.name}
              </span>
            </div>
          ))}
        </div>

        {/* Spin Feedback messages */}
        <div className="h-10 text-center flex items-center justify-center">
          {winAmount ? (
            <div className="text-sm font-extrabold text-yellow-400 font-display animate-bounce uppercase tracking-wide flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>{winMessage} (+{winAmount} USDT)</span>
            </div>
          ) : winMessage ? (
            <span className="text-xs text-slate-400 font-medium">{winMessage}</span>
          ) : (
            <span className="text-xs text-slate-600 font-medium">Select your bet amount and spin to start!</span>
          )}
        </div>
      </div>

      {/* Control Panel: Bet Selection & Spin */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 border-t border-slate-800 pt-5">
        
        {/* Bet Selection row */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-bold font-mono">BET AMOUNT:</span>
          <div className="grid grid-cols-4 gap-1.5 bg-slate-950 border border-slate-850 p-1 rounded-xl w-full sm:w-auto">
            {[10, 50, 100, 500].map((b) => (
              <button
                key={b}
                onClick={() => !isSpinning && setBet(b)}
                className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-lg transition-all ${
                  bet === b 
                    ? "bg-slate-800 border border-yellow-500/30 text-yellow-400 font-extrabold shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
                disabled={isSpinning}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Spin Button */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-300 ${
              isSpinning 
                ? "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-yellow-500/10 cursor-pointer hover:translate-y-[-1px] hover:shadow-yellow-500/20"
            }`}
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-slate-500" />
                <span>SPINNING...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>SPIN NOW</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Paytable Quick References */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
        <h4 className="text-xs font-bold text-slate-350 flex items-center gap-1 mb-2.5">
          <HelpCircle className="w-4 h-4 text-yellow-500" />
          <span>PAYTABLE MULTIPLIERS (Triple Match Rewards)</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SLOT_SYMBOLS.slice(0, 4).map((sym, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-slate-900/50 border border-slate-850/40 rounded-lg">
              <span className="text-base">{sym.char} Triple</span>
              <span className="text-xs font-mono font-bold text-yellow-400">{sym.val}x Bet</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
