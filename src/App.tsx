import React, { useState } from "react";
import CorporatePortal from "./components/CorporatePortal";
import { Coins, Mail, ShieldAlert, Award, Sparkles, Cpu, Server } from "lucide-react";

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900" id="future-global-root-container">
      {/* Client future global branding ribbon at the absolute top of the page */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-4 py-2 text-center text-[11px] font-mono flex flex-wrap items-center justify-center gap-2 relative overflow-hidden text-white shadow-sm">
        <span className="absolute left-0 top-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:20px_100%] opacity-20 pointer-events-none" />
        <div className="flex items-center gap-1.5 text-yellow-300 font-bold shrink-0">
          <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:6s]" />
          <span>未來全球科技 Future Global Technology (Gaming / Asia) 專屬研發平台</span>
        </div>
        <span className="text-white/30">|</span>
        <span className="text-indigo-100">亞洲線上娛樂代理發行與軟體營運 • 基於 GKE 高可靠高並發微服務</span>
        <span className="text-white/30 hidden md:inline">|</span>
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-300 font-bold">
            <Server className="w-3 h-3" />
            <span>Gaming GKE Cluster: Active</span>
          </span>
          <span className="flex items-center gap-1 text-pink-300 font-bold">
            <Cpu className="w-3 h-3 animate-pulse" />
            <span>Interactive GenAI Avatars: Live</span>
          </span>
        </div>
      </div>

      {/* Platform Header Banner perfectly modeled after the brand-new Southeast Asia Casino & Gaming Lobby */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
              <Coins className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 font-sans flex items-center gap-1">
              Future Global<span className="text-indigo-600">Technology</span>
            </h1>
            <span className="text-[9px] bg-indigo-50 text-indigo-700 font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border border-indigo-100">
              Gaming / Asia Operations
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
            Online Gaming Distribution • GKE Microworkloads • Multi-Way Casino Software • GenAI Interactive Streamer Host
          </p>
        </div>

        {/* Navigation / Regional Licenses Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("gaming-portal-panel");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-[11px] font-bold font-sans rounded-full border border-indigo-100/60 transition-all cursor-pointer"
          >
            Regional Demo Suite
          </button>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold font-sans rounded-full shadow-sm transition-all cursor-pointer"
          >
            Partnership & Distribution
          </button>
        </div>

        {/* Corporate brief on the right side */}
        <div className="max-w-xs hidden lg:block text-slate-600 rounded-lg p-2.5 bg-slate-50 border border-slate-200 text-[10px] leading-normal font-sans">
          <div className="font-bold text-slate-700 flex items-center gap-1 mb-0.5 text-[10px] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
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
      <footer className="border-t border-slate-200 bg-white px-6 py-5 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-3">
        <span>© 2026 Future Global Technology (Gaming / Asia). 亞洲線上娛樂發行與軟體營運專屬平台。Licensed under international gaming regulatory frameworks.</span>
        <div className="flex gap-4">
          <button onClick={() => setShowContactModal(true)} className="hover:text-indigo-600 text-slate-650 transition-colors cursor-pointer font-bold">Distribution Partners</button>
          <span>•</span>
          <a href="mailto:asia.distribution@futureglobal.tech" className="hover:text-indigo-600 text-slate-650 transition-colors">asia.distribution@futureglobal.tech</a>
        </div>
      </footer>

      {/* Overlay Modal for Demo Trigger/Partnership request */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-55">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-xl relative text-left">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-slate-600 font-mono text-sm border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider font-mono">FUTURE GLOBAL PARTNERSHIP</span>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Software Operation & Distribution</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank you for your interest in <strong>Future Global Technology (Gaming / Asia)</strong>. We license high-throughput gaming software, secure GKE hosting clusters, decentralized payment ledgers, and interactive GenAI avatar integrations to certified regional operators.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider font-mono block">B2B Distribution Desk</span>
              <p className="text-xs text-slate-500">
                To request sandbox API credentials, custom database replication nodes, or real-time AI streamer configurations, dispatch your request to:
              </p>
              <a 
                href="mailto:asia.distribution@futureglobal.tech"
                className="block text-center w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-black font-sans mt-2 duration-150 transition-all shadow-md"
              >
                asia.distribution@futureglobal.tech
              </a>
            </div>
            <div className="text-[9px] text-center text-slate-400 font-mono">
              Future Global Technology distribution representatives respond within 1 business day.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
