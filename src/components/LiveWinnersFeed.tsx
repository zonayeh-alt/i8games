import React, { useState, useEffect } from "react";
import { TrendingUp, MessageSquarePlus, DollarSign } from "lucide-react";
import { LiveWin } from "../types";

export default function LiveWinnersFeed() {
  const mockGames = [
    "Gates of Olympus 1000",
    "Sweet Bonanza Xmas",
    "Mahjong Ways 2",
    "Lucky Neko",
    "Classic Baccarat Live",
    "Sic Bo Grand Thai",
    "Vietnamese PokDeng",
    "Mobile Legends: MPL Odds",
    "Sabah Sports Football",
    "Crazy Fishing Hunter",
  ];

  const prefixCountries = ["TH", "VN", "ID", "MY", "PH", "SG"] as const;

  const generateWin = (): LiveWin => {
    const country = prefixCountries[Math.floor(Math.random() * prefixCountries.length)];
    let userSuffix = Math.floor(Math.random() * 900 + 100).toString();
    let prefix = country.toLowerCase();
    
    // Choose specific names for different countries
    if (country === "TH") prefix += "_jack";
    else if (country === "VN") prefix += "_win";
    else if (country === "ID") prefix += "_gacor";
    else if (country === "MY") prefix += "_boss";
    else if (country === "PH") prefix += "_pinoy";
    else prefix += "_vip";

    const gameName = mockGames[Math.floor(Math.random() * mockGames.length)];
    const isBig = Math.random() > 0.85;
    const amount = isBig 
      ? Math.floor(Math.random() * 45000 + 5000) 
      : Math.floor(Math.random() * 450 + 20);

    return {
      id: Math.random().toString(36).substring(3, 9),
      username: `${prefix}***${userSuffix}`,
      gameName,
      amount,
      currency: "USDT",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      country,
    };
  };

  const [wins, setWins] = useState<LiveWin[]>([]);

  useEffect(() => {
    // Initial batch
    const initial = Array.from({ length: 5 }, generateWin);
    setWins(initial);

    const interval = setInterval(() => {
      setWins((prev) => {
        const next = [generateWin(), ...prev];
        if (next.length > 50) {
          next.pop();
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getCountryEmoji = (code: string) => {
    switch (code) {
      case "TH": return "🇹🇭";
      case "VN": return "🇻🇳";
      case "ID": return "🇮🇩";
      case "MY": return "🇲🇾";
      case "PH": return "🇵🇭";
      case "SG": return "🇸🇬";
      default: return "🌐";
    }
  };

  return (
    <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-display">
            Live Top Winners
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-yellow-500 font-mono font-bold bg-yellow-500/5 px-2 py-0.5 border border-yellow-500/10 rounded">
          <TrendingUp className="w-3 h-3" />
          <span>REAL-TIME PAYOUTS</span>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[290px] overflow-y-auto custom-scrollbar pr-1 divide-y divide-slate-900/40">
        {wins.map((win, idx) => (
          <div 
            key={win.id} 
            className={`flex items-center justify-between pt-2.5 first:pt-0 ${
              idx === 0 ? "animate-pulse bg-slate-900/30 p-1.5 rounded-lg border border-slate-800/40" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm" title={win.country}>
                {getCountryEmoji(win.country)}
              </span>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {win.username}
                  </span>
                  <span className="text-[9px] bg-slate-900 text-slate-400 border border-slate-800 px-1 py-0.2 rounded font-mono uppercase">
                    {win.country}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {win.gameName}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-mono font-bold ${
                win.amount >= 5000 
                  ? "text-yellow-400 gold-text-glow font-extrabold" 
                  : "text-emerald-400"
              }`}>
                +{win.amount.toLocaleString()} <span className="text-[9px] text-slate-500">USDT</span>
              </span>
              <div className="text-[9px] text-slate-600 font-mono">{win.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
