import React from "react";
import { 
  Layers, 
  Cpu, 
  Bot, 
  Sparkles, 
  LineChart,
  Mail,
  Info,
  ShieldCheck,
  Dna,
  Lock,
  Gamepad2,
  AlertCircle
} from "lucide-react";

interface CorporatePortalProps {
  onTriggerContact?: () => void;
}

export default function CorporatePortal({ onTriggerContact }: CorporatePortalProps) {
  const triggerEmail = () => {
    if (onTriggerContact) {
      onTriggerContact();
    } else {
      window.location.href = "mailto:info@i8s.games";
    }
  };

  return (
    <div className="space-y-10 animate-fade-in" id="corporate-portal-panel">
      
      {/* Brand Hero Module matching reference layout exactly */}
      <div className="relative rounded-3xl overflow-hidden border border-indigo-500/10 bg-slate-950/80 p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-85 h-85 bg-purple-500/[0.03] rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
        
        {/* Left Side: Elevating messaging */}
        <div className="space-y-5 lg:max-w-4xl relative z-10 w-full">
          <div className="text-xs font-mono text-indigo-400 tracking-wider flex items-center gap-2">
            <span className="w-6 h-[1px] bg-indigo-500" />
            <span>2026 Strategic Flagship Initiative</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.1] font-sans">
            Delivering the Future <br />
            of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">AI Solutions with Gaming AI</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl font-sans font-medium">
            <strong>i8s.games</strong> is an enterprise Gaming AI Generator, delivering proprietary generative AI solutions, intelligent character platforms, and deep-context interactive experiences powered by enterprise-tier AI — for customers worldwide.
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <button
              onClick={triggerEmail}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-2 duration-200 shadow-lg shadow-indigo-600/10 transition-all cursor-pointer hover:translate-y-[-1px]"
            >
              <Gamepad2 className="w-4 h-4" /> Launch Live Demo
            </button>
            <a
              href="#solutions"
              className="px-5 py-3 bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-800/80 rounded-xl font-semibold font-sans text-xs flex items-center gap-1.5 duration-150 transition-colors cursor-pointer"
            >
              Explore AI Architecture &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Demo Site — Experience Our Gaming AI in Action. Screenshot design without character/starship images */}
      <div className="space-y-5" id="demo-site-block">
        <div className="space-y-1">
          <span className="text-xs text-indigo-400 font-mono font-bold uppercase tracking-widest block">
            Demo Site — Experience Our Gaming AI in Action
          </span>
          <p className="text-xs text-slate-400 max-w-4xl leading-relaxed">
            These interactive demos showcase our Gaming AI Generator capabilities. Each scenario is a live proof-of-concept — try the dialogue engine, explore AI character behaviour, and see what's available for your customers.
          </p>
        </div>

        {/* Warning Indicator Header Banner from reference screenshot */}
        <div className="bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-350 leading-relaxed">
            <strong>Pilot demos only.</strong> These are early-access showcases built to demonstrate our AI solutions to prospective customers and partners. Full production deployments are available upon engagement — contact us to learn more.
          </p>
        </div>

        {/* Dark Box Grid without illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Echoes of Kepler */}
          <div className="bg-slate-900/90 border border-slate-850 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.02] rounded-full blur-xl pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-950/80 border border-blue-900/40 text-blue-400 rounded">
                  Sci-Fi Exploration
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
                  DEMO
                </span>
              </div>
              <h4 className="text-base font-extrabold text-white">Echoes of Kepler 2026</h4>
              <p className="text-xs text-slate-400 leading-normal">
                A cosmic journey where players navigate gravitational anomalies using high-precision orbital starships and dynamic spatial astrolabe charts.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-850 flex items-center justify-between relative z-10">
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                KAELEN VEX AI ENGINE
              </span>
              <button 
                onClick={triggerEmail}
                className="text-[10px] font-bold font-sans text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                TRY DEMO &rarr;
              </button>
            </div>
          </div>

          {/* Neo-Sion: Syndicate Wars */}
          <div className="bg-slate-900/90 border border-slate-850 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.02] rounded-full blur-xl pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-cyan-950/80 border border-cyan-900/40 text-cyan-400 rounded">
                  Cyberpunk Realtime
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
                  DEMO
                </span>
              </div>
              <h4 className="text-base font-extrabold text-white">Neo-Sion: Syndicate Wars</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Infiltrate dark cyber grids, override military-grade ICE protection, and broker deep underground subnet assets in a neon cyberpunk metropolis.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-850 flex items-center justify-between relative z-10">
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                VESPERA DRAKE NODE
              </span>
              <button 
                onClick={triggerEmail}
                className="text-[10px] font-bold font-sans text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                TRY DEMO &rarr;
              </button>
            </div>
          </div>

          {/* Shattered Realms: Aegis */}
          <div className="bg-slate-900/90 border border-slate-850 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-xl pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-950/80 border border-amber-900/40 text-amber-500 rounded">
                  Fantasy Tactical RPG
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
                  DEMO
                </span>
              </div>
              <h4 className="text-base font-extrabold text-white">Shattered Realms: Aegis</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Rally defenders atop ancient obsidian shield-walls. Hold the perimeter against dark spawn using military leadership and heroic defensive phalanxes.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-850 flex items-center justify-between relative z-10">
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                TORIN SENTINEL ENGINE
              </span>
              <button 
                onClick={triggerEmail}
                className="text-[10px] font-bold font-sans text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                TRY DEMO &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us & Business Collaboration Sections */}
      <div id="about-us" className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-24">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold font-sans uppercase text-white tracking-tight">About Us</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                2026 Strategic Flagship Initiative
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white leading-tight font-sans uppercase">
                Delivering the Future <br />
                of AI Solutions with Gaming AI
              </h4>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              <strong>i8s.games</strong> is an enterprise Gaming AI Generator, delivering proprietary generative AI solutions, intelligent character platforms, and deep-context interactive experiences powered by enterprise-tier AI — for customers worldwide.
            </p>
          </div>

          <div className="border-t border-slate-850/60 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400">
            <div className="space-y-3">
              <p className="leading-relaxed text-slate-300">
                Our operations focus fundamentally on the core architecture of generating <strong>multi-character personas</strong> and <strong>lifelike vocal synthetics</strong>, establishing a pristine foundation for immersive interactive AI environments.
              </p>
              <p className="leading-relaxed text-slate-350">
                By deeply aligning leading multimodal processing layers, we dismantle rigid, pre-scripted conversational flows, granting on-demand cognitive independence, persistent memory context, and vivid theatrical speech capabilities to every agent.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-850/80 p-4 rounded-xl flex items-center gap-3">
              <Dna className="w-6 h-6 text-indigo-455 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold leading-none">Core Specialty</p>
                <p className="text-xs text-white leading-normal mt-1.5 font-medium">
                  Proprietary multi-agent memory frameworks & vocal synthesis generators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Partnership Collaboration Card */}
        <div className="bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-950 border border-indigo-550/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.04] rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
          
          <div className="space-y-2.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-indigo-950/80 text-indigo-400 font-mono text-[9px] font-bold uppercase tracking-widest rounded border border-indigo-900">
              Partnership
            </div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider font-sans">
              Business Collaboration
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              Interested in integrating our cutting-edge multi-character and voice generative framework into your productions? Get in touch with our partnerships office.
            </p>
          </div>

          <div className="space-y-3.5 pt-2 relative z-10">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono block">Contact Us</span>
            <a
              href="mailto:info@i8s.games"
              className="w-full py-3 px-4 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2.5 transition-all shadow-md shadow-indigo-700/10 hover:scale-[1.01] duration-150 cursor-pointer text-center"
            >
              <Mail className="w-4 h-4" />
              <span>info@i8s.games</span>
            </a>
            <p className="text-[9px] text-center text-slate-500 font-mono block">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* AI Technology Coverage Block */}
      <div id="solutions" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold font-sans tracking-tight text-white uppercase">
            AI Technology Coverage
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solution 1 */}
          <div className="bg-slate-900/95 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50">
                <Bot className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">1. Multi-Character Persona Synthesis</h4>
              <ul className="text-xs text-slate-400 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>Multi-character systems equipped with deep memory, lore constraints, and context compliance.</li>
                <li>Dynamic story progression responding to custom parameters, emotional depth, and user interaction.</li>
                <li>Persistent conversational threads that remember core relationships across scenes and quests.</li>
                <li>Scalable templates for spinning up customized brand, lore, or assistant personas instantly.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Multi-Agent Engine Active
            </div>
          </div>

          {/* Solution 2 */}
          <div className="bg-slate-900/95 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50 font-mono">
                <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">2. Lifelike Vocal Synthetics</h4>
              <ul className="text-xs text-slate-400 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>Dynamic low-latency Text-to-Speech (TTS) delivering rich atmospheric voice-enabled reactions.</li>
                <li>Adaptive voice modeling matching distinct emotional levels and specialized speaker traits on-the-fly.</li>
                <li>Integrated soundscapes and dynamic audio cues triggered through context analyses.</li>
                <li>Optimized streaming audio chunking ensuring no delays during live gameplay conversation.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Dynamic Vocal Synthesizer
            </div>
          </div>

          {/* Solution 3 */}
          <div className="bg-slate-900/95 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50 font-mono">
                <Layers className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <h4 className="text-sm font-extrabold text-white">3. Prompt Orchestration &amp; References</h4>
              <ul className="text-xs text-slate-400 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>Fully verifiable pipelines proxying server-side model inferences securely.</li>
                <li>Custom orchestration logs capturing prompt templates, input vectors, and token bounds.</li>
                <li>Safety guardrails intercepting inappropriate material instantly to maintain compliance.</li>
                <li>Production-grade deployment templates for scalable, high-throughput entertainment setups.</li>
              </ul>
            </div>
            <div className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded w-fit border border-indigo-900/40 mt-3">
              Orchestrator Reference Layer
            </div>
          </div>
        </div>
      </div>

      {/* Model Evaluation Metric Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold font-sans tracking-tight text-white uppercase">
            Gaming AI Model Evaluation Matrix
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          i8s.games engineers actively analyze Gaming AI model tiers to determine optimal latency-to-quality ratios, especially for low-frequency quest lines vs. rapid-fire conversation pipelines.
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
                  Reasoning Core Models
                </td>
                <td className="p-4 text-slate-350">Complex plotlines, deep deduction, lore validation and memory curation</td>
                <td className="p-4 font-mono text-indigo-400">800 - 1500 MS</td>
                <td className="p-4 text-slate-350 font-mono">Up to 2M tokens</td>
                <td className="p-4">
                  <span className="bg-indigo-950 text-indigo-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-indigo-900">High Reasoning</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  Interactive Dialog Models
                </td>
                <td className="p-4 text-slate-350">Rapid-fire dialogs, inventory checks, live ambient banter</td>
                <td className="p-4 font-mono text-emerald-400">150 - 300 MS</td>
                <td className="p-4 text-slate-350 font-mono">1M tokens</td>
                <td className="p-4">
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-900 font-semibold font-mono">Low Latency Core</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  Vocal Generatives
                </td>
                <td className="p-4 text-slate-350">Dynamic voice modulation, audio tone syncing and character speech</td>
                <td className="p-4 font-mono text-purple-400">200 - 450 MS</td>
                <td className="p-4 text-slate-350 font-mono">Streaming chunks</td>
                <td className="p-4">
                  <span className="bg-purple-950 text-purple-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-purple-900 font-mono">Vocal Synthetics</span>
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
            Gaming AI safety parameters are integrated directly within the orchestration loops of i8s.games, blocking offensive, off-topic, or commercially hazardous outputs live at the source.
          </p>
        </div>
      </div>
    </div>
  );
}
