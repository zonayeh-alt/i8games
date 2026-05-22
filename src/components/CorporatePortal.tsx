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
  LineChart,
  Mail,
  Info
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
        
        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 text-indigo-400 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-900/60">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            2026 Generative Entertainment Initiative
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            OWNING THE FUTURE <br />
            OF GAMES WITH <span className="text-indigo-500">VERTEX AI</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            i8s.games is dedicated to building proprietary franchises, original game IP, and deep-context interactive universes powered by enterprise-tier Generative AI including multi-character personas and realistic vocal synthesis.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onSelectTab("playground")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold font-sans text-xs flex items-center gap-2 duration-200 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <Zap className="w-4 h-4" /> Launch Live Demo Playground
            </button>
            <a
              href="#solutions"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-semibold font-sans text-xs flex items-center gap-2 duration-150 transition-colors cursor-pointer"
            >
              Explore Tech Solutions <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Demo References Showcase with Real Images */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
            AI Demo References
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          These interactive reference demos showcase integrated multimodal AI capabilities, leveraging low-latency streaming text outputs, customized vocal modulations, and adaptive multi-character persona contexts.
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

      {/* About Us & Business Collaboration Sections */}
      <div id="about-us" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold font-sans uppercase text-white tracking-tight">About Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400">
            <div>
              <p className="mb-3">
                <strong>i8s.games</strong> 是一家前瞻性的生成式娛樂科技公司，我們核心專注於<strong>生成多角色個性 (Multi-character Personas) 語境與 lifelike 擬真語音對話 (Vocal Synthetics)</strong> 的底層技術，打造全新的沈浸式 AI 互動體驗。
              </p>
              <p>
                透過深度整合領先的多模態自然語言處理模型，我們致力於打破傳統依循預設指令碼的遊戲樹，讓每個不玩家的角色都擁有獨立的思維、持續的記憶和極富張力的聲音演繹。
              </p>
            </div>
            <div>
              <p className="mb-4">
                Our advanced development framework enables gaming systems to dynamically spin up infinite non-scripted AI agents, each with high-fidelity vocal delivery, responsive contextual comprehension, and specialized world-lore compliance.
              </p>
              <div className="bg-slate-950 border border-slate-850/80 p-3 rounded-lg flex items-center gap-3">
                <Dna className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold leading-none">Core Technology Specialty</p>
                  <p className="text-xs text-white leading-normal mt-1">
                    Innovative multi-agent personality models and latency-optimized dynamic voice-casting engines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Collaboration Card */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-indigo-950 text-indigo-400 font-mono text-[9px] font-bold uppercase tracking-wider rounded border border-indigo-900">
              Partnership
            </div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-tight font-sans">
              Business Collaboration
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              Interested in integrating our cutting-edge multi-character and voice generative framework into your productions? Get in touch with our partnerships office.
            </p>
          </div>

          <div className="space-y-3 pt-2 relative z-10">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono block">Contact Us</span>
            <a
              href="mailto:info@i8.games"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2.5 transition-all shadow-md shadow-indigo-650/20 hover:scale-[1.01] duration-150 cursor-pointer text-center"
            >
              <Mail className="w-4 h-4" />
              <span>info@i8.games</span>
            </a>
            <p className="text-[9px] text-center text-slate-500 font-mono">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* Custom Solutions & Technical References */}
      <div id="solutions" className="scroll-mt-6 space-y-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold font-sans tracking-tight text-white uppercase">
            CORE GENERATIVE SOLUTIONS &amp; TECHNICAL REFERENCES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solution 1 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">1. Multi-Character Persona Synthesis</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Multi-character systems equipped with deep memory, lore constraints, and context compliance.</li>
                <li>Dynamic story progression responding to custom parameters, emotional depth, and user interaction.</li>
                <li>Persistent conversational threads that remember core relationships across scenes and quests.</li>
                <li>Scalable templates for spinning up customized brand, lore, or assistant personas instantly.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Multi-Agent Engine Active
            </div>
          </div>

          {/* Solution 2 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60 font-mono">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">2. Lifelike Vocal Synthetics</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Dynamic low-latency Text-to-Speech (TTS) delivering rich atmospheric voice-enabled reactions.</li>
                <li>Adaptive voice modeling matching distinct emotional levels and specialized speaker traits on-the-fly.</li>
                <li>Integrated soundscapes and dynamic audio cues triggered through context analyses.</li>
                <li>Optimized streaming audio chunking ensuring no delays during live gameplay conversation.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Dynamic Vocal Synthesizer
            </div>
          </div>

          {/* Solution 3 */}
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-900/60">
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">3. Prompt Orchestration &amp; References</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Fully verifiable pipelines proxying server-side model inferences securely.</li>
                <li>Custom orchestration logs capturing prompt templates, input vectors, and token bounds.</li>
                <li>Safety guardrails intercepting inappropriate material instantly to maintain compliance.</li>
                <li>Production-grade deployment templates for scalable, high-throughput entertainment setups.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Orchestrator Reference Layer
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
