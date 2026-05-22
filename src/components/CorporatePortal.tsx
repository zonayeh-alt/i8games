import React from "react";
import { 
  Briefcase, 
  Layers, 
  Cpu, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Dna, 
  ShieldCheck, 
  Maximize2, 
  Compass, 
  Zap, 
  ChevronRight, 
  LineChart 
} from "lucide-react";

// ES module imports so Vite bundles and hashes these resources
import keplerImg from "../assets/images/i8_games_kepler_1779356801323.png";
import syndicateImg from "../assets/images/i8_games_syndicate_1779356820789.png";
import aegisImg from "../assets/images/i8_games_aegis_1779356837462.png";

const IMAGES = {
  kepler: keplerImg,
  syndicate: syndicateImg,
  aegis: aegisImg
};

interface CorporatePortalProps {
  onSelectCharacter: (charId: string) => void;
  onSelectTab: (tab: "playground" | "portal") => void;
}

export default function CorporatePortal({ onSelectCharacter, onSelectTab }: CorporatePortalProps) {
  return (
    <div className="space-y-8 animate-fade-in" id="corporate-portal-panel">
      {/* Dynamic Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900/40 to-slate-950 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
        
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 text-indigo-400 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-900/60">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            2026 Strategic Flagship Initiative
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            OWNING THE FUTURE <br />
            OF GAMES WITH <span className="text-indigo-500">VERTEX AI</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            i8s.games is undergoing a definitive strategic transition from a System Integrator (SI) model to building proprietary franchises, original game IP, and deep-context interactive universes powered by enterprise-tier Generative AI.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onSelectTab("playground")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold font-sans text-xs flex items-center gap-2 duration-200 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <Zap className="w-4 h-4" /> Launch Live Demo Playground
            </button>
            <a
              href="#workloads"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-semibold font-sans text-xs flex items-center gap-2 duration-150 transition-colors cursor-pointer"
            >
              Explore AI Architecture <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Dynamic transition metrics HUD */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-80 relative z-10 shrink-0">
          <div className="bg-slate-950/70 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 backdrop-blur-md">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Transition Progress</span>
            <div className="text-2xl font-black font-sans text-white">SI → Own IP</div>
            <div className="text-[10px] text-emerald-400 font-mono font-medium">Flagship Roadmap Active</div>
          </div>
          <div className="bg-slate-950/70 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 backdrop-blur-md">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider font-mono">Launch Window</span>
            <div className="text-2xl font-black font-sans text-white">Q1 2026</div>
            <div className="text-[10px] text-indigo-400 font-mono font-medium">Vertex Core Verified</div>
          </div>
          <div className="bg-slate-950/70 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 backdrop-blur-md">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">Workload Type</span>
            <div className="text-2xl font-black font-sans text-white">GenAI Native</div>
            <div className="text-[10px] text-slate-500 font-mono">LLM Multi-Agent</div>
          </div>
          <div className="bg-slate-950/70 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 backdrop-blur-md">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider font-mono">Infrastructure</span>
            <div className="text-2xl font-black font-sans text-white">Vertex Cloud</div>
            <div className="text-[10px] text-slate-500 font-mono">TPU Cloud Host</div>
          </div>
        </div>
      </div>

      {/* Flagship Game Titles Showcase with Real Images */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
            FLAGSHIP 2026 GAME RELEASES (ORIGINAL IP)
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          These upcoming proprietary releases feature integrated multimodal AI capabilities, leveraging low-latency streaming text outputs, customized vocal modulations, and adaptive scenario contexts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Echoes of Kepler */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col group hover:border-blue-500/35 duration-300 transition-all shadow-xl">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={IMAGES.kepler} 
                alt="Echoes of Kepler" 
                className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-950/95 border border-blue-800/60 text-blue-400 font-mono text-[9px] font-bold rounded">
                Sci-Fi Exploration
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-extrabold text-white leading-tight">Echoes of Kepler 2026</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  A cosmic journey where players navigate gravitational anomalies using high-precision orbital starships and dynamic spatial astrolabe charts.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                <span className="text-[10.5px] font-mono text-blue-450 uppercase tracking-wider">Kaelen Vex AI Engine</span>
                <button 
                  onClick={() => {
                    onSelectCharacter("kaelen");
                    onSelectTab("playground");
                  }}
                  className="text-[10px] font-mono font-bold bg-blue-950 text-blue-400 hover:bg-blue-500 hover:text-white px-2.5 py-1.5 rounded duration-150 transition-colors"
                >
                  TEST DIALOGUE &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Neo-Sion: Syndicate Wars */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col group hover:border-cyan-500/35 duration-300 transition-all shadow-xl">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={IMAGES.syndicate} 
                alt="Neo-Sion: Syndicate Wars" 
                className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-cyan-950/95 border border-cyan-800/60 text-cyan-400 font-mono text-[9px] font-bold rounded">
                Cyberpunk Realtime
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-extrabold text-white leading-tight font-sans">Neo-Sion: Syndicate Wars</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Infiltrate dark cyber grids, override military-grade ICE protection, and broker deep underground subnet assets in a neon cyberpunk metropolis.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                <span className="text-[10.5px] font-mono text-cyan-400 uppercase tracking-wider">Vespera Drake Node</span>
                <button 
                  onClick={() => {
                    onSelectCharacter("vespera");
                    onSelectTab("playground");
                  }}
                  className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 hover:bg-cyan-500 hover:text-white px-2.5 py-1.5 rounded duration-150 transition-colors"
                >
                  TEST DIALOGUE &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Shattered Realms: Aegis */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col group hover:border-amber-500/35 duration-300 transition-all shadow-xl">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={IMAGES.aegis} 
                alt="Shattered Realms: Aegis" 
                className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-amber-950/95 border border-amber-800/60 text-amber-400 font-mono text-[9px] font-bold rounded">
                Fantasy Tactical RPG
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-extrabold text-white leading-tight font-sans">Shattered Realms: Aegis</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Rally defenders atop ancient obsidian shield-walls. Hold the perimeter against dark spawn using military leadership and heroic defensive phalanxes.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                <span className="text-[10.5px] font-mono text-amber-400 uppercase tracking-wider">Torin Sentinel Engine</span>
                <button 
                  onClick={() => {
                    onSelectCharacter("torin");
                    onSelectTab("playground");
                  }}
                  className="text-[10px] font-mono font-bold bg-amber-950 text-amber-400 hover:bg-amber-500 hover:text-white px-2.5 py-1.5 rounded duration-150 transition-colors"
                >
                  TEST DIALOGUE &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Profile Clarification Section */}
      <div id="clarification" className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <Briefcase className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold font-sans uppercase text-white tracking-tight">Business Profile Clarification</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400">
          <div>
            <p className="mb-3">
              Historically, <strong>i8s.games</strong> has operated as an esteemed System Integrator (SI). However, this interface documents a fundamental pivot: building <strong>fully-owned proprietary products, original game titles, and long-term immersive IP</strong>.
            </p>
            <p>
              This enterprise platform represents a core flagship initiative aimed at a worldwide launch in 2026. This development path was planned in close collaboration with cloud and AI strategists to deploy state-of-the-art model inference infrastructure.
            </p>
          </div>
          <div>
            <p className="mb-3">
              The goal of integrating <strong>Vertex AI</strong> is to replace standard predetermined event-branch trees with an independent, non-scripted multi-character chat and dynamic avatar generator system that respects character logic.
            </p>
            <div className="bg-slate-950 border border-slate-850/80 p-3 rounded-lg flex items-center gap-3">
              <Dna className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold leading-none">Strategic Alignment</p>
                <p className="text-xs text-white leading-normal mt-1">
                  100% proprietary assets, full content ownership, & secure enterprise workloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Workloads & Use Cases */}
      <div id="workloads" className="scroll-mt-6 space-y-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
            VERTEX AI WORKLOADS &amp; TECHNOLOGY COVERAGE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workload 1 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">1. Generative Character Chat</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Multi-character system equipped with unique personality parameters.</li>
                <li>Context-aware dialogue containing long-term memory structures.</li>
                <li>Persistent conversational states across multiple scenes and quest bounds.</li>
                <li>Dynamic story progression responding specifically to user decisions.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Powered by Vertex GenAI LLM
            </div>
          </div>

          {/* Workload 2 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60 font-mono">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">2. Multimodal Generation</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Non-scripted text generation determining reactive non-player character behaviour.</li>
                <li>Low-latency Text-to-Speech (TTS) for atmospheric voice-enabled interactions.</li>
                <li>Integrated Speech-to-Text (STT) parsing natural spoken voice client commands.</li>
                <li>Evaluation of Imagen-2.5-Image for character avatar tailoring and visual assets.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Multimodal Inference Layer
            </div>
          </div>

          {/* Workload 3 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60">
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">3. Orchestration &amp; Workflows</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Continuous runtime context summaries matching dialogue states.</li>
                <li>Variable-temperature inference for predictable vs. creative modes.</li>
                <li>Enterprise safety standards preventing lore violations and out-of-character drift.</li>
                <li>Response optimization and iterative self-critique/regeneration loops.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              App Orchestration Gateway
            </div>
          </div>
        </div>
      </div>

      {/* Model Evaluation Metric Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
            Vertex AI Gemini Model Evaluation Matrix
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          i8s.games engineers actively analyze Vertex AI model tiers to determine optimal latency-to-quality ratios, especially for low-frequency quest lines vs. rapid-fire conversation pipelines.
        </p>

        <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-805 bg-slate-950/50 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                <th className="p-4">Model Class / Target</th>
                <th className="p-4">Role in Platform</th>
                <th className="p-4">Average Latency</th>
                <th className="p-4">Memory Context Info</th>
                <th className="p-4">Benchmark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              <tr>
                <td className="p-4 font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  Gemini 2.5 Pro
                </td>
                <td className="p-4 text-slate-350">Complex plotlines, deep deduction, lore validation</td>
                <td className="p-4 font-mono text-indigo-400">800 - 1500 MS</td>
                <td className="p-4 text-slate-350 font-mono">1M to 2M tokens</td>
                <td className="p-4">
                  <span className="bg-indigo-950 text-indigo-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-indigo-900">High Reasoning</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  Gemini 2.5 Flash
                </td>
                <td className="p-4 text-slate-350">Rapid-fire dialogs, inventory checks, live ambient banter</td>
                <td className="p-4 font-mono text-emerald-400">150 - 300 MS</td>
                <td className="p-4 text-slate-350 font-mono">1M tokens</td>
                <td className="p-4">
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-900 font-semibold">Low Latency Core</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  Imagen-3-Image
                </td>
                <td className="p-4 text-slate-350">Dynamic style presets, clothing forge, inventory rendering</td>
                <td className="p-4 font-mono text-purple-400">10s - 12s</td>
                <td className="p-4 text-slate-350 font-mono">Static square/wide</td>
                <td className="p-4">
                  <span className="bg-purple-950 text-purple-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-purple-900">Creative Forge</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Compliance Guardrails */}
      <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 md:max-w-xl">
          <h4 className="text-sm font-extrabold text-white uppercase flex items-center gap-1.5 leading-none">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Enterprise-Grade Security Controls
          </h4>
          <p className="text-xs text-slate-400 leading-normal mt-1.5">
            Vertex AI safety parameters are integrated directly within the orchestration loops of i8s.games, blocking offensive, off-topic, or commercially hazardous outputs live at the source.
          </p>
        </div>
        <button
          onClick={() => onSelectTab("playground")}
          className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer text-center"
        >
          Check Real-Time Safety Levels &rarr;
        </button>
      </div>
    </div>
  );
}
