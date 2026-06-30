import React, { useState } from "react";
import { Circle, User, Shield, HelpCircle, Activity, LayoutGrid } from "lucide-react";

interface BaccaratSimulatorProps {
  balance: number;
  onUpdateBalance: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

interface Card {
  suit: string;
  value: string;
  score: number;
}

type BetType = "PLAYER" | "BANKER" | "TIE" | "PAIR";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = [
  { char: "A", val: 1 },
  { char: "2", val: 2 },
  { char: "3", val: 3 },
  { char: "4", val: 4 },
  { char: "5", val: 5 },
  { char: "6", val: 6 },
  { char: "7", val: 7 },
  { char: "8", val: 8 },
  { char: "9", val: 9 },
  { char: "10", val: 0 },
  { char: "J", val: 0 },
  { char: "Q", val: 0 },
  { char: "K", val: 0 },
];

export default function BaccaratSimulator({ balance, onUpdateBalance, onTriggerNotification }: BaccaratSimulatorProps) {
  const [betAmounts, setBetAmounts] = useState<Record<BetType, number>>({
    PLAYER: 0,
    BANKER: 0,
    TIE: 0,
    PAIR: 0,
  });
  const [selectedChip, setSelectedChip] = useState(10);
  const [history, setHistory] = useState<string[]>(["B", "P", "B", "T", "B", "P", "P", "B"]); // B = Banker, P = Player, T = Tie
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [bankerCards, setBankerCards] = useState<Card[]>([]);
  const [gameOutcome, setGameOutcome] = useState<string | null>(null);

  const drawCard = (): Card => {
    const s = SUITS[Math.floor(Math.random() * SUITS.length)];
    const v = VALUES[Math.floor(Math.random() * VALUES.length)];
    return { suit: s, value: v.char, score: v.val };
  };

  const calculateScore = (cards: Card[]) => {
    const total = cards.reduce((acc, c) => acc + c.score, 0);
    return total % 10;
  };

  const placeBet = (type: BetType) => {
    if (isPlaying) return;
    if (balance < selectedChip) {
      onTriggerNotification("Insufficient wallet balance!", "error");
      return;
    }
    setBetAmounts((prev) => ({ ...prev, [type]: prev[type] + selectedChip }));
    onUpdateBalance(-selectedChip);
  };

  const clearBets = () => {
    if (isPlaying) return;
    const totalBet = (Object.values(betAmounts) as number[]).reduce((a, b) => a + b, 0);
    if (totalBet > 0) {
      onUpdateBalance(totalBet);
      setBetAmounts({ PLAYER: 0, BANKER: 0, TIE: 0, PAIR: 0 });
    }
  };

  const playRound = () => {
    const totalBet = (Object.values(betAmounts) as number[]).reduce((a, b) => a + b, 0);
    if (totalBet === 0) {
      onTriggerNotification("Please place a bet on Player, Banker or Tie first!", "info");
      return;
    }

    setIsPlaying(true);
    setGameOutcome(null);

    // Initial 2 cards for Player & Banker
    const p1 = drawCard();
    const p2 = drawCard();
    const b1 = drawCard();
    const b2 = drawCard();

    const pInit = [p1, p2];
    const bInit = [b1, b2];

    setPlayerCards(pInit);
    setBankerCards(bInit);

    setTimeout(() => {
      let pScore = calculateScore(pInit);
      let bScore = calculateScore(bInit);

      let finalP = [...pInit];
      let finalB = [...bInit];

      // Baccarat standard 3rd card rules
      const isNatural = pScore >= 8 || bScore >= 8;

      if (!isNatural) {
        let pDrew3rd = false;
        let thirdCardVal = -1;

        // Player's rule
        if (pScore <= 5) {
          const p3 = drawCard();
          finalP.push(p3);
          pDrew3rd = true;
          thirdCardVal = p3.score;
          setPlayerCards([...finalP]);
        }

        // Banker's rule
        bScore = calculateScore(finalB);
        if (pDrew3rd) {
          // Banker draws based on player's 3rd card value
          let bankerDraws = false;
          if (bScore <= 2) bankerDraws = true;
          else if (bScore === 3 && thirdCardVal !== 8) bankerDraws = true;
          else if (bScore === 4 && [2, 3, 4, 5, 6, 7].includes(thirdCardVal)) bankerDraws = true;
          else if (bScore === 5 && [4, 5, 6, 7].includes(thirdCardVal)) bankerDraws = true;
          else if (bScore === 6 && [6, 7].includes(thirdCardVal)) bankerDraws = true;

          if (bankerDraws) {
            finalB.push(drawCard());
            setBankerCards([...finalB]);
          }
        } else {
          // Player stood (Player had 6 or 7)
          if (bScore <= 5) {
            finalB.push(drawCard());
            setBankerCards([...finalB]);
          }
        }
      }

      // Finalize outcome
      setTimeout(() => {
        const finalPScore = calculateScore(finalP);
        const finalBScore = calculateScore(finalB);
        
        let outcome = "";
        let winner: BetType | "TIE" = "TIE";
        let payout = 0;

        if (finalPScore > finalBScore) {
          outcome = `Player wins (${finalPScore} vs ${finalBScore})`;
          winner = "PLAYER";
          payout += betAmounts.PLAYER * 2; // Player Pays 1:1
        } else if (finalBScore > finalPScore) {
          outcome = `Banker wins (${finalBScore} vs ${finalPScore})`;
          winner = "BANKER";
          payout += betAmounts.BANKER * 1.95; // Banker Pays 1:0.95
        } else {
          outcome = `Tie Game (${finalPScore} vs ${finalBScore})`;
          winner = "TIE";
          payout += betAmounts.TIE * 9; // Tie Pays 1:8
          payout += betAmounts.PLAYER; // Bets on Player push
          payout += betAmounts.BANKER; // Bets on Banker push
        }

        // Handle Pair bets
        const playerHasPair = finalP[0].value === finalP[1].value;
        const bankerHasPair = finalB[0].value === finalB[1].value;
        if ((playerHasPair || bankerHasPair) && betAmounts.PAIR > 0) {
          payout += betAmounts.PAIR * 12; // Pair Pays 1:11
        }

        // Add history
        setHistory((prev) => [winner === "PLAYER" ? "P" : winner === "BANKER" ? "B" : "T", ...prev.slice(0, 16)]);

        setGameOutcome(outcome);
        onUpdateBalance(payout);
        setIsPlaying(false);
        setBetAmounts({ PLAYER: 0, BANKER: 0, TIE: 0, PAIR: 0 });

        if (payout > 0) {
          onTriggerNotification(`🎉 Win! Payout +${payout.toFixed(1)} USDT`, "success");
        } else {
          onTriggerNotification("Game complete. Try next hand!", "info");
        }
      }, 800);

    }, 800);
  };

  return (
    <div className="bg-slate-900 border border-slate-805 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative" id="baccarat-simulator-module">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900 text-[10px] font-mono font-bold uppercase rounded tracking-widest">
              i8 VIP LIVE AGENT
            </span>
            <div className="text-[10px] text-yellow-400 font-mono font-bold bg-yellow-950 border border-yellow-900/60 px-2 py-0.5 rounded flex items-center">
              <Activity className="w-3 h-3 mr-1" /> No Commission Standard
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight mt-1 font-display">
            Royal Dragon VIP Baccarat
          </h3>
        </div>

        <div className="bg-slate-950 border border-slate-850/80 rounded-xl px-4 py-2 flex items-center justify-between gap-4 w-full sm:w-auto h-12">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">CREDIT WALLET</span>
          <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1">
            <span>$</span>
            <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Playfield: Player vs Banker Hands display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 border border-slate-850 p-6 rounded-2xl relative">
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-900 hidden md:block" />

        {/* Player Side */}
        <div className="flex flex-col items-center justify-between min-h-[160px] space-y-4">
          <div className="flex items-center gap-2 text-blue-400">
            <User className="w-4.5 h-4.5" />
            <span className="text-sm font-bold uppercase tracking-wider font-display">PLAYER HAND</span>
            <span className="text-xs bg-blue-950 border border-blue-900 text-blue-300 font-mono font-bold px-2 py-0.5 rounded-full">
              Score: {playerCards.length > 0 ? calculateScore(playerCards) : 0}
            </span>
          </div>

          <div className="flex gap-2 min-h-[96px] items-center">
            {playerCards.map((card, index) => (
              <div 
                key={index} 
                className="w-14 h-22 bg-white border border-slate-350 text-slate-900 rounded-lg flex flex-col justify-between p-1.5 shadow"
              >
                <div className="text-xs font-bold leading-none font-mono">
                  {card.value}
                </div>
                <div className={`text-2xl text-center font-bold ${
                  ["♥", "♦"].includes(card.suit) ? "text-red-600" : "text-slate-900"
                }`}>
                  {card.suit}
                </div>
                <div className="text-xs font-bold leading-none text-right font-mono self-end">
                  {card.value}
                </div>
              </div>
            ))}
            {playerCards.length === 0 && (
              <div className="text-xs text-slate-600 italic">Waiting...</div>
            )}
          </div>
        </div>

        {/* Banker Side */}
        <div className="flex flex-col items-center justify-between min-h-[160px] space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <Shield className="w-4.5 h-4.5" />
            <span className="text-sm font-bold uppercase tracking-wider font-display">BANKER HAND</span>
            <span className="text-xs bg-red-950 border border-red-900 text-red-300 font-mono font-bold px-2 py-0.5 rounded-full">
              Score: {bankerCards.length > 0 ? calculateScore(bankerCards) : 0}
            </span>
          </div>

          <div className="flex gap-2 min-h-[96px] items-center">
            {bankerCards.map((card, index) => (
              <div 
                key={index} 
                className="w-14 h-22 bg-white border border-slate-350 text-slate-900 rounded-lg flex flex-col justify-between p-1.5 shadow"
              >
                <div className="text-xs font-bold leading-none font-mono">
                  {card.value}
                </div>
                <div className={`text-2xl text-center font-bold ${
                  ["♥", "♦"].includes(card.suit) ? "text-red-900" : "text-slate-900"
                }`}>
                  {card.suit}
                </div>
                <div className="text-xs font-bold leading-none text-right font-mono self-end">
                  {card.value}
                </div>
              </div>
            ))}
            {bankerCards.length === 0 && (
              <div className="text-xs text-slate-600 italic">Waiting...</div>
            )}
          </div>
        </div>

        {/* Big Road Hand Outcome Indicator overlay banner */}
        {gameOutcome && (
          <div className="absolute inset-x-0 bottom-4 mx-auto w-fit bg-yellow-500 text-slate-950 px-5 py-1.5 rounded-full font-bold text-xs uppercase shadow-xl animate-bounce">
            {gameOutcome}
          </div>
        )}
      </div>

      {/* Betting Layout Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Bet On Player */}
        <button 
          onClick={() => placeBet("PLAYER")}
          className="bg-gradient-to-b from-blue-950/20 to-slate-900 border hover:border-blue-500/50 border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[105px] group"
        >
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">PLAYER</span>
          <span className="text-[10px] text-slate-500">PAYS 1:1</span>
          <div className="bg-blue-650/15 border border-blue-500/30 text-blue-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full mt-2 min-h-[24px]">
            {betAmounts.PLAYER > 0 ? `${betAmounts.PLAYER} USDT` : "—"}
          </div>
        </button>

        {/* Bet On Banker */}
        <button 
          onClick={() => placeBet("BANKER")}
          className="bg-gradient-to-b from-red-950/20 to-slate-900 border hover:border-red-500/50 border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[105px] group"
        >
          <span className="text-xs text-red-400 font-bold uppercase tracking-wider">BANKER</span>
          <span className="text-[10px] text-slate-500">PAYS 1:0.95</span>
          <div className="bg-red-650/15 border border-red-500/30 text-red-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full mt-2 min-h-[24px]">
            {betAmounts.BANKER > 0 ? `${betAmounts.BANKER} USDT` : "—"}
          </div>
        </button>

        {/* Bet On Tie */}
        <button 
          onClick={() => placeBet("TIE")}
          className="bg-gradient-to-b from-emerald-950/20 to-slate-900 border hover:border-emerald-500/50 border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[105px] group"
        >
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">TIE</span>
          <span className="text-[10px] text-slate-500">PAYS 1:8</span>
          <div className="bg-emerald-650/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full mt-2 min-h-[24px]">
            {betAmounts.TIE > 0 ? `${betAmounts.TIE} USDT` : "—"}
          </div>
        </button>

        {/* Bet On Pair */}
        <button 
          onClick={() => placeBet("PAIR")}
          className="bg-gradient-to-b from-amber-950/20 to-slate-900 border hover:border-amber-500/50 border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[105px] group"
        >
          <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">ANY PAIR</span>
          <span className="text-[10px] text-slate-500">PAYS 1:11</span>
          <div className="bg-amber-650/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full mt-2 min-h-[24px]">
            {betAmounts.PAIR > 0 ? `${betAmounts.PAIR} USDT` : "—"}
          </div>
        </button>
      </div>

      {/* Control panel: Chips Selector, Reset, Deal */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-slate-805 pt-5">
        
        {/* Chip Selection */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-bold font-mono">CHIP SIZE:</span>
          <div className="flex gap-2">
            {[10, 50, 200, 1000].map((chip) => (
              <button
                key={chip}
                onClick={() => setSelectedChip(chip)}
                className={`w-9 h-9 rounded-full font-mono text-xs font-bold border-2 flex items-center justify-center transition-all ${
                  selectedChip === chip 
                    ? "bg-yellow-500 border-yellow-300 text-slate-950 scale-110 shadow-lg shadow-yellow-500/10 font-extrabold" 
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Reset & Play Buttons */}
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={clearBets}
            disabled={isPlaying}
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer disabled:opacity-50"
          >
            Clear All
          </button>
          <button
            onClick={playRound}
            disabled={isPlaying}
            className={`flex-1 sm:flex-initial px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              isPlaying 
                ? "bg-slate-800 border border-slate-750 text-slate-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-lg shadow-emerald-500/10"
            }`}
          >
            {isPlaying ? "Dealing..." : "Deal Cards"}
          </button>
        </div>
      </div>

      {/* Big Road (Roadmap History log) */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
        <h4 className="text-xs font-bold text-slate-350 flex items-center gap-1.5 mb-3">
          <LayoutGrid className="w-4 h-4 text-indigo-400" />
          <span>DRAGON BIG ROAD TREND CHART (Live Feed)</span>
        </h4>
        <div className="flex gap-2 overflow-x-auto py-1 custom-scrollbar">
          {history.map((h, i) => (
            <div 
              key={i} 
              className={`w-7 h-7 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold ${
                h === "P" 
                  ? "bg-blue-950/80 text-blue-400 border border-blue-900/50" 
                  : h === "B" 
                    ? "bg-red-950/80 text-red-400 border border-red-900/50" 
                    : "bg-emerald-950/80 text-emerald-400 border border-emerald-900/50"
              }`}
            >
              {h}
            </div>
          ))}
          {history.length === 0 && <span className="text-[10px] text-slate-600">No hands recorded yet.</span>}
        </div>
      </div>
    </div>
  );
}
