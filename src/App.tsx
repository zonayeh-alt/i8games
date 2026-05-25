import React, { useState } from "react";
import CorporatePortal from "./components/CorporatePortal";
import { Gamepad2, Layers, Mail, Info, ChevronRight } from "lucide-react";

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white" id="i8-root-container">
      {/* Platform Header Banner perfectly modeled after the provided reference style screenshot */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center flex-wrap gap-2.5">
            <Gamepad2 className="w-5 h-5 text-indigo-500" />
            <h1 className="text-xl font-extrabold tracking-tight text-white font-sans lowercase flex items-center gap-1.5">
              i8s<span className="text-indigo-500">.games</span>
            </h1>
            <span className="text-[9px] bg-indigo-950 text-indigo-400 font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-900/60 uppercase">
              GAMING AI GENERATOR
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider">
            Generative AI Solutions • Voice Synthesizers • AI Orchestration
          </p>
        </div>

        {/* Navigation / Roadmap Controls from screenshot */}
        <div className="flex items-center gap-3">
          <a
            href="#solutions"
            className="px-4 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 text-[11px] font-bold font-sans rounded-full border border-indigo-500/20 transition-all cursor-pointer"
          >
            Solutions Roadmap
          </a>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-4 py-1.5 bg-slate-900/85 hover:bg-slate-850 text-slate-350 text-[11px] font-semibold font-sans rounded-full border border-slate-800 transition-all cursor-pointer"
          >
            Partnerships Sandbox
          </button>
        </div>

        {/* Corporate brief on the right side */}
        <div className="max-w-xs hidden lg:block text-slate-400 rounded-lg p-2.5 bg-slate-900/35 border border-slate-850 text-[10px] leading-normal font-sans">
          <div className="font-bold text-slate-400 flex items-center gap-1 mb-0.5 text-[10px] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Core Flagship Product Roadmap</span>
          </div>
          <p className="text-slate-500 leading-tight">
            Flagship generative entertainment platform powered by custom low-latency AI models.
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
        <span>© 2026 i8s.games Ltd. All rights intellectual property reserved.</span>
        <div className="flex gap-4">
          <a href="#about-us" className="hover:text-indigo-400 transition-colors">About Us</a>
          <span>•</span>
          <a href="#solutions" className="hover:text-indigo-400 transition-colors">AI Solutions</a>
          <span>•</span>
          <a href="mailto:info@i8.games" className="hover:text-indigo-400 transition-colors">Contact us</a>
        </div>
      </footer>

      {/* Overlay Modal for Demo Trigger/Partnership request */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-55">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-slate-550 hover:text-white font-mono text-sm border border-slate-800 bg-slate-950 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] text-indigo-450 font-bold uppercase tracking-wider font-mono">Partnerships Portal</span>
              <h3 className="text-base font-black text-white uppercase tracking-tight">Accessing Full Production Solutions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thank you for your interest in the i8s.games Enterprise Character Platform. Production-ready deployments with customized character modules, dedicated fine-tunes, and dynamic vocal casting channels require formal system engagement.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-850/80 p-3 rounded-xl space-y-2">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono block">Contact Desk</span>
              <p className="text-xs text-slate-350">
                Please transmit your deployment parameters, usage metrics, and business requirements to our partnerships team:
              </p>
              <a 
                href="mailto:info@i8.games"
                className="block text-center w-full py-2.5 bg-indigo-650 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold font-sans mt-2 duration-150 transition-colors"
              >
                info@i8.games
              </a>
            </div>
            <div className="text-[9px] text-center text-slate-500 font-mono">
              Typical validation process timeline: within 24 hours.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
