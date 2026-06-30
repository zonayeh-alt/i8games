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
      <div className="relative rounded-3xl overflow-hidden border border-indigo-150 bg-gradient-to-br from-indigo-650 via-purple-650 to-indigo-800 p-8 md:p-12 shadow-md flex flex-col xl:flex-row items-center justify-between gap-10 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.05] rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-85 h-85 bg-pink-500/[0.04] rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
        
        {/* Left column hero statement */}
        <div className="space-y-5 xl:max-w-3xl relative z-10 text-left">
          <div className="text-xs font-mono text-yellow-300 tracking-widest flex items-center gap-2 font-bold">
            <span className="w-6 h-[1px] bg-yellow-300" />
            <span>ASIA PACIFIC PREMIER GAMING DISTRIBUTION & OPERATIONS ENTITY</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.1] font-display uppercase">
            未來全球科技 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-emerald-300 font-black text-2xl md:text-4xl">Future Global Technology</span>
          </h2>

          <p className="text-sm text-indigo-100 leading-relaxed max-w-3xl font-sans">
            <strong>Future Global Technology (Gaming / Asia)</strong> is a premier entity involved in high-throughput <strong>online gaming distribution and software operations</strong> across the Asian region. Our next-generation infrastructure integrates five primary technical workloads to power top-tier casino operators:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-slate-100 text-xs">
            <div className="flex items-start gap-2 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
              <span className="text-yellow-300 font-bold font-mono shrink-0">01</span>
              <div>
                <strong className="text-white block font-sans font-extrabold">Gaming Platform GKE</strong>
                <span className="text-[11px] text-indigo-100">Microservice orchestration on Google Kubernetes Engine for high-concurrency player lobbies.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
              <span className="text-emerald-300 font-bold font-mono shrink-0">02</span>
              <div>
                <strong className="text-white block font-sans font-extrabold">Distributed Databases</strong>
                <span className="text-[11px] text-indigo-100">Low-latency, ACID-compliant multi-region replicas for instantaneous betting ledgers.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
              <span className="text-cyan-300 font-bold font-mono shrink-0">03</span>
              <div>
                <strong className="text-white block font-sans font-extrabold">Online Casino Games</strong>
                <span className="text-[11px] text-indigo-100">In-house premium developed multi-way slot machines, baccarat engines & arcade hunters.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
              <span className="text-pink-300 font-bold font-mono shrink-0">04</span>
              <div>
                <strong className="text-white block font-sans font-extrabold">GenAI Live Streaming (AI Avatar)</strong>
                <span className="text-[11px] text-indigo-100">Real-time interactive narrative platform powered by conversational and vocalized AI hosts.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-3">
            <button
              onClick={() => setCurrentTab("PAYMENTS")}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl font-black font-sans text-xs flex items-center justify-center gap-2 duration-200 shadow-md transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <Coins className="w-4 h-4 text-slate-950" /> Instant top up credits
            </button>
            <button
              onClick={handleTriggerContact}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-bold font-sans text-xs flex items-center gap-1.5 duration-150 transition-all cursor-pointer"
            >
              Join VIP Club &rarr;
            </button>
          </div>
        </div>

        {/* Right column quick credentials boxes */}
        <div className="grid grid-cols-2 gap-4 w-full xl:w-[420px] relative z-10 shrink-0 text-slate-800">
          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-indigo-300 hover:shadow-md transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">REGIONAL FOCUS</span>
            <div className="text-sm font-extrabold text-slate-900">TH • VN • ID • MY • PH</div>
            <span className="text-[9.5px] text-emerald-750 font-mono font-bold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded w-fit capitalize">
              Live Dealer Rooms
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-indigo-300 hover:shadow-md transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">STABILITY CORE</span>
            <div className="text-sm font-extrabold text-slate-900">LOW-LATENCY EDGE</div>
            <span className="text-[9.5px] bg-amber-50 text-amber-800 font-mono font-bold px-2 py-0.5 rounded border border-amber-150 w-fit">
              Verified 2026
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-indigo-300 hover:shadow-md transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">COMPLIANCE HUB</span>
            <div className="text-sm font-extrabold text-slate-900 font-display">SABAH AMUSEMENT</div>
            <div className="text-[10px] text-slate-555 font-mono leading-none">Registered License</div>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between h-28 hover:border-indigo-300 hover:shadow-md transition-all">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">CASH FLOW</span>
            <div className="text-sm font-extrabold text-slate-900">SECURE ESCROW</div>
            <div className="space-y-1">
              <span className="text-[9.5px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded border border-blue-150 w-fit">
                SSL Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Live Jackpot Tickers */}
           {/* Tab Navigation System */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 flex overflow-x-auto pb-0.5 gap-2 custom-scrollbar">
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
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" 
                    : "border-transparent text-slate-500 hover:text-indigo-600"
                }`}
              >
                {iconText}
                {tab === "SLOTS" && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-mono font-bold px-1 py-0.2 rounded-full animate-pulse">
                    HOT
                  </span>
                )}
                {tab === "AI_CHEER" && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[8px] font-mono font-bold px-1 py-0.2 rounded-full animate-pulse uppercase">
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
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-wider font-display">
                    Regional Core Interactive Game Modules
                  </h3>
                  <span className="text-xs text-slate-500 font-mono font-bold hidden sm:inline">Select categories below to experience playable demos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Slot box card */}
                  <div 
                    onClick={() => setCurrentTab("SLOTS")}
                    className="bg-white border border-slate-200 hover:border-indigo-300 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          98.6% High RTP
                        </span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded uppercase font-mono font-bold">SLOTS</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight">Golden Dragons Slot Machine</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Spin to trigger triple crowns, gold sacks and cascading lines with rich simulated payouts!
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-indigo-600 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Baccarat box card */}
                  <div 
                    onClick={() => setCurrentTab("BACCARAT")}
                    className="bg-white border border-slate-200 hover:border-indigo-300 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Live Agent
                        </span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded uppercase font-mono font-bold">CASINO</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight">Royal Dragon VIP Baccarat</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Bet on Player, Banker or Tie. Features realistic 3rd card draw rules, standard Commission logic, and live dragon big road trend indicators!
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-indigo-600 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Sports card */}
                  <div 
                    onClick={() => setCurrentTab("SPORTS")}
                    className="bg-white border border-slate-200 hover:border-indigo-300 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-red-700 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          SABAH Live Odds
                        </span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded uppercase font-mono font-bold">SPORTS</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight">Sabah-Sports & Esportsbook</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Bet on Indonesian MPL Mobile Legends, Thai League football, and Dota 2 ongoing major regional qualifiers.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-indigo-600 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Fishing card */}
                  <div 
                    onClick={() => setCurrentTab("FISHING")}
                    className="bg-white border border-slate-200 hover:border-indigo-300 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          Arcade Shooter
                        </span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded uppercase font-mono font-bold">FISHING</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 tracking-tight">Siam Golden Fishing Hunter</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Control 1x-5x multipliers cannon. Tap to capture gold, octopus or elite dragons in high-performance water dynamics.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-row">
                      <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">PLAYABLE SIMULATOR</span>
                      <span className="text-xs text-indigo-600 font-bold group-hover:translate-x-1 duration-150 transition-transform flex items-center gap-1">
                        ENTER GAME &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Regional Mobile App Advertising banner */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-indigo-600" /> DOWNLOAD DETAILED MOBILE PLATFORM APP
                    </h4>
                    <p className="text-xs text-slate-600 leading-normal max-w-xl">
                      Experience smooth gameplay, exclusive lock-on multi-agent servers, and ultra low-latency secure Prompt QR payment systems straight from your Android or iOS.
                    </p>
                  </div>
                  <button 
                    onClick={handleTriggerContact}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs uppercase duration-150 shrink-0 cursor-pointer shadow-sm"
                  >
                    Download APK
                  </button>
                </div>
              </div>

              {/* Right Column: Live Winners log Feed + Quick Gateway panel */}
              <div className="space-y-6">
                <LiveWinnersFeed />

                {/* Small static advertisement panel */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-display border-b border-slate-100 pb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" /> Secure Regional Regulatory Approval
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Future Global Technology</strong> is certified under dynamic eGaming registration frameworks issued by regional gaming authorities. Fair play RNG matrices verified by independently certified test labs.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">System Node Status: ONLINE</span>
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
                  className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider block w-fit">
                      {promo.badge}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                      {promo.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab("PAYMENTS")}
                    className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-750 font-bold border border-indigo-100/60 text-xs rounded-xl transition-all cursor-pointer"
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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-display">
            Compliance & Security Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500">
          <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-150">
            <span className="text-[9px] text-indigo-650 font-mono font-bold uppercase tracking-widest block mb-1">AUDIT STAMP</span>
            <h5 className="font-bold text-slate-800 uppercase">GLI-19 Certified RNG</h5>
            <p className="text-[11px] leading-relaxed text-slate-650 mt-1">
              Platform arithmetic, dealing arrays, slot percentages, and cards distribution are fully verified by Gaming Laboratories International protocols.
            </p>
          </div>

          <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-150">
            <span className="text-[9px] text-emerald-700 font-mono font-bold uppercase tracking-widest block mb-1">TRANSACTION TRUST</span>
            <h5 className="font-bold text-slate-800 uppercase">SSL Bank-Grade encryption</h5>
            <p className="text-[11px] leading-relaxed text-slate-650 mt-1">
              Financial ledger operations occur via fully decentralized and encrypted escrow tunnels, protecting user balances against intercept threats.
            </p>
          </div>

          <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-150">
            <span className="text-[9px] text-indigo-700 font-mono font-bold uppercase tracking-widest block mb-1">ESCROW STABILITY</span>
            <h5 className="font-bold text-slate-800 uppercase">Guaranteed Fast liquidity</h5>
            <p className="text-[11px] leading-relaxed text-slate-650 mt-1">
              Platform maintains dedicated multi-million reserve assets guaranteeing instant withdrawal capability even during peak major sporting weekend tournaments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
