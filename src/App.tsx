import React, { useState } from "react";
import CorporatePortal from "./components/CorporatePortal";
import { Coins, Mail, ShieldAlert, Award } from "lucide-react";

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-yellow-500/30 selection:text-white" id="i8-root-container">
      {/* Platform Header Banner perfectly modeled after the brand-new Southeast Asia Casino & Gaming Lobby */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center flex-wrap gap-2.5">
            <Coins className="w-5 h-5 text-yellow-500" />
            <h1 className="text-xl font-extrabold tracking-tight text-white font-sans lowercase flex items-center gap-1.5">
              i8s<span className="text-yellow-500">.games</span>
            </h1>
            <span className="text-[9px] bg-yellow-950 text-yellow-400 font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-yellow-905">
              PREMIER GAMING & CASINO HUB
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
            Live Casino Dealer Rooms • Multi-Way Slot Machines • Local Prompt Pay checkout
          </p>
        </div>

        {/* Navigation / Regional Licenses Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("gaming-portal-panel");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-1.5 bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-400 text-[11px] font-bold font-sans rounded-full border border-yellow-500/20 transition-all cursor-pointer"
          >
            Regional Lobby
          </button>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-4 py-1.5 bg-slate-900/85 hover:bg-slate-850 text-slate-350 text-[11px] font-semibold font-sans rounded-full border border-slate-800 transition-all cursor-pointer"
          >
            Apply for VIP Club
          </button>
        </div>

        {/* Corporate brief on the right side */}
        <div className="max-w-xs hidden lg:block text-slate-400 rounded-lg p-2.5 bg-slate-900/35 border border-slate-850 text-[10px] leading-normal font-sans">
          <div className="font-bold text-slate-400 flex items-center gap-1 mb-0.5 text-[10px] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-yellow-500" />
            <span>SABAH AMUSEMENT CERTIFICATION</span>
          </div>
          <p className="text-slate-500 leading-tight">
            Next-generation secured entertainment operations licensed by eGaming Commissions.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 space-y-8 max-w-[1700px] w-full mx-auto flex flex-col">
        {/* Corporate Roadmap Portal */}
        <CorporatePortal onTriggerContact={() => setShowContactModal(true)} />
      </main>

      {/* Humble page footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-5 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600 font-mono gap-3">
        <span>© 2026 i8s.games Ltd. Licensed under Sabah eGaming, Philippines PAGCOR framework.</span>
        <div className="flex gap-4">
          <button onClick={() => setShowContactModal(true)} className="hover:text-yellow-500 transition-colors cursor-pointer">VIP Membership</button>
          <span>•</span>
          <a href="mailto:info@i8s.games" className="hover:text-yellow-500 transition-colors">info@i8s.games</a>
        </div>
      </footer>

      {/* Overlay Modal for Demo Trigger/Partnership request */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-55">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative text-left">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-slate-550 hover:text-white font-mono text-sm border border-slate-800 bg-slate-950 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] text-yellow-550 font-bold uppercase tracking-wider font-mono">i8 VIP ELITE CLUB</span>
              <h3 className="text-base font-black text-white uppercase tracking-tight">Luxury Private Member Registration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thank you for your interest in the exclusive i8s.games Executive Loyalty Tier. Gaining entrance to top-tier elite baccarat hosts, high wager limits, and personalized payout desk features requires prior transaction confirmation.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-850/80 p-3.5 rounded-xl space-y-2">
              <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider font-mono block">VIP Relations desk</span>
              <p className="text-xs text-slate-350">
                To request manual fast activation or personalized turnover adjustments, please dispatch your credentials:
              </p>
              <a 
                href="mailto:info@i8s.games"
                className="block text-center w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-lg text-xs font-black font-sans mt-2 duration-150 transition-all hover:shadow-lg"
              >
                info@i8s.games
              </a>
            </div>
            <div className="text-[9px] text-center text-slate-500 font-mono">
              Certified VIP Hosts respond inside 24 hours.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
