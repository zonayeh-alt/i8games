import React, { useState, useEffect } from "react";
import { CircleDollarSign, Calendar, TrendingUp, Trophy, ArrowRight, Smartphone } from "lucide-react";
import { EsportsMatch } from "../types";

interface EsportsbookProps {
  balance: number;
  onUpdateBalance: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

export default function Esportsbook({ balance, onUpdateBalance, onTriggerNotification }: EsportsbookProps) {
  const [matches, setMatches] = useState<EsportsMatch[]>([
    {
      id: "m1",
      game: "Mobile Legends: Bang Bang",
      teamA: "EVOS Legends",
      teamB: "Rex Regum Qeon (RRQ)",
      oddsA: 1.85,
      oddsB: 1.98,
      startTime: "LIVE-Q3",
      status: "LIVE",
      category: "Esports",
      tournament: "MPL Indonesia Season 17",
      score: "1 - 1",
    },
    {
      id: "m2",
      game: "Dota 2",
      teamA: "Talon Esports",
      teamB: "BOOM Esports",
      oddsA: 1.55,
      oddsB: 2.35,
      startTime: "Starts in 25m",
      status: "UPCOMING",
      category: "Esports",
      tournament: "SEA Elite Cup",
    },
    {
      id: "m3",
      game: "Football",
      teamA: "Buriram United",
      teamB: "Muangthong United",
      oddsA: 1.62,
      oddsB: 4.10,
      oddsTie: 3.45,
      startTime: "LIVE-Min 74",
      status: "LIVE",
      category: "Sports",
      tournament: "Thai League 1",
      score: "2 - 1",
    },
    {
      id: "m4",
      game: "Football",
      teamA: "Hanoi FC",
      teamB: "Viettel FC",
      oddsA: 2.15,
      oddsB: 2.85,
      oddsTie: 3.10,
      startTime: "Starts in 2h 15m",
      status: "UPCOMING",
      category: "Sports",
      tournament: "V.League 1",
    },
  ]);

  const [selectedBet, setSelectedBet] = useState<{
    matchId: string;
    team: string;
    odds: number;
    teamIndex: "A" | "B" | "TIE";
  } | null>(null);

  const [stakeInput, setStakeInput] = useState<number>(200);

  // Fluctuate raw odds live for high authenticity
  useEffect(() => {
    const timer = setInterval(() => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.status === "LIVE" && Math.random() > 0.6) {
            const deltaA = (Math.random() * 0.1 - 0.05);
            const deltaB = -deltaA;
            return {
              ...m,
              oddsA: Math.max(1.10, parseFloat((m.oddsA + deltaA).toFixed(2))),
              oddsB: Math.max(1.10, parseFloat((m.oddsB + deltaB).toFixed(2))),
            };
          }
          return m;
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const selectBetLine = (matchId: string, team: string, odds: number, teamIndex: "A" | "B" | "TIE") => {
    setSelectedBet({ matchId, team, odds, teamIndex });
  };

  const currentMatch = matches.find((m) => m.id === selectedBet?.matchId);

  const handlePlaceBet = () => {
    if (!selectedBet || !currentMatch) return;
    if (balance < stakeInput) {
      onTriggerNotification("Insufficient Credits in Wallet for Bet!", "error");
      return;
    }

    onUpdateBalance(-stakeInput);
    onTriggerNotification(
      `🏆 Bet placed successfully on ${selectedBet.team} @ ${selectedBet.odds.toFixed(2)}x (Stake: ${stakeInput} USDT)`,
      "success"
    );
    setSelectedBet(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="esportsbook-container">
      {/* Odds Listing */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-base font-extrabold text-white tracking-tight font-display uppercase">
              Sabah-Sports & Esportsbook
            </h4>
            <p className="text-[11px] text-slate-500">
              Live odds updating in real-time. Choose your regional favorite to start.
            </p>
          </div>
          <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-lg">
            <span className="px-2.5 py-1 text-[10px] font-bold text-yellow-400 bg-slate-900 border border-yellow-500/10 rounded">
              SEA PREMIER ODDS
            </span>
          </div>
        </div>

        {/* Live / Upcoming Cards Grid */}
        <div className="space-y-3.5">
          {matches.map((m) => (
            <div 
              key={m.id} 
              className="bg-slate-900 border border-slate-850/80 hover:border-slate-800 rounded-2xl p-5 space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                    m.status === "LIVE" 
                      ? "bg-red-950/40 text-red-400 border-red-900/60 animate-pulse" 
                      : "bg-slate-950 text-slate-400 border-slate-800"
                  }`}>
                    {m.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">
                    {m.tournament}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 leading-none">{m.game}</div>
              </div>

              {/* Match Teams & Real-time scores */}
              <div className="flex items-center justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="text-sm font-extrabold text-slate-100 flex items-center justify-between pr-4">
                    <span>{m.teamA}</span>
                    {m.score && <span className="text-xs font-mono font-bold text-yellow-400">{m.score.split("-")[0]}</span>}
                  </div>
                  <div className="text-sm font-extrabold text-slate-100 flex items-center justify-between pr-4">
                    <span>{m.teamB}</span>
                    {m.score && <span className="text-xs font-mono font-bold text-yellow-400">{m.score.split("-")[1]}</span>}
                  </div>
                </div>

                {/* Match Time indicator */}
                <div className="text-right border-l border-slate-850 pl-5 min-w-[70px]">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                    {m.startTime}
                  </span>
                </div>
              </div>

              {/* Fractional Bets Odds Layout selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1.5">
                {/* Team A Line */}
                <button
                  onClick={() => selectBetLine(m.id, m.teamA, m.oddsA, "A")}
                  className={`border rounded-xl p-3 flex justify-between items-center transition-all ${
                    selectedBet?.matchId === m.id && selectedBet.teamIndex === "A"
                      ? "bg-yellow-500 text-slate-950 border-yellow-300 font-bold scale-[1.01]"
                      : "bg-slate-950 border-slate-850 text-slate-350 hover:bg-slate-850"
                  }`}
                >
                  <span className="text-[10.5px] truncate max-w-[100px]">1 / {m.teamA}</span>
                  <span className="text-xs font-mono font-bold">{m.oddsA.toFixed(2)}</span>
                </button>

                {/* Team B Line */}
                <button
                  onClick={() => selectBetLine(m.id, m.teamB, m.oddsB, "B")}
                  className={`border rounded-xl p-3 flex justify-between items-center transition-all ${
                    selectedBet?.matchId === m.id && selectedBet.teamIndex === "B"
                      ? "bg-yellow-500 text-slate-950 border-yellow-300 font-bold scale-[1.01]"
                      : "bg-slate-950 border-slate-850 text-slate-350 hover:bg-slate-850"
                  }`}
                >
                  <span className="text-[10.5px] truncate max-w-[100px]">2 / {m.teamB}</span>
                  <span className="text-xs font-mono font-bold">{m.oddsB.toFixed(2)}</span>
                </button>

                {/* Draw line if applicable */}
                {m.oddsTie ? (
                  <button
                    onClick={() => selectBetLine(m.id, "Draw game", m.oddsTie!, "TIE")}
                    className={`col-span-2 sm:col-span-1 border rounded-xl p-3 flex justify-between items-center transition-all ${
                      selectedBet?.matchId === m.id && selectedBet.teamIndex === "TIE"
                        ? "bg-yellow-500 text-slate-950 border-yellow-300 font-bold scale-[1.01]"
                        : "bg-slate-950 border-slate-850 text-slate-350 hover:bg-slate-850"
                    }`}
                  >
                    <span className="text-[10.5px]">X / DRAW</span>
                    <span className="text-xs font-mono font-bold">{m.oddsTie.toFixed(2)}</span>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bet Slip Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 flex flex-col justify-between h-fit space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-slate-805 pb-3">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">
              betting slip manager
            </h4>
          </div>

          {selectedBet && currentMatch ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                <span className="text-[9px] bg-indigo-950 text-indigo-400 font-mono font-bold px-1.5 py-0.2 rounded">
                  {currentMatch.game}
                </span>
                <div className="text-xs font-bold text-white">
                  {selectedBet.team}
                </div>
                <div className="text-[10.5px] text-slate-400">
                  Market Match: {currentMatch.teamA} vs {currentMatch.teamB}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-900 mt-1">
                  <span className="text-[10.5px] text-slate-500">Selected Odds</span>
                  <span className="text-sm font-mono font-bold text-yellow-400">
                    {selectedBet.odds.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Stake input */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">STAKE CASH (USDT)</span>
                  <span className="text-slate-400">Wallet Balance: ${balance.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={stakeInput}
                    onChange={(e) => setStakeInput(Math.max(1, parseInt(e.target.value) || 0))}
                    className="col-span-2 w-full bg-slate-950 border border-slate-850 text-emerald-400 font-mono font-bold text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                  {[50, 200, 500, 2000].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setStakeInput(quick)}
                      className="px-2 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850/60 rounded text-[10px] font-mono text-slate-400 hover:text-white"
                    >
                      +{quick}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Payout */}
              <div className="p-3 bg-emerald-950/15 border border-emerald-900/40 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-500 leading-none">Potential Payout</div>
                  <div className="text-sm font-mono font-black text-emerald-400 mt-1">
                    ${(stakeInput * selectedBet.odds).toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-500">Net Profit</div>
                  <div className="text-xs font-mono font-bold text-slate-350">
                    $+{(stakeInput * selectedBet.odds - stakeInput).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Play order button */}
              <button
                onClick={handlePlaceBet}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest duration-150 transition-all cursor-pointer hover:shadow-lg hover:translate-y-[-1px]"
              >
                PLACE COMPLETED BET
              </button>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-slate-950 border border-slate-850 rounded-full flex items-center justify-center mx-auto text-slate-600">
                <CircleDollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                Choose a matching sportsbook / esports outcome line on the left list to establish a custom bet slip.
              </p>
            </div>
          )}
        </div>

        {/* Brand guarantee banner */}
        <div className="pt-3 border-t border-slate-850 text-[10px] text-slate-500 leading-relaxed font-mono flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Supports mobile placing. Authorized by SABAH Gaming Commission.</span>
        </div>
      </div>
    </div>
  );
}
