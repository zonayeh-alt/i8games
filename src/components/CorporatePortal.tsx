import React, { useState } from "react";
import { 
  Gamepad2, 
  Dices, 
  Sparkles, 
  Trophy, 
  Tv2, 
  ShieldCheck, 
  Coins, 
  Gem, 
  TrendingUp, 
  ArrowRight,
  Download,
  CheckCircle,
  Clock,
  ExternalLink,
  Flame,
  Award
} from "lucide-react";

import JackpotTicker from "./JackpotTicker";
import LiveWinnersFeed from "./LiveWinnersFeed";
import SlotSimulator from "./SlotSimulator";
import BaccaratSimulator from "./BaccaratSimulator";
import Esportsbook from "./Esportsbook";
import FishingArcade from "./FishingArcade";
import PaymentGateways from "./PaymentGateways";
import VipPortal from "./VipPortal";
import FutureGlobalDashboard from "./FutureGlobalDashboard";
import AiCheerleaderDesk from "./AiCheerleaderDesk";

interface CorporatePortalProps {
  onTriggerContact?: () => void;
}

export default function CorporatePortal({ onTriggerContact }: CorporatePortalProps) {
  // Shared global simulated game balance
  const [balance, setBalance] = useState(15000.00);
  const [currentTab, setCurrentTab] = useState<"LOBBY" | "BACCARAT" | "SLOTS" | "SPORTS" | "FISHING" | "AI_CHEER" | "INFRA" | "PAYMENTS" | "VIP" | "PROMOS">("LOBBY");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const triggerNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const updateBalance = (amount: number) => {
    setBalance((prev) => parseFloat((prev + amount).toFixed(2)));
  };

  const handleTriggerContact = () => {
    if (onTriggerContact) onTriggerContact();
  };

  const mockPromos = [
    {
      id: "p1",
      badge: "SLOT REBATE",
      title: "1.2% Daily Unlimited Cashback",
      description: "Automatic calculation sent to your wallet every morning with zero wager requirement. The highest rebate rate in Southeast Asia.",
      actionLabel: "Claim Daily Bonus",
    },
    {
      id: "p2",
      badge: "WELCOME OFFER",
      title: "100% First Deposit Match Up to $10,000",
      description: "Applies to all local currency bank channels. Spin Slots, Live Roulette, Baccarat or Sabah Sportsbook with double credits.",
      actionLabel: "Join & Top Up",
    },
    {
      id: "p3",
      badge: "CRYPTO SUPERCHARGE",
      title: "Unlimited 5% USDT Reload Bonus",
      description: "Deposit via secure digital currencies to instantly receive an extra 5% credits with optimized high-speed blockchain network verification.",
      actionLabel: "Get Crypto Address",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="gaming-portal-panel">
      
      {/* Toast Prompt Notification Bar overlay */}
      {notification && (
        <div className={`fixed top-24 right-6 z-55 max-w-sm p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
          notification.type === "success" 
            ? "bg-emerald-950 border-emerald-500 text-emerald-300"
            : notification.type === "error"
              ? "bg-red-950 border-red-500 text-red-300"
              : "bg-slate-900 border-indigo-500 text-slate-300"
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-current animate-ping" />
            <p className="text-xs font-mono font-bold">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-yellow-500/10 bg-slate-950 p-8 md:p-12 shadow-2xl flex flex-col xl:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/[0.02] rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-85 h-85 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
        
        {/* Left column hero statement */}
        <div className="space-y-5 xl:max-w-3xl relative z-10 text-left">
          <div className="text-xs font-mono text-yellow-500 tracking-widest flex items-center gap-2 font-bold">
            <span className="w-6 h-[1px] bg-yellow-500" />
            <span>SOUTHEAST ASIA PREMIER ENTERTAINMENT HUB</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.1] font-display uppercase">
            Experience next-gen <br />
            online gaming with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-400 to-emerald-400 gold-text-glow">i8s.games</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl font-sans">
            <strong>i8s.games</strong> delivers the ultimate luxury online entertainment platform specialized for Southeast Asian players. Play high-performance Slot games, live dealer Baccarat, localized sports/esports betting slips, and experience secure prompt checkout transactions.
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <button
              onClick={() => setCurrentTab("PAYMENTS")}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-xl font-black font-sans text-xs flex items-center justify-center gap-2 duration-200 shadow-lg shadow-yellow-500/10 transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <Coins className="w-4 h-4 text-slate-950" /> Instant top up credits
            </button>
            <button
              onClick={handleTriggerContact}
              className="px-5 py-3 bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-bold font-sans text-xs flex items-center gap-1.5 duration-150 transition-colors cursor-pointer"
            >
              Join VIP Club &rarr;
            </button>
          </div>
        </div>

        {/* Right column quick credentials boxes */}
        <div className="grid grid-cols-2 gap-4 w-full xl:w-[420px] relative z-10 shrink-0">
          <div className="bg-slate-900/90 border border-slate-805 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-slate-750 transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">REGIONAL FOCUS</span>
            <div className="text-sm font-extrabold text-white">TH • VN • ID • MY • PH</div>
            <span className="text-[9.5px] text-emerald-400 font-mono font-bold bg-emerald-950/80 border border-emerald-900/50 px-2 py-0.5 rounded w-fit capitalize">
              Live Dealer Rooms
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-805 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-slate-750 transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">STABILITY CORE</span>
            <div className="text-sm font-extrabold text-white">LOW-LATENCY EDGE</div>
            <span className="text-[9px] bg-yellow-950/80 text-yellow-400 font-mono font-bold px-2 py-0.5 rounded border border-yellow-900/50">
              Verified 2026
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-805 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-slate-750 transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">COMPLIANCE HUB</span>
            <div className="text-sm font-extrabold text-white">SABAH AMUSEMENT</div>
            <div className="text-[10px] text-slate-400 font-mono leading-none">Registered License</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-slate-800 transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">CASH FLOW</span>
            <div className="text-sm font-extrabold text-white">SECURE ESCROW</div>
            <div className="space-y-1">
              <span className="text-[9px] bg-blue-950/80 text-blue-400 font-mono font-bold px-2 py-0.5 rounded border border-blue-900/50">
                SSL Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Live Jackpot Tickers */}
      <JackpotTicker />

      {/* Tab Navigation System */}
      <div className="space-y-6">
        <div className="border-b border-slate-900 flex overflow-x-auto pb-0.5 gap-2 custom-scrollbar">
          {(["LOBBY", "SLOTS", "BACCARAT", "SPORTS", "FISHING", "AI_CHEER", "INFRA", "PAYMENTS", "VIP", "PROMOS"] as const).map((tab) => {
            const isActive = currentTab === tab;
            let iconText = "Lobby";
            if (tab === "SLOTS") iconText = "🎰 Slots Gacor";
            else if (tab === "BACCARAT") iconText = "🃏 Live Baccarat";
            else if (tab === "SPORTS") iconText = "🏆 Sabah Sports & Esports";
            else if (tab === "FISHING") iconText = "🐠 Fishing Hunter";
            else if (tab === "AI_CHEER") iconText = "🎙️ AI Cheerleader Live";
            else if (tab === "INFRA") iconText = "💻 Future Global B2B Infra";
            else if (tab === "PAYMENTS") iconText = "💳 Cashier Gateways";
            else if (tab === "VIP") iconText = "👑 VIP Elite Club";
            else if (tab === "PROMOS") iconText = "🎁 Hot Bonuses";
            else iconText = "🎮 Main Lobby";

            return (
              <button
                key={tab}
                onClick={() => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`py-3 px-4.5 font-display text-xs font-black uppercase tracking-widest border-b-2 flex-shrink-0 transition-all relative ${
                  isActive 
                    ? "border-yellow-500 text-yellow-500 bg-yellow-500/5" 
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {iconText}
                {tab === "SLOTS" && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-mono font-bold px-1 py-0.2 rounded-full animate-pulse">
                    HOT
                  </span>
                )}
                {tab === "AI_CHEER" && (
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-[8px] font-mono font-bold px-1 py-0.2 rounded-full animate-pulse uppercase">
                    GenAI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display of chosen Tabs */}
        <div className="min-h-[400px]">
          {/* LOBBY TAB */}
          {currentTab === "LOBBY" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Left Column games listing cards and promotions shortcuts */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <h3 className="text-base font-black text-white uppercase tracking-wider font-display">
                    Regional Core Interactive Game Modules
                  </h3>
                  <span className="text-xs text-slate-400 font-mono font-bold">Select categories below to experience playable demos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Slot box card */}
                  <div 
                    onClick={() => setCurrentTab("SLOTS")}
                    className="bg-slate-900 border border-slate-805 hover:border-yellow-500/20 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest bg-yellow-950 px-2 py-0.5 rounded border border-yellow-905">
                          98.6% High RTP
                        </span>
                        <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.2 rounded uppercase font-mono font-bold">SLOTS</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">Golden Dragons Slot Machine</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Spin to trigger triple crowns, gold sacks and cascading lines with rich simulated payouts!
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-850/60">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-yellow-500 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Baccarat box card */}
                  <div 
                    onClick={() => setCurrentTab("BACCARAT")}
                    className="bg-slate-900 border border-slate-850 hover:border-blue-500/20 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                          Live Agent
                        </span>
                        <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.2 rounded uppercase font-mono font-bold">CASINO</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">Royal Dragon VIP Baccarat</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Bet on Player, Banker or Tie. Features realistic 3rd card draw rules, standard Commission logic, and live dragon big road trend indicators!
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-850/60">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-blue-400 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Sports card */}
                  <div 
                    onClick={() => setCurrentTab("SPORTS")}
                    className="bg-slate-900 border border-slate-850 hover:border-red-500/20 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest bg-red-950 px-2 py-0.5 rounded border border-red-900">
                          SABAH Live Odds
                        </span>
                        <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.2 rounded uppercase font-mono font-bold">SPORTS</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">Sabah-Sports & Esportsbook</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Bet on Indonesian MPL Mobile Legends, Thai League football, and Dota 2 ongoing major regional qualifiers.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-850/60">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-red-400 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Fishing card */}
                  <div 
                    onClick={() => setCurrentTab("FISHING")}
                    className="bg-slate-900 border border-slate-850 hover:border-cyan-500/20 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900">
                          Arcade Shooter
                        </span>
                        <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.2 rounded uppercase font-mono font-bold">FISHING</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">Siam Golden Fishing Hunter</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Control 1x-5x multipliers cannon. Tap to capture gold, octopus or elite dragons in high-performance water dynamics.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-850/60 flex-row">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-cyan-400 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1 animate-pulse">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Regional Mobile App Advertising banner */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-805 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-yellow-500" /> DOWNLOAD DETAILED MOBILE PLATFORM APP
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal max-w-xl">
                      Experience smooth gameplay, exclusive lock-on multi-agent servers, and ultra low-latency secure Prompt QR payment systems straight from your Android or iOS.
                    </p>
                  </div>
                  <button 
                    onClick={handleTriggerContact}
                    className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase duration-150 shrink-0 cursor-pointer"
                  >
                    Download APK
                  </button>
                </div>
              </div>

              {/* Right Column: Live Winners log Feed + Quick Gateway panel */}
              <div className="space-y-6">
                <LiveWinnersFeed />

                {/* Small static advertisement panel */}
                <div className="p-5 bg-slate-900 border border-slate-850 rounded-2xl space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-display border-b border-indigo-950/40 pb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Secure Regional Regulatory Approval
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    i8s.games is certified under dynamic eGaming registration frameworks issued by regional gaming authorities. Fair play RNG matrices verified by independently certified test labs.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-550 font-mono uppercase">System Node Status: ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATED GAMES TABS */}
          {currentTab === "SLOTS" && (
            <div className="animate-fade-in">
              <SlotSimulator 
                balance={balance} 
                onUpdateBalance={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "BACCARAT" && (
            <div className="animate-fade-in">
              <BaccaratSimulator 
                balance={balance} 
                onUpdateBalance={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "SPORTS" && (
            <div className="animate-fade-in">
              <Esportsbook 
                balance={balance} 
                onUpdateBalance={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "FISHING" && (
            <div className="animate-fade-in">
              <FishingArcade 
                balance={balance} 
                onUpdateBalance={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "PAYMENTS" && (
            <div className="animate-fade-in">
              <PaymentGateways 
                onAddCredits={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "VIP" && (
            <div className="animate-fade-in">
              <VipPortal 
                balance={balance} 
                onUpdateBalance={updateBalance} 
                onTriggerNotification={triggerNotification} 
              />
            </div>
          )}

          {currentTab === "AI_CHEER" && (
            <div className="animate-fade-in">
              <AiCheerleaderDesk />
            </div>
          )}

          {currentTab === "INFRA" && (
            <div className="animate-fade-in">
              <FutureGlobalDashboard />
            </div>
          )}

          {currentTab === "PROMOS" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {mockPromos.map((promo) => (
                <div 
                  key={promo.id} 
                  className="bg-slate-900 border border-slate-805 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-yellow-550/20 transition-all shadow-xl"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] bg-yellow-950 text-yellow-400 font-mono font-bold px-2 py-0.5 rounded border border-yellow-905 uppercase tracking-wider block w-fit">
                      {promo.badge}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-100 tracking-tight leading-snug">
                      {promo.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab("PAYMENTS")}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-yellow-500/20 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {promo.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trust & Guarantee Section */}
      <div className="bg-slate-900/40 border border-slate-805 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-yellow-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
            Compliance & Security Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-850/60">
            <span className="text-[9px] text-yellow-500 font-mono font-bold uppercase tracking-widest block mb-1">AUDIT STAMP</span>
            <h5 className="font-bold text-slate-200 uppercase">GLI-19 Certified RNG</h5>
            <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
              Platform arithmetic, dealing arrays, slot percentages, and cards distribution are fully verified by Gaming Laboratories International protocols.
            </p>
          </div>

          <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-850/60">
            <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest block mb-1">TRANSACTION TRUST</span>
            <h5 className="font-bold text-slate-200 uppercase">SSL Bank-Grade encryption</h5>
            <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
              Financial ledger operations occur via fully decentralized and encrypted escrow tunnels, protecting user balances against intercept threats.
            </p>
          </div>

          <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-850/60">
            <span className="text-[9px] text-indigo-400 font-mono font-bold uppercase tracking-widest block mb-1">ESCROW STABILITY</span>
            <h5 className="font-bold text-slate-200 uppercase">Guaranteed Fast liquidity</h5>
            <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
              Platform maintains dedicated multi-million reserve assets guaranteeing instant withdrawal capability even during peak major sporting weekend tournaments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
